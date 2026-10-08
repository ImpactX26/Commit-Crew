import streamlit as st

from backend.database.connection import init_db, get_connection
from backend.services.auth import authenticate_user, create_user
from backend.services.planner import create_quick_plan


st.set_page_config(
    page_title="EduPilot",
    page_icon="📚",
    layout="wide",
)


# ---------------------------------------------------------
# DATABASE
# ---------------------------------------------------------

init_db()


# ---------------------------------------------------------
# SESSION STATE
# ---------------------------------------------------------

if "user" not in st.session_state:
    st.session_state.user = None


# ---------------------------------------------------------
# LOGIN
# ---------------------------------------------------------

def login_screen():
    st.title("📚 EduPilot")
    st.caption("Plan → Study → Track → Analyze → Adapt → Improve")

    login_tab, create_tab = st.tabs(
        ["Login", "Create Account"]
    )

    # ---------------- LOGIN ----------------

    with login_tab:
        username = st.text_input(
            "Username",
            key="login_username",
        )

        password = st.text_input(
            "Password",
            type="password",
            key="login_password",
        )

        if st.button("Sign In", type="primary"):
            if not username or not password:
                st.error("Please enter username and password.")
            else:
                user = authenticate_user(
                    username,
                    password,
                )

                if user:
                    st.session_state.user = user
                    st.rerun()
                else:
                    st.error("Invalid username or password.")

    # ---------------- CREATE ACCOUNT ----------------

    with create_tab:
        display_name = st.text_input(
            "Your name",
            key="create_display_name",
        )

        username = st.text_input(
            "Choose a username",
            key="create_username",
        )

        password = st.text_input(
            "Choose a password",
            type="password",
            key="create_password",
        )

        if st.button("Create Account"):
            if not display_name or not username or not password:
                st.error("Please fill in all fields.")

            elif len(password) < 6:
                st.error(
                    "Password must be at least 6 characters."
                )

            else:
                success, message = create_user(
                    username,
                    display_name,
                    password,
                )

                if success:
                    st.success(message)
                    st.info(
                        "Go to the Login tab and sign in."
                    )
                else:
                    st.error(message)


# ---------------------------------------------------------
# UPDATE STUDY SESSION
# ---------------------------------------------------------

def update_study_session(
    session_id,
    status,
    actual_duration,
):
    conn = get_connection()

    if status == "In Progress":
        conn.execute(
            """
            UPDATE study_sessions
            SET status = ?,
                actual_duration_minutes = ?,
                started_at = COALESCE(
                    started_at,
                    CURRENT_TIMESTAMP
                )
            WHERE id = ?
              AND user_id = ?
            """,
            (
                status,
                actual_duration,
                session_id,
                st.session_state.user["id"],
            ),
        )

    elif status in (
        "Completed",
        "Partially Completed",
        "Skipped",
    ):
        conn.execute(
            """
            UPDATE study_sessions
            SET status = ?,
                actual_duration_minutes = ?,
                completed_at = CURRENT_TIMESTAMP
            WHERE id = ?
              AND user_id = ?
            """,
            (
                status,
                actual_duration,
                session_id,
                st.session_state.user["id"],
            ),
        )

    else:
        conn.execute(
            """
            UPDATE study_sessions
            SET status = ?,
                actual_duration_minutes = ?
            WHERE id = ?
              AND user_id = ?
            """,
            (
                status,
                actual_duration,
                session_id,
                st.session_state.user["id"],
            ),
        )

    conn.commit()
    conn.close()


# ---------------------------------------------------------
# PROGRESS SUMMARY
# ---------------------------------------------------------

