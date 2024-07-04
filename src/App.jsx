
import React from 'react';
import PostList from './components/PostList';
import TodoApp from './components/TodoApp';
import 'bootstrap/dist/css/bootstrap.min.css';


const App = () => {
  return (
    <div>
      <TodoApp />
      <PostList />
    </div>
  );
};

export default App;
