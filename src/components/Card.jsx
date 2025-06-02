import React, { useState } from 'react';
import { Draggable } from '@hello-pangea/dnd';

function Card({ item, index, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(item.content);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleChange = (e) => {
    setEditText(e.target.value);
  };

  const handleBlur = () => {
    if (editText.trim() === '') {
      setEditText(item.content);
    } else if (editText !== item.content) {
      onEdit(editText);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleBlur();
    } else if (e.key === 'Escape') {
      setEditText(item.content);
      setIsEditing(false);
    }
  };

  return (
    <Draggable draggableId={item.id} index={index}>
      {(provided) => (
        <div
          className="card"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {isEditing ? (
            <input
              type="text"
              value={editText}
              onChange={handleChange}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
              autoFocus
              className="card-edit-input"
            />
          ) : (
            <>
              <span>{item.content}</span>
              <button onClick={handleEditClick} className="edit-btn" aria-label="Edit card">
                ✏️
              </button>
              <button onClick={onDelete} className="delete-btn" aria-label="Delete card">
                🗑️
              </button>
            </>
          )}
        </div>
      )}
    </Draggable>
  );
}

export default Card;
