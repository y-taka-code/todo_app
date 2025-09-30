import React, { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { AnimatePresence } from 'framer-motion';
import TodoForm from './components/TodoForm.js';
import Todo from './components/Todo.js';
import { GlobalStyles } from './components/GlobalStyles.js';
import { lightTheme, darkTheme } from './theme.js';
import {
  Container,
  Header,
  Title,
  ThemeToggle,
  ControlsContainer,
  SearchInput,
  Select,
  TodoList
} from './components/StyledComponents.js';

function App() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [filter, setFilter] = useState('all'); // 'all', 'active', 'completed'
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest'); // 'newest', 'oldest'
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('isDarkMode');
    return savedTheme ? JSON.parse(savedTheme) : false;
  });

  // テーマ設定をローカルストレージに保存
  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem('isDarkMode', JSON.stringify(newTheme));
  };

  // todosをローカルストレージに保存
  React.useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text) => {
    const newTodos = [...todos, { 
      text, 
      completed: false, 
      createdAt: new Date().toISOString(),
      id: Date.now()
    }];
    setTodos(newTodos);
  };

  const deleteTodo = (id) => {
    const newTodos = todos.filter(todo => todo.id !== id);
    setTodos(newTodos);
  };

  const editTodo = (id, newText) => {
    const newTodos = todos.map(todo => 
      todo.id === id ? { ...todo, text: newText } : todo
    );
    setTodos(newTodos);
  };

  const toggleTodoById = (id) => {
    const newTodos = todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(newTodos);
  };

  // フィルタリング、検索、並び替えのロジック
  const filteredAndSortedTodos = todos
    .filter(todo => {
      // 検索フィルタ
      if (searchTerm && !todo.text.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }
      // 完了状態フィルタ
      if (filter === 'active') return !todo.completed;
      if (filter === 'completed') return todo.completed;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'newest') return new Date(b.createdAt) - new Date(a.createdAt);
      if (sortBy === 'oldest') return new Date(a.createdAt) - new Date(b.createdAt);
      return 0;
    });

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <GlobalStyles />
      <Container>
        <Header>
          <Title>React ToDo管理アプリ</Title>
          <ThemeToggle
            onClick={toggleTheme}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isDarkMode ? '☀️ ライトモード' : '🌙 ダークモード'}
          </ThemeToggle>
        </Header>
        
        <ControlsContainer>
          <SearchInput
            type="text"
            placeholder="Todoを検索..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          
          <Select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">全て</option>
            <option value="active">未完了</option>
            <option value="completed">完了済み</option>
          </Select>
          
          <Select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="newest">新しい順</option>
            <option value="oldest">古い順</option>
          </Select>
        </ControlsContainer>
        
        <TodoForm addTodo={addTodo} />
        
        <TodoList>
          <AnimatePresence>
            <Todo 
              todos={filteredAndSortedTodos} 
              toggleTodo={toggleTodoById} 
              deleteTodo={deleteTodo}
              editTodo={editTodo}
            />
          </AnimatePresence>
        </TodoList>
      </Container>
    </ThemeProvider>
  );
}

export default App;