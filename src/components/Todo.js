import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import StreakDisplay from './StreakDisplay.js';
import { calculateStreak, getStreakStatus, getNextMilestone } from '../utils/streakManager.js';
import {
  TodoItem,
  Checkbox,
  TodoText,
  EditInput,
  ButtonGroup,
  SmallButton
} from './StyledComponents.js';

const TodoDetails = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: ${props => props.theme.spacing.xs};
`;

const DueDate = styled.span`
  font-size: 0.75rem;
  color: ${props => {
    if (!props.dueDate) return props.theme.colors.textSecondary;
    
    const now = new Date();
    const due = new Date(props.dueDate);
    const diffHours = (due - now) / (1000 * 60 * 60);
    
    if (diffHours < 0) return props.theme.colors.danger; // 期限切れ
    if (diffHours < 24) return props.theme.colors.warning; // 24時間以内
    return props.theme.colors.textSecondary; // 通常
  }};
  
  &.overdue {
    font-weight: 600;
  }
  
  &.urgent {
    font-weight: 500;
  }
`;

const RepeatBadge = styled.span`
  font-size: 0.75rem;
  padding: 2px 6px;
  border-radius: 12px;
  background: ${props => props.theme.colors.primary};
  color: white;
  font-weight: 500;
`;

const formatDueDate = (dueDate) => {
  if (!dueDate) return null;
  
  const now = new Date();
  const due = new Date(dueDate);
  const diffMs = due - now;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  
  if (diffMs < 0) {
    return `期限切れ (${Math.abs(diffDays)}日前)`;
  } else if (diffMinutes < 60) {
    return `${diffMinutes}分後`;
  } else if (diffHours < 24) {
    return `${diffHours}時間後`;
  } else if (diffDays === 0) {
    return '今日';
  } else if (diffDays === 1) {
    return '明日';
  } else {
    return `${diffDays}日後`;
  }
};

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
          <TodoDetails>
            <TodoText className={todo.completed ? 'completed' : ''}>
              {todo.text}
            </TodoText>
            {todo.dueDate && (
              <DueDate 
                dueDate={todo.dueDate}
                className={(() => {
                  const now = new Date();
                  const due = new Date(todo.dueDate);
                  const diffHours = (due - now) / (1000 * 60 * 60);
                  
                  if (diffHours < 0) return 'overdue';
                  if (diffHours < 24) return 'urgent';
                  return '';
                })()}
              >
                📅 {formatDueDate(todo.dueDate)}
              </DueDate>
            )}
            {todo.repeat !== 'none' && (
              <RepeatBadge>
                🔄 {todo.repeat === 'daily' ? '毎日' : 
                     todo.repeat === 'weekly' ? '毎週' : 
                     todo.repeat === 'monthly' ? '毎月' : todo.repeat}
              </RepeatBadge>
            )}
            
            {todo.repeat !== 'none' && (
              <StreakDisplay
                streak={calculateStreak(todo, todo.completionHistory)}
                nextMilestone={getNextMilestone(calculateStreak(todo, todo.completionHistory))}
                status={getStreakStatus(calculateStreak(todo, todo.completionHistory))}
              />
            )}
          </TodoDetails>
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