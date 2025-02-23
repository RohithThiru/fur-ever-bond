import React, { useEffect, useState } from "react";
import "./BlogList.css";
import Navbar from "./Navbar";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState("");
  const [selectedBlogId, setSelectedBlogId] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [comments, setComments] = useState({});
  const [showComments, setShowComments] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/blogs/all-blogs");
        const data = await response.json();
        setBlogs(data);
      } catch (error) {
        console.error("❌ Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const fetchComments = async (blogId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/comments/${blogId}`);
      const data = await response.json();
      setComments((prevComments) => ({ ...prevComments, [blogId]: data }));
    } catch (error) {
      console.error("❌ Error fetching comments:", error);
    }
  };

  const openCommentPopup = (blogId) => {
    setSelectedBlogId(blogId);
    setShowPopup(true);
    setComment("");
  };

  const closePopup = () => {
    setShowPopup(false);
    setComment("");
  };

  const submitComment = async () => {
    if (!comment.trim()) return alert("Comment cannot be empty!");
    const username = localStorage.getItem("username") || "Anonymous";
    try {
      const response = await fetch("http://localhost:5000/api/comments/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ blog_id: selectedBlogId, user_name: username, content: comment }),
      });
      if (response.ok) {
        alert("✅ Comment added successfully!");
        fetchComments(selectedBlogId);
        closePopup();
      } else {
        console.error("❌ Error adding comment:", response.statusText);
      }
    } catch (error) {
      console.error("❌ Network error:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="blog-list-container">
        <h2 className="blog-list-title">📖 Pet Stories & Blogs 🐶🐱</h2>

        {loading ? (
          <p className="loading-text">Loading blogs... ⏳</p>
        ) : blogs.length === 0 ? (
          <p className="no-blogs">No blogs available. Be the first to share! 📝</p>
        ) : (
          <div className="blogs-grid">
            {blogs.map((blog) => (
              <div key={blog.blog_id} className="blog-card">
                <div className="blog-meta">
                  <div className="card-head">
                    <span className="publisher">👤 {blog.username}</span>
                    <span className="publish-date">
                      📅 {blog.created_at ? new Date(blog.created_at).toISOString().split("T")[0] : "Unknown Date"}
                    </span>
                  </div>
                </div>

                <h3 className="blog-title">{blog.title}</h3>

                {blog.media_path && (
                  blog.media_type === "image" ? (
                    <img src={`http://localhost:5000/uploads/${blog.media_path}`} alt="Blog Media" className="blog-image" />
                  ) : (
                    <video controls className="blog-video">
                      <source src={`http://localhost:5000/uploads/${blog.media_path}`} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  )
                )}

                <p className="blog-content">{blog.content}</p>
                <div className="buttons">
                  <button className="comment-button">❤️ Like</button>
                  <button className="comment-button" onClick={() => {
                    setShowComments(blog.blog_id);
                    fetchComments(blog.blog_id);
                  }}>💬 Comment</button>
                  <button className="comment-button" onClick={() => openCommentPopup(blog.blog_id)}>💬 Add Comment</button>
                </div>

                {showComments === blog.blog_id && (
                  <div className="comments-section">
                    <h4>Comments:</h4>
                    {comments[blog.blog_id] && comments[blog.blog_id].length > 0 ? (
                      comments[blog.blog_id].map((c, index) => (
                        <div key={index} className="comment-item">
                          <strong>{c.user_name}:</strong> {c.content}
                        </div>
                      ))
                    ) : (
                      <p>No comments yet. Be the first to comment! 📝</p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {showPopup && (
        <div className="comment-popup">
          <div className="comment-popup-content">
            <h3>💬 Add a Comment</h3>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write your comment here..."
              rows="4"
            />
            <div className="comment-popup-buttons">
              <button onClick={submitComment} className="submit-comment">Submit</button>
              <button onClick={closePopup} className="close-popup">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BlogList;