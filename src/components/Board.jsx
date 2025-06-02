import React, { useState } from 'react';
import Column from './Column';
import { DragDropContext } from '@hello-pangea/dnd';
import '../main.css';

const initialData = {
  columns: {
    todo: {
      name: 'To Do',
      items: [
        { id: '1', content: 'Udělat kafe' },
        { id: '2', content: 'Napsat životopis' }
      ],
    },
    inprogress: {
      name: 'In Progress',
      items: [],
    },
    done: {
      name: 'Done',
      items: [],
    },
  },
};

function Board() {
  const [columns, setColumns] = useState(initialData.columns);

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    if (source.droppableId === destination.droppableId) {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);

      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      });
    } else {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);

      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });
    }
  };

  const handleAddCard = (columnId, title) => {
    setColumns(prevColumns => {
      const newCard = {
        id: `card-${Date.now()}`,
        content: title,
      };
      const newItems = [...prevColumns[columnId].items, newCard];
      return {
        ...prevColumns,
        [columnId]: {
          ...prevColumns[columnId],
          items: newItems,
        },
      };
    });
  };

  const handleDeleteCard = (columnId, cardId) => {
    setColumns(prevColumns => {
      const newItems = prevColumns[columnId].items.filter(card => card.id !== cardId);
      return {
        ...prevColumns,
        [columnId]: {
          ...prevColumns[columnId],
          items: newItems,
        },
      };
    });
  };

  const handleEditCard = (columnId, cardId, newContent) => {
    setColumns(prevColumns => {
      const newItems = prevColumns[columnId].items.map(card =>
        card.id === cardId ? { ...card, content: newContent } : card
      );
      return {
        ...prevColumns,
        [columnId]: {
          ...prevColumns[columnId],
          items: newItems,
        },
      };
    });
  };

  return (
    <div className="board">
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="columns-container">
          {Object.entries(columns).map(([columnId, column]) => (
            <Column
              key={columnId}
              columnId={columnId}
              column={column}
              onAddCard={handleAddCard}
              onDeleteCard={handleDeleteCard}
              onEditCard={handleEditCard}
            />
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}

export default Board;