def get_progress_summary(user_id):
    conn = get_connection()

    total = conn.execute(
        """
        SELECT COUNT(*) AS count
        FROM study_sessions
        WHERE user_id = ?
        """,
        (user_id,),
    ).fetchone()["count"]

    completed = conn.execute(
        """
        SELECT COUNT(*) AS count
        FROM study_sessions
        WHERE user_id = ?
          AND status = 'Completed'
        """,
        (user_id,),
    ).fetchone()["count"]

    planned_minutes = conn.execute(
        """
        SELECT COALESCE(
            SUM(duration_minutes),
            0
        ) AS total
        FROM study_sessions
        WHERE user_id = ?
        """,
        (user_id,),
    ).fetchone()["total"]

    actual_minutes = conn.execute(
        """
        SELECT COALESCE(
            SUM(actual_duration_minutes),
            0
        ) AS total
        FROM study_sessions
        WHERE user_id = ?
        """,
        (user_id,),
    ).fetchone()["total"]

    conn.close()

    return (
        total,
        completed,
        planned_minutes,
        actual_minutes,
    )


# ---------------------------------------------------------
# SUBJECT PROGRESS
# ---------------------------------------------------------

def get_subject_progress(user_id):
    conn = get_connection()

    rows = conn.execute(
        """
        SELECT
            subject,
            COUNT(*) AS sessions,
            SUM(duration_minutes) AS planned_minutes,
            SUM(
                COALESCE(actual_duration_minutes, 0)
            ) AS actual_minutes,
            SUM(
                CASE
                    WHEN status = 'Completed'
                    THEN 1
                    ELSE 0
                END
            ) AS completed
        FROM study_sessions
        WHERE user_id = ?
        GROUP BY subject
        ORDER BY subject
        """,
        (user_id,),
    ).fetchall()

    conn.close()

    return rows


# ---------------------------------------------------------
# DASHBOARD
# ---------------------------------------------------------

