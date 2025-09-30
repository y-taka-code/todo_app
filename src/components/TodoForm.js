import React, { useState } from 'react';
import styled from 'styled-components';
import { FormContainer, FormInput, Button, Select } from './StyledComponents.js';

const ExtendedFormContainer = styled(FormContainer)`
  flex-direction: column;
  gap: ${props => props.theme.spacing.md};
  
  .form-row {
    display: flex;
    gap: ${props => props.theme.spacing.sm};
    
    @media (max-width: 480px) {
      flex-direction: column;
    }
  }
  
  .form-group {
    display: flex;
    flex-direction: column;
    gap: ${props => props.theme.spacing.xs};
    flex: 1;
  }
  
  .form-label {
    font-size: 0.875rem;
    font-weight: 500;
    color: ${props => props.theme.colors.text};
  }
  
  .datetime-input {
    padding: ${props => props.theme.spacing.sm};
    border: 2px solid ${props => props.theme.colors.border};
    border-radius: ${props => props.theme.borderRadius.md};
    background: ${props => props.theme.colors.surface};
    color: ${props => props.theme.colors.text};
    font-size: 1rem;
    
    &:focus {
      border-color: ${props => props.theme.colors.primary};
    }
  }
`;

function TodoForm({ addTodo }) {
  const [input, setInput] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [repeat, setRepeat] = useState('none');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() === '') return;
    
    const todoData = {
      text: input.trim(),
      dueDate: dueDate || null,
      repeat: repeat,
      completed: false,
      createdAt: new Date().toISOString(),
      id: Date.now()
    };
    
    addTodo(todoData);
    setInput('');
    setDueDate('');
    setRepeat('none');
  };

  return (
    <ExtendedFormContainer onSubmit={handleSubmit}>
      <FormInput
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="タスクを入力"
      />
      
      <div className="form-row">
        <div className="form-group">
          <label className="form-label">期限日時（オプション）</label>
          <input
            type="datetime-local"
            className="datetime-input"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
        
        <div className="form-group">
          <label className="form-label">繰り返し</label>
          <Select
            value={repeat}
            onChange={(e) => setRepeat(e.target.value)}
          >
            <option value="none">繰り返しなし</option>
            <option value="daily">毎日</option>
            <option value="weekly">毎週</option>
            <option value="monthly">毎月</option>
          </Select>
        </div>
      </div>
      
      <Button 
        type="submit"
        className="primary"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        追加
      </Button>
    </ExtendedFormContainer>
  );
}

export default TodoForm;