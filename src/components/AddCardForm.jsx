import React, { useState } from 'react';

function AddCardForm({ onAddCard }) {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() === '') return;
    onAddCard(inputValue);
    setInputValue('');
  };

  return (
    <form onSubmit={handleSubmit} className="add-card-form">
      <input
        type="text"
        placeholder="Přidat kartu..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button type="submit">+</button>
    </form>
  );
}

export default AddCardForm;
