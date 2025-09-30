import React, { useState, useEffect } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { AnimatePresence } from 'framer-motion';
import TodoForm from './components/TodoForm.js';
import Todo from './components/Todo.js';
import { GlobalStyles } from './components/GlobalStyles.js';
import { lightTheme, darkTheme } from './theme.js';
import { notificationManager } from './utils/notifications.js';
import { createRecurringTask, checkOverdueTasks, checkUrgentTasks } from './utils/recurringTasks.js';
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
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // 通知の初期化と定期チェック
  useEffect(() => {
    // 既存のタスクの通知をスケジュール
    todos.forEach(todo => {
      if (todo.dueDate && !todo.completed) {
        notificationManager.scheduleNotification(todo);
      }
    });

    // 1分ごとに期限切れタスクをチェック
    const interval = setInterval(() => {
      const overdueTasks = checkOverdueTasks(todos);
      const urgentTasks = checkUrgentTasks(todos);
      
      // 期限切れタスクがある場合の処理（必要に応じて）
      if (overdueTasks.length > 0) {
        console.log('期限切れタスク:', overdueTasks.length);
      }
    }, 60000); // 1分

    return () => {
      clearInterval(interval);
      notificationManager.clearAllNotifications();
    };
  }, [todos]);

  const addTodo = (todoData) => {
    const newTodo = {
      text: typeof todoData === 'string' ? todoData : todoData.text,
      completed: false,
      dueDate: typeof todoData === 'string' ? null : todoData.dueDate,
      repeat: typeof todoData === 'string' ? 'none' : todoData.repeat,
      createdAt: new Date().toISOString(),
      id: Date.now()
    };
    
    const newTodos = [...todos, newTodo];
    setTodos(newTodos);
    
    // 通知をスケジュール
    if (newTodo.dueDate) {
      notificationManager.scheduleNotification(newTodo);
    }
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
    const todo = todos.find(t => t.id === id);
    if (!todo) return;

    const newTodos = todos.map(t => 
      t.id === id ? { ...t, completed: !t.completed } : t
    );

    // タスクが完了された場合
    if (!todo.completed && todo.repeat !== 'none') {
      const recurringTask = createRecurringTask({ ...todo, completed: true });
      if (recurringTask) {
        newTodos.push(recurringTask);
        // 新しいタスクの通知もスケジュール
        if (recurringTask.dueDate) {
          notificationManager.scheduleNotification(recurringTask);
        }
      }
    }

    // 完了解除された場合は通知を再スケジュール
    if (todo.completed && todo.dueDate) {
      notificationManager.scheduleNotification({ ...todo, completed: false });
    }

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