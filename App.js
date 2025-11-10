import React, { useState, useEffect } from "react";
import FeedbackForm from "./components/FeedbackForm";
import FeedbackList from "./components/FeedbackList";

function App() {
  const [feedbacks, setFeedbacks] = useState(() => {
    const saved = localStorage.getItem("feedbacks");
    return saved ? JSON.parse(saved) : [];
  });

  const [editingFeedback, setEditingFeedback] = useState(null);

  useEffect(() => {
    localStorage.setItem("feedbacks", JSON.stringify(feedbacks));
  }, [feedbacks]);

  const handleAddFeedback = (feedback) => {
    if (editingFeedback) {
      setFeedbacks(
        feedbacks.map((f) =>
          f.time === editingFeedback.time ? { ...feedback } : f
        )
      );
      setEditingFeedback(null);
    } else {
      setFeedbacks([...feedbacks, feedback]);
    }
  };

  const handleDelete = (time) => {
    if (window.confirm("Are you sure you want to delete this feedback?")) {
      setFeedbacks(feedbacks.filter((f) => f.time !== time));
    }
  };

  const handleEdit = (feedback) => {
    setEditingFeedback(feedback);
  };

  return (
    <div style={{ maxWidth: "600px", margin: "auto", padding: "20px" }}>
      <h1 style={{ textAlign: "center" }}>Feedback Collection App</h1>
      <p style={{ textAlign: "center" }}>Total Feedbacks: {feedbacks.length}</p>

      <FeedbackForm
        onAddFeedback={handleAddFeedback}
        editingFeedback={editingFeedback}
      />
      <FeedbackList
        feedbacks={feedbacks}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    </div>
  );
}

export default App;
