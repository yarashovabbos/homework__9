// src/PostList.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Row, Col, Button, Pagination } from 'react-bootstrap';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(4);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/posts');
      setPosts(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching posts:', error);
      setLoading(false);
    }
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const showDetails = (post) => {
    setSelectedPost(post);
  };

  return (
    <div>
      <h2>Posts</h2>
      {loading ? <p>Loading...</p> : (
        <Row>
          {currentPosts.map(post => (
            <Col key={post.id} md={3}>
              <Card>
                <Card.Body>
                  <Card.Title>{post.title}</Card.Title>
                  <Card.Text>{post.body}</Card.Text>
                  <Button variant="primary" onClick={() => showDetails(post)}>
                    Show Details
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      <Pagination>
        {Array.from({ length: Math.ceil(posts.length / postsPerPage) }, (_, index) => (
          <Pagination.Item key={index + 1} onClick={() => paginate(index + 1)}>
            {index + 1}
          </Pagination.Item>
        ))}
      </Pagination>

      {selectedPost && (
        <Row>
          <Col>
            <Card style={{ marginTop: '20px' }}>
              <Card.Body>
                <Card.Title>{selectedPost.title}</Card.Title>
                <Card.Text>{selectedPost.body}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default PostList;
