import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Pagination } from 'react-bootstrap';
import SearchBar from './SearchBar';

const PostList = ({ setSelectedPost }) => {
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    axios.get(`http://localhost:3001/posts?_page=${currentPage}&_limit=10&q=${searchQuery}`)
      .then(response => {
        setPosts(response.data);
        setTotalPages(Math.ceil(response.headers['x-total-count'] / 10));
      })
      .catch(error => console.error(error));
  }, [currentPage, searchQuery]);

  return (
    <div>
      <SearchBar setSearchQuery={setSearchQuery} />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Body</th>
          </tr>
        </thead>
        <tbody>
          {posts.map(post => (
            <tr key={post.id} onClick={() => setSelectedPost(post)}>
              <td>{post.id}</td>
              <td>{post.title}</td>
              <td>{post.body}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination>
        {[...Array(totalPages)].map((_, index) => (
          <Pagination.Item key={index + 1} active={index + 1 === currentPage} onClick={() => setCurrentPage(index + 1)}>
            {index + 1}
          </Pagination.Item>
        ))}
      </Pagination>
    </div>
  );
};

export default PostList;
