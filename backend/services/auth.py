import hashlib
import os
import sqlite3

from backend.database.connection import get_connection


def hash_password(password: str, salt: bytes | None = None):
    if salt is None:
        salt = os.urandom(16)

    password_hash = hashlib.pbkdf2_hmac(
        "sha256",
        password.encode("utf-8"),
        salt,
        120_000,
    )

    return salt.hex() + "$" + password_hash.hex()


def verify_password(password: str, stored_hash: str):
    salt_hex, hash_hex = stored_hash.split("$", 1)

    salt = bytes.fromhex(salt_hex)

    password_hash = hashlib.pbkdf2_hmac(
        "sha256",
        password.encode("utf-8"),
        salt,
        120_000,
    )

    return password_hash.hex() == hash_hex


def create_user(username: str, display_name: str, password: str):
    conn = get_connection()

    try:
        conn.execute(
            """
            INSERT INTO users (username, display_name, password_hash)
            VALUES (?, ?, ?)
            """,
            (username.strip().lower(), display_name.strip(), hash_password(password)),
        )
        conn.commit()
        return True, "Account created successfully."

    except sqlite3.IntegrityError:
        return False, "Username already exists."

    finally:
        conn.close()


def authenticate_user(username: str, password: str):
    conn = get_connection()

    row = conn.execute(
        """
        SELECT id, username, display_name, password_hash
        FROM users
        WHERE lower(username) = lower(?)
        LIMIT 1
        """,
        (username.strip(),),
    ).fetchone()

    conn.close()

    if not row:
        return None

    if not verify_password(password, row["password_hash"]):
        return None

    return {
        "id": row["id"],
        "username": row["username"],
        "display_name": row["display_name"],
    }