def dashboard():
    user = st.session_state.user

    # Header
    top_left, top_right = st.columns([4, 1])

    with top_left:
        st.title(
            f"Welcome, {user['display_name']} 👋"
        )
        st.caption(
            "Your personalized study workspace"
        )

    with top_right:
        if st.button("Logout"):
            st.session_state.user = None
            st.rerun()

    st.divider()

    plan_tab, progress_tab = st.tabs(
        [
            "⚡ Quick Study Plan",
            "📈 Progress",
        ]
    )

    # =====================================================
    # QUICK STUDY PLAN
    # =====================================================

    with plan_tab:
        st.subheader("Create a quick study plan")

        subject = st.text_input(
            "Subject",
            key="plan_subject",
        )

        topic = st.text_input(
            "Topic",
            key="plan_topic",
        )

        available_minutes = st.number_input(
            "Available time (minutes)",
            min_value=10,
            max_value=240,
            value=30,
            step=5,
            key="plan_minutes",
        )

        if st.button(
            "Generate Plan",
            type="primary",
        ):
            if not subject:
                st.error("Enter a subject.")

            else:
                plan = create_quick_plan(
                    subject,
                    topic,
                    int(available_minutes),
                )

                st.success(
                    "Study plan created!"
                )

                col1, col2, col3 = st.columns(3)

                with col1:
                    st.metric(
                        "Subject",
                        plan["subject"],
                    )

                with col2:
                    st.metric(
                        "Duration",
                        f"{plan['duration_minutes']} min",
                    )

                with col3:
                    st.metric(
                        "Status",
                        "Planned",
                    )

                st.info(
                    plan["recommendation"]
                )

                conn = get_connection()

                conn.execute(
                    """
                    INSERT INTO study_sessions
                    (
                        user_id,
                        subject,
                        topic,
                        duration_minutes,
                        status,
                        actual_duration_minutes
                    )
                    VALUES (?, ?, ?, ?, ?, ?)
                    """,
                    (
                        user["id"],
                        plan["subject"],
                        plan["topic"],
                        plan["duration_minutes"],
                        "Planned",
                        0,
                    ),
                )

                conn.commit()
                conn.close()

                st.success(
                    "Saved to your study progress."
                )

    # =====================================================
    # PROGRESS
    # =====================================================

    with progress_tab:
        st.subheader(
            "Today's Study Progress"
        )

        total, completed, planned_minutes, actual_minutes = (
            get_progress_summary(user["id"])
        )

        # Summary metrics
        metric1, metric2, metric3, metric4 = st.columns(4)

        with metric1:
            st.metric(
                "Study Sessions",
                total,
            )

        with metric2:
            st.metric(
                "Completed",
                completed,
            )

        with metric3:
            st.metric(
                "Planned Time",
                f"{planned_minutes} min",
            )

        with metric4:
            st.metric(
                "Actual Time",
                f"{actual_minutes} min",
            )

        st.divider()

        # ---------------- SESSION LIST ----------------

        conn = get_connection()

        rows = conn.execute(
            """
            SELECT
                id,
                subject,
                topic,
                duration_minutes,
                status,
                COALESCE(
                    actual_duration_minutes,
                    0
                ) AS actual_duration_minutes,
                created_at
            FROM study_sessions
            WHERE user_id = ?
            ORDER BY id DESC
            """,
            (user["id"],),
        ).fetchall()

        conn.close()

        if not rows:
            st.info(
                "No study sessions yet."
            )

        else:
            st.subheader(
                "Study Sessions"
            )

            for row in rows:
                session_id = row["id"]

                with st.container(border=True):
                    col1, col2, col3 = st.columns(
                        [2, 2, 1]
                    )

                    with col1:
                        st.markdown(
                            f"### {row['subject']}"
                        )

                        st.write(
                            row["topic"]
                            or "General study"
                        )

                    with col2:
                        st.write(
                            f"**Planned:** "
                            f"{row['duration_minutes']} min"
                        )

                        st.write(
                            f"**Actual:** "
                            f"{row['actual_duration_minutes']} min"
                        )

                        st.write(
                            f"**Current:** "
                            f"{row['status']}"
                        )

                    with col3:
                        status_options = [
                            "Planned",
                            "In Progress",
                            "Completed",
                            "Partially Completed",
                            "Skipped",
                        ]

                        current_status = row["status"]

                        if current_status not in status_options:
                            current_status = "Planned"

                        selected_status = st.selectbox(
                            "Status",
                            status_options,
                            index=status_options.index(
                                current_status
                            ),
                            key=f"status_{session_id}",
                        )

                        actual_duration = st.number_input(
                            "Actual minutes",
                            min_value=0,
                            max_value=1000,
                            value=int(
                                row[
                                    "actual_duration_minutes"
                                ]
                                or 0
                            ),
                            step=5,
                            key=f"actual_{session_id}",
                        )

                        if st.button(
                            "Update",
                            key=f"update_{session_id}",
                        ):
                            update_study_session(
                                session_id,
                                selected_status,
                                int(actual_duration),
                            )

                            st.success(
                                "Study session updated."
                            )

                            st.rerun()

            # ---------------- SUBJECT SUMMARY ----------------

            st.divider()

            st.subheader(
                "Subject-wise Progress"
            )

            subject_rows = get_subject_progress(
                user["id"]
            )

            if subject_rows:
                for row in subject_rows:
                    planned = row["planned_minutes"] or 0
                    actual = row["actual_minutes"] or 0
                    sessions = row["sessions"] or 0
                    completed_count = (
                        row["completed"] or 0
                    )

                    if planned > 0:
                        completion_percentage = min(
                            int(
                                (actual / planned)
                                * 100
                            ),
                            100,
                        )
                    else:
                        completion_percentage = 0

                    st.markdown(
                        f"**{row['subject']}**"
                    )

                    st.progress(
                        completion_percentage / 100
                    )

                    st.caption(
                        f"{actual} / {planned} minutes "
                        f"• {completed_count}/{sessions} "
                        f"sessions completed "
                        f"• {completion_percentage}% time progress"
                    )


# ---------------------------------------------------------
# APP ENTRY
# ---------------------------------------------------------

if st.session_state.user is None:
    login_screen()
else:
    dashboard()