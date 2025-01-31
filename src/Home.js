import React from 'react';
import Header from './Header';
import Footer from './Pages/Footer';
import './CSS/Home.css';
import { useNavigate } from 'react-router-dom';

const Home = ({ posts }) => {

  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/create');
  };

  const defaultBlogs = [
    {
      title: 'How to Start Blogging',
      author: 'John Doe',
      content: 'Blogging is a great way to share your knowledge and ideas. Start with a niche you love...',
      link: 'https://example.com/start-blogging',
    },
    {
      title: 'Top 10 Tips for Writing Engaging Articles',
      author: 'Jane Smith',
      content: 'Writing engaging content requires a mix of research, creativity, and structure...',
      link: 'https://example.com/writing-tips',
    },
    {
      title: 'SEO Best Practices for 2025',
      author: 'Michael Lee',
      content: 'Want to rank higher on search engines? Follow these latest SEO strategies...',
      link: 'https://example.com/seo-2025',
    },
  ];

  return (
    <div>
      <Header />
      <div className="home">
        <h1>Welcome to Your Blogging World!</h1>
        <p>Discover articles, share your thoughts, and explore diverse topics.</p>

        <button className="hbtn" onClick={handleButtonClick}>Create Post</button>
        {posts.length > 0 && (
          <div>
            <h2 className="section-title">Latest Blogs</h2>
            <div className="posts-container">
              {posts.map((post, index) => (
                <div key={index} className="post-card">
                  <h3>{post.title}</h3>
                  <p><strong>Author:</strong> {post.author}</p>
                  <p>{post.content}</p>
                  {post.link && (
                    <p>
                      <a href={post.link}  target="_blank" rel="noopener noreferrer">
                        Read More
                      </a>
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <h2 className="section-title">Blogs</h2>
        <div className="posts-container">
          {defaultBlogs.map((post, index) => (
            <div key={index} className="post-card">
              <h3>{post.title}</h3>
              <p><strong>Author:</strong> {post.author}</p>
              <p>{post.content}</p>
              {post.link && (
                <p>
                  <a href={post.link}  target="_blank" rel="noopener noreferrer">
                    Read More
                  </a>
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Home;
