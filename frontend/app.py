import streamlit as st

from backend.database.connection import init_db, get_connection
from backend.services.auth import authenticate_user, create_user
from backend.services.planner import create_quick_plan


st.set_page_config(
    page_title="EduPilot",
    page_icon="📚",
    layout="wide",
)

init_db()

if "user" not in st.session_state:
    st.session_state.user = None


def login_screen():
    st.title("📚 EduPilot")
    st.caption("Plan → Study → Track → Analyze → Adapt → Improve")

    login_tab, create_tab = st.tabs(["Login", "Create Account"])

    with login_tab:
        username = st.text_input("Username", key="login_username")
        password = st.text_input(
            "Password",
            type="password",
            key="login_password",
        )

        if st.button("Sign In", type="primary"):
            user = authenticate_user(username, password)

            if user:
                st.session_state.user = user
                st.rerun()
            else:
                st.error("Invalid username or password.")

    with create_tab:
        display_name = st.text_input("Your name")
        username = st.text_input("Choose a username", key="create_username")
        password = st.text_input(
            "Choose a password",
            type="password",
            key="create_password",
        )

        if st.button("Create Account"):
            if not display_name or not username or not password:
                st.error("Please fill in all fields.")
            elif len(password) < 6:
                st.error("Password must be at least 6 characters.")
            else:
                success, message = create_user(
                    username,
                    display_name,
                    password,
                )

                if success:
                    st.success(message)
                    st.info("Go to the Login tab and sign in.")
                else:
                    st.error(message)


def dashboard():
    user = st.session_state.user

    top_left, top_right = st.columns([4, 1])

    with top_left:
        st.title(f"Welcome, {user['display_name']} 👋")
        st.caption("Your personalized study workspace")

    with top_right:
        if st.button("Logout"):
            st.session_state.user = None
            st.rerun()

    st.divider()

    plan_tab, progress_tab = st.tabs(
        ["⚡ Quick Study Plan", "📈 Progress"]
    )

    with plan_tab:
        st.subheader("Create a quick study plan")

        subject = st.text_input("Subject")
        topic = st.text_input("Topic")
        available_minutes = st.number_input(
            "Available time (minutes)",
            min_value=10,
            max_value=240,
            value=30,
            step=5,
        )

        if st.button("Generate Plan", type="primary"):
            if not subject:
                st.error("Enter a subject.")
            else:
                plan = create_quick_plan(
                    subject,
                    topic,
                    int(available_minutes),
                )

                st.success("Study plan created!")

                col1, col2, col3 = st.columns(3)

                with col1:
                    st.metric("Subject", plan["subject"])

                with col2:
                    st.metric("Duration", f"{plan['duration_minutes']} min")

                with col3:
                    st.metric("Status", "Planned")

                st.info(plan["recommendation"])

                conn = get_connection()

                conn.execute(
                    """
                    INSERT INTO study_sessions
                    (user_id, subject, topic, duration_minutes, status)
                    VALUES (?, ?, ?, ?, ?)
                    """,
                    (
                        user["id"],
                        plan["subject"],
                        plan["topic"],
                        plan["duration_minutes"],
                        "Planned",
                    ),
                )

                conn.commit()
                conn.close()

    with progress_tab:
        st.subheader("Today's Study Progress")

        conn = get_connection()

        rows = conn.execute(
            """
            SELECT subject, topic, duration_minutes, status
            FROM study_sessions
            WHERE user_id = ?
            ORDER BY id DESC
            """,
            (user["id"],),
        ).fetchall()

        conn.close()

        if not rows:
            st.info("No study sessions yet.")
        else:
            for row in rows:
                st.write(
                    f"**{row['subject']}** — "
                    f"{row['topic'] or 'General study'} — "
                    f"{row['duration_minutes']} min — "
                    f"{row['status']}"
                )


if st.session_state.user is None:
    login_screen()
else:
    dashboard()