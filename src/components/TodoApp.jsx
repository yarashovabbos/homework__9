import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Form, Button, Carousel } from 'react-bootstrap';

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);
  const [selectedTodo, setSelectedTodo] = useState(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get('http://localhost:5000/todos');
      setTodos(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching todos:', error);
      setLoading(false);
    }
  };

  const addTodo = async (todo) => {
    try {
      const response = await axios.post('http://localhost:5000/todos', todo);
      setTodos([...todos, response.data]);
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const filteredTodos = todos.filter(todo =>
    todo.title.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination logic
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredTodos.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const showDetails = (todo) => {
    setSelectedTodo(todo);
  };

  return (
    <Container style={{ backgroundColor: 'black', color: 'white', border: '1px solid blue', padding: '20px', maxWidth: '100%' }}>
      <Row>
        <Col>
          <h1>Todo App</h1>
          <Form inline>
            <Form.Control type="text" placeholder="Search" onChange={(e) => setSearch(e.target.value)} />
          </Form>
          <Button onClick={() => addTodo({ title: 'New Todo', completed: false })}>Add Todo</Button>
        </Col>
      </Row>

      {loading ? <p>Loading...</p> : (
        <>
          <Row>
            <Carousel>
              {currentPosts.map((todo) => (
                <Carousel.Item key={todo.id}>
                  <Card>
                    <Card.Body>
                      <Row>
                        <Col><Card.Title>{todo.title}</Card.Title></Col>
                        <Col><Card.Text>{todo.completed ? "Completed" : "Incomplete"}</Card.Text></Col>
                      </Row>
                      <Row>
                        <Col><Button variant="primary" onClick={() => showDetails(todo)}>Show Details</Button></Col>
                      </Row>
                    </Card.Body>
                  </Card>
                </Carousel.Item>
              ))}
            </Carousel>
          </Row>

          <Row>
            <Pagination
              postsPerPage={postsPerPage}
              totalPosts={filteredTodos.length}
              paginate={paginate}
            />
          </Row>

          {selectedTodo && (
            <Row>
              <Col>
                <Card style={{ marginTop: '20px' }}>
                  <Card.Body>
                    <Card.Title>{selectedTodo.title}</Card.Title>
                    <Card.Text>{selectedTodo.completed ? "Completed" : "Incomplete"}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          )}
        </>
      )}
    </Container>
  );
};

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map(number => (
          <li key={number} className="page-item">
            <a onClick={() => paginate(number)} className="page-link" href="#">
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default TodoApp;
