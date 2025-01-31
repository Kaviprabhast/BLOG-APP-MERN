import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import IndexPage from "./Pages/IndexPage";
import RegisterPage from "./Pages/RegistrationPage";
import Home from "./Home";
import CreatePost from "./Pages/CreatePost";
import Profile from "./Profile";
import './CSS/App.css';
import LoginPage from "./Pages/LoginPage";
import Footer from "./Pages/Footer";
import Phome from "./Pages/Phome";
import { UserContextProvider } from "./UserContext";
import Blog from "./Pages/Blog";
import Subscribe from "./Subscribe";

const App = () => {
  const [posts, setPosts] = useState([]); 

  const handleAddPost = (post) => {
    setPosts([post, ...posts]); 
  };

  const user = {
    name: "Prabha",
    portfolio: "https://kaviprabhast.github.io/Portfolio_task/",
  };

  const handleLogout = () => {
    console.log("User logged out");
    window.location.href = "/login";
  };

  return (
    <UserContextProvider>
      <Router>
        <div>      
          <Routes>
            <Route index element={<IndexPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/subscribe" element={<Subscribe />} />
            <Route path="/home" element={<Home posts={posts} />} />
            <Route path="/create" element={<CreatePost addPost={handleAddPost} />} />
            <Route path="/blogs" element={<Blog posts={posts} />} />
            <Route path="/profile" element={<div><Phome></Phome><Profile user={user} onLogout={handleLogout} /></div>} />
            <Route path="/footer" element={<Footer />} />
          </Routes>
        </div>
      </Router>
    </UserContextProvider>
  );
};

export default App;
