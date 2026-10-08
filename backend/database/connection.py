import sqlite3
from pathlib import Path


BASE_DIR = Path(__file__).resolve().parents[2]
DB_PATH = BASE_DIR / "edupilot.db"


def get_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def _add_column_if_missing(conn, table_name, column_name, column_definition):
    columns = conn.execute(
        f"PRAGMA table_info({table_name})"
    ).fetchall()

    existing_columns = {row["name"] for row in columns}

    if column_name not in existing_columns:
        conn.execute(
            f"ALTER TABLE {table_name} ADD COLUMN "
            f"{column_name} {column_definition}"
        )


def init_db():
    conn = get_connection()

    # Users
    conn.execute(
        """
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL UNIQUE,
            display_name TEXT NOT NULL,
            password_hash TEXT NOT NULL,
            created_at TEXT DEFAULT CURRENT_TIMESTAMP
        )
        """
    )

    # Study sessions
    conn.execute(
        """
        CREATE TABLE IF NOT EXISTS study_sessions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            subject TEXT NOT NULL,
            topic TEXT,
            duration_minutes INTEGER NOT NULL,
            status TEXT DEFAULT 'Planned',
            created_at TEXT DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY(user_id) REFERENCES users(id)
        )
        """
    )

    # Add tracking columns to existing databases.
    # This keeps old Checkpoint-1 data safe.
    _add_column_if_missing(
        conn,
        "study_sessions",
        "actual_duration_minutes",
        "INTEGER DEFAULT 0",
    )

    _add_column_if_missing(
        conn,
        "study_sessions",
        "started_at",
        "TEXT",
    )

    _add_column_if_missing(
        conn,
        "study_sessions",
        "completed_at",
        "TEXT",
    )

    conn.commit()
    conn.close()