import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import { Button, Card, Row, Col } from 'react-bootstrap';
import axios from 'axios';

const Carousel = ({ setSelectedPost }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/posts')
      .then(response => setPosts(response.data))
      .catch(error => console.error(error));
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  return (
    <Slider {...settings}>
      {posts.map(post => (
        <Card key={post.id} style={{ width: '18rem' }}>
          <Card.Body>
            <Row>
              <Col xs={6}>
                <Card.Title>{post.title}</Card.Title>
                <Card.Text>{post.body}</Card.Text>
              </Col>
              <Col xs={6}>
                <Button variant="primary" onClick={() => setSelectedPost(post)}>View Details</Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      ))}
    </Slider>
  );
};

export default Carousel;
