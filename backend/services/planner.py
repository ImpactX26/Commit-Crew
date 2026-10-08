def create_quick_plan(subject: str, topic: str, available_minutes: int):
    subject = subject.strip()
    topic = topic.strip()

    if available_minutes <= 0:
        raise ValueError("Available time must be greater than zero.")

    if available_minutes <= 25:
        session_length = available_minutes
        recommendation = "Focus on one small topic and finish with a quick review."
    elif available_minutes <= 60:
        session_length = available_minutes
        recommendation = "Study the topic, then spend the final 10 minutes revising."
    else:
        session_length = 45
        recommendation = "Use 45 minutes for focused study and reserve the remaining time for review or another session."

    return {
        "subject": subject,
        "topic": topic,
        "duration_minutes": session_length,
        "recommendation": recommendation,
    }