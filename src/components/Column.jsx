import React from 'react';
import { Droppable } from '@hello-pangea/dnd';
import Card from './Card';
import AddCardForm from './AddCardForm';

function Column({ columnId, column, onAddCard, onDeleteCard, onEditCard, ...restProps }) {
    const handleAddCard = (title) => {
      onAddCard(columnId, title);
    };

    return (
        <div className="column">
          <h2>{column.name}</h2>
          <Droppable droppableId={columnId} {...restProps} isCombineEnabled={false}>
            {(provided) => (
              <div
                className="card-list"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {column.items.map((item, index) => (
                  <Card
                    key={item.id}
                    item={item}
                    index={index}
                    onDelete={() => onDeleteCard(columnId, item.id)}
                    onEdit={(newContent) => onEditCard(columnId, item.id, newContent)}
                  />
                ))}
                {provided.placeholder}
                {columnId === 'todo' && <AddCardForm onAddCard={handleAddCard} />}
              </div>
            )}
          </Droppable>
        </div>
      );
    }

export default Column;
