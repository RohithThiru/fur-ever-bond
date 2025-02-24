import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./AddBlog.css"; 

const AddBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [media, setMedia] = useState(null);
  const history = useHistory();

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setMedia(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const username = localStorage.getItem("username"); 
    if (!username) {
        console.error("❌ No username found in local storage!");
        return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("username", username); 

    if (media) {
        formData.append("media", media);
    }

    try {
        const response = await fetch("http://localhost:5000/api/blogs/add-blog", {
            method: "POST",
            body: formData,
        });

        const result = await response.json();
        if (response.ok) {
            console.log("✅ Blog Added:", result);
            history.push("/"); 
        } else {
            console.error("❌ Failed to add blog:", result.error);
        }
    } catch (error) {
        console.error("❌ Error:", error);
    }
};


  return (
    <div className="add-blog-container">
      <h2 className="add-blog-title">🐾 Share Your Pet Story 🐶🐱</h2>
      <form onSubmit={handleSubmit} className="add-blog-form">
        <input
          type="text"
          placeholder="Blog Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="blog-input"
        />
        <textarea
          placeholder="Write about your pet..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          className="blog-textarea"
        />
        <input
          type="file"
          accept="image/*,video/*"
          onChange={handleFileChange}
          required
          className="blog-file-input"
        />
        <button type="submit" className="blog-submit-btn">
          🐾 Post Blog
        </button>
      </form>
    </div>
  );
};

export default AddBlog;
