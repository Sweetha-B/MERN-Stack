import React, { useState } from "react";

function FeedbackList({ feedbacks, onDelete, onEdit }) {
  const [search, setSearch] = useState("");

  const filtered = feedbacks.filter(
    (f) =>
      f.name.toLowerCase().includes(search.toLowerCase()) ||
      f.message.toLowerCase().includes(search.toLowerCase())
  );

  const styles = {
    card: {
      border: "1px solid #ddd",
      padding: "15px",
      marginBottom: "10px",
      borderRadius: "10px",
      backgroundColor: "#f9f9f9",
      boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    },
  };

  const getSentimentColor = (sentiment) => {
    if (sentiment?.includes("Positive")) return "#c8f7c5"; // light green
    if (sentiment?.includes("Negative")) return "#f7c5c5"; // light red
    return "#ffffff"; // white for Neutral
  };

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>All Feedback</h2>

      <input
        type="text"
        placeholder="Search feedback..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "100%",
          padding: "8px",
          marginBottom: "15px",
          borderRadius: "5px",
          border: "1px solid #ccc",
        }}
      />

      {filtered.length === 0 ? (
        <p style={{ textAlign: "center" }}>No feedback found.</p>
      ) : (
        filtered.map((f, i) => (
          <div
            key={i}
            style={{
              ...styles.card,
              backgroundColor: getSentimentColor(f.sentiment),
            }}
          >
            <p>
              <b>{f.name}</b> ({f.email})
            </p>
            <p>{f.message}</p>
            {f.rating && <p>Rating: {"⭐".repeat(f.rating)}</p>}
            <p>
              <b>Sentiment:</b> {f.sentiment}
            </p>
            <small style={{ color: "gray" }}>⏰ {f.time}</small>

            <div style={{ marginTop: "10px" }}>
              <button
                onClick={() => onEdit(f)}
                style={{
                  marginRight: "10px",
                  backgroundColor: "#FFA500",
                  color: "white",
                  border: "none",
                  padding: "5px 10px",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                ✏️ Edit
              </button>
              <button
                onClick={() => onDelete(f.time)}
                style={{
                  backgroundColor: "#DC3545",
                  color: "white",
                  border: "none",
                  padding: "5px 10px",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                🗑️ Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default FeedbackList;
