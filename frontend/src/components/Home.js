import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Navbar from "./Navbar"; // Import Navbar
import "./Home.css"; // Import CSS file for styling

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const history = useHistory();

  // Fetch blogs from backend API
  useEffect(() => {
    fetch("http://localhost:5000/blogs")
      .then((response) => response.json())
      .then((data) => setBlogs(data))
      .catch((error) => console.error("Error fetching blogs:", error));
  }, []);

  const handleAddBlog = () => {
    history.push("/add-blog"); // Redirect to Add Blog Page
  };

  return (
    <div>
      <Navbar /> {/* Add Navbar at the top */}

      <div className="home-container">
        <header className="home-header">
          <h2>Blogs</h2>
          <button className="add-blog-btn" onClick={handleAddBlog}>+ Add Blog</button>
        </header>

        <div className="blog-list">
          {blogs.length === 0 ? (
            <p>No blogs available. Add a new one!</p>
          ) : (
            blogs.map((blog) => (
              <div key={blog.blog_id} className="blog-card">
                <h3>{blog.title}</h3>
                <p>{blog.content.substring(0, 100)}...</p>
                <small>Created on: {new Date(blog.created_at).toLocaleDateString()}</small>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
