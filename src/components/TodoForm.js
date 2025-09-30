import React, { useState } from 'react';
import { FormContainer, FormInput, Button } from './StyledComponents.js';

function TodoForm({ addTodo }) {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() === '') return;
    addTodo(input);
    setInput('');
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <FormInput
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="タスクを入力"
      />
      <Button 
        type="submit"
        className="primary"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        追加
      </Button>
    </FormContainer>
  );
}

export default TodoForm;