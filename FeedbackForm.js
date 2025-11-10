import React, { useState, useEffect } from "react";

function FeedbackForm({ onAddFeedback, editingFeedback }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    rating: "",
  });
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (editingFeedback) {
      setFormData({
        name: editingFeedback.name,
        email: editingFeedback.email,
        message: editingFeedback.message,
        rating: editingFeedback.rating,
      });
    }
  }, [editingFeedback]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✨ Sentiment Analyzer
  const analyzeSentiment = (message) => {
    const text = message.toLowerCase();
    if (
      text.includes("good") ||
      text.includes("great") ||
      text.includes("nice") ||
      text.includes("love") ||
      text.includes("excellent")
    ) {
      return "Positive 😊";
    } else if (
      text.includes("bad") ||
      text.includes("poor") ||
      text.includes("slow") ||
      text.includes("error") ||
      text.includes("problem")
    ) {
      return "Negative 😞";
    } else {
      return "Neutral 😐";
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill all fields!");
      return;
    }

    const newFeedback = {
      ...formData,
      time:
        editingFeedback?.time ||
        new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        }),
      sentiment: analyzeSentiment(formData.message),
    };

    onAddFeedback(newFeedback);
    setShowPopup(true);
    setFormData({ name: "", email: "", message: "", rating: "" });

    setTimeout(() => setShowPopup(false), 2000);
  };

  const styles = {
    input: {
      width: "100%",
      padding: "10px",
      margin: "5px 0",
      border: "1px solid #ccc",
      borderRadius: "5px",
    },
  };

  return (
    <div>
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          style={styles.input}
        />

        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          style={styles.input}
        />

        <label>Message:</label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          style={styles.input}
        ></textarea>

        <label>Rating:</label>
        <select
          name="rating"
          value={formData.rating}
          onChange={handleChange}
          style={styles.input}
        >
          <option value="">Select Rating</option>
          <option value="1">⭐</option>
          <option value="2">⭐⭐</option>
          <option value="3">⭐⭐⭐</option>
          <option value="4">⭐⭐⭐⭐</option>
          <option value="5">⭐⭐⭐⭐⭐</option>
        </select>

        <button
          type="submit"
          style={{
            backgroundColor: editingFeedback ? "#FFA500" : "#007bff",
            color: "white",
            padding: "10px 15px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            marginTop: "10px",
          }}
        >
          {editingFeedback ? "Update Feedback ✏️" : "Submit Feedback"}
        </button>
      </form>

      {showPopup && (
        <div
          style={{
            backgroundColor: "#4CAF50",
            color: "white",
            padding: "10px",
            textAlign: "center",
            borderRadius: "5px",
            fontWeight: "bold",
          }}
        >
          ✅ Thank you for your feedback!
        </div>
      )}
    </div>
  );
}

export default FeedbackForm;
