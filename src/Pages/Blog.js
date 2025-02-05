import React, { useEffect, useState } from "react";
import Header from "../Header";
import Footer from "../Pages/Footer";
import "../CSS/Blog.css";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingBlog, setEditingBlog] = useState(null);
  const [updatedBlog, setUpdatedBlog] = useState({
    title: "",
    content: "",
    category: "",
    link: "", 
  });

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("https://blog-app-mern-back-8b2y.onrender.com/blogs");
        if (!response.ok) throw new Error("Failed to fetch blogs");
        const data = await response.json();
        setBlogs(data.blogs);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const handleDelete = async (blogId) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;

    try {
      const response = await fetch(`https://blog-app-mern-back-8b2y.onrender.com/blogs/${blogId}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== blogId));
      } else {
        throw new Error("Failed to delete the blog");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const handleEdit = (blog) => {
    setEditingBlog(blog._id);
    setUpdatedBlog({
      title: blog.title,
      content: blog.content,
      category: blog.category,
      link: blog.link || "", 
    });
  };

  const handleUpdate = async () => {
    if (!updatedBlog.title || !updatedBlog.content || !updatedBlog.category) {
      alert("All fields are required.");
      return;
    }

    try {
      const response = await fetch(`https://blog-app-mern-back-8b2y.onrender.com/blogs/${editingBlog}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedBlog),
      });
      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        setBlogs((prevBlogs) =>
          prevBlogs.map((blog) =>
            blog._id === editingBlog ? { ...blog, ...updatedBlog } : blog
          )
        );
        setEditingBlog(null);
      } else {
        throw new Error("Failed to update the blog");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  if (loading) return <p>Loading blogs...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <Header />
      <div className="my-blogs">
        {blogs.length > 0 ? (
          <ul>
            {blogs.map((blog) => (
              <li key={blog._id}>
                {editingBlog === blog._id ? (
                  <>
                    <label>Title</label>
                    <input
                      type="text"
                      value={updatedBlog.title}
                      onChange={(e) =>
                        setUpdatedBlog({ ...updatedBlog, title: e.target.value })
                      }
                    />
                    <label>Content</label>
                    <textarea
                      value={updatedBlog.content}
                      onChange={(e) =>
                        setUpdatedBlog({ ...updatedBlog, content: e.target.value })
                      }
                    />
                    <label>Category</label>
                    <input
                      type="text"
                      value={updatedBlog.category}
                      onChange={(e) =>
                        setUpdatedBlog({ ...updatedBlog, category: e.target.value })
                      }
                    />
                    <label>Link</label>
                    <input
                      type="text"
                      placeholder="Enter link (optional)"
                      value={updatedBlog.link}
                      onChange={(e) =>
                        setUpdatedBlog({ ...updatedBlog, link: e.target.value })
                      }
                    />
                    <button className="save-btn" onClick={handleUpdate} disabled={!updatedBlog.title || !updatedBlog.content || !updatedBlog.category}>
                      Save
                    </button>
                  </>
                ) : (
                  <>
                    <h3>{blog.title}</h3>
                    <p>{blog.content}</p>
                    <p>
                      <em>{blog.category}</em>
                    </p>
                    <p>Author: {blog.author}</p>
                    <p>Posted on: {new Date(blog.createdAt).toLocaleDateString()}</p>
                    {blog.link && (
                      <p>
                        <a href={blog.link} target="_blank" rel="noopener noreferrer">
                          Read More
                        </a>
                      </p>
                    )}
                    <div className="blog-buttons">
                      <button className="update-btn" onClick={() => handleEdit(blog)}>Update</button>
                      <button className="delete-btn" onClick={() => handleDelete(blog._id)}>Delete</button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p>No blogs found</p>
        )}
      </div>
      <Footer/>
    </div>
  );
};

export default Blog;
