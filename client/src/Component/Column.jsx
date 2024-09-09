import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';

const Column = ({ title, tickets, onTicketMove }) => {
    return (
        <div className="flex flex-col bg-gray-100 p-4 m-2 rounded-md w-64">
            <h2 className="text-xl font-bold mb-4">{title}</h2>
            <Droppable droppableId={title}>
                {(provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                        {tickets.map((ticket, index) => (
                            <Draggable key={ticket.id} draggableId={ticket.id} index={index}>
                                {(provided) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        className="bg-white p-2 mb-2 rounded-md shadow-md"
                                    >
                                        {ticket.category}
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    );
};

export default Column;
