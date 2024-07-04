import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import Carousel from './components/Carousel';
import PostList from './components/PostList';
import PostDetails from './components/PostDetails';
// import './styles.css';

const App = () => {
  const [selectedPost, setSelectedPost] = useState(null);

  return (
    <div className="app-container">
      <Header />
      <div className="content">
        <Carousel setSelectedPost={setSelectedPost} />
        <PostList setSelectedPost={setSelectedPost} />
        <PostDetails post={selectedPost} />
      </div>
      <ToastContainer />
    </div>
  );
};

export default App;
