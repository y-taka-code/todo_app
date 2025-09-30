import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  TodoItem,
  Checkbox,
  TodoText,
  EditInput,
  ButtonGroup,
  SmallButton
} from './StyledComponents.js';

function Todo({ todos, toggleTodo, deleteTodo, editTodo }) {
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');

  const startEdit = (todo) => {
    setEditingId(todo.id);
    setEditText(todo.text);
  };

  const saveEdit = () => {
    if (editText.trim()) {
      editTodo(editingId, editText.trim());
    }
    setEditingId(null);
    setEditText('');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditText('');
  };

  return todos.map((todo) => (
    <TodoItem
      key={todo.id}
      className={todo.completed ? 'completed' : ''}
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      layout
    >
      <Checkbox
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleTodo(todo.id)}
      />
      
      {editingId === todo.id ? (
        <ButtonGroup>
          <EditInput
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && saveEdit()}
            autoFocus
          />
          <SmallButton 
            onClick={saveEdit}
            className="primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            保存
          </SmallButton>
          <SmallButton 
            onClick={cancelEdit}
            className="danger"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            キャンセル
          </SmallButton>
        </ButtonGroup>
      ) : (
        <>
          <TodoText className={todo.completed ? 'completed' : ''}>
            {todo.text}
          </TodoText>
          <ButtonGroup>
            <SmallButton 
              onClick={() => startEdit(todo)}
              className="secondary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              編集
            </SmallButton>
            <SmallButton 
              onClick={() => deleteTodo(todo.id)}
              className="danger"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              削除
            </SmallButton>
          </ButtonGroup>
        </>
      )}
    </TodoItem>
  ));
}

export default Todo;