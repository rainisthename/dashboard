import React, { useEffect, useState } from 'react';
import { fetchTickets } from '../functions/getTickets'; // Your API functions
import { updateTicketStatus } from '../functions/updateStatusTicket'; // Your API functions

import Column from './Column'; // Component for each status column

const Board = () => {
    const [tickets, setTickets] = useState({
        open: [],
        inProgress: [],
        onHold: [],
        canceled: [],
        closed: []
    });

    useEffect(() => {
        fetchTickets().then(data => {
            // Organize tickets based on status
            const organizedTickets = {
                open: data.filter(ticket => ticket.status === 'Open'),
                inProgress: data.filter(ticket => ticket.status === 'In Progress'),
                onHold: data.filter(ticket => ticket.status === 'On-hold'),
                canceled: data.filter(ticket => ticket.status === 'Canceled'),
                closed: data.filter(ticket => ticket.status === 'Closed')
            };
            setTickets(organizedTickets);
        });
    }, []);

    const onTicketMove = (ticketId, newStatus) => {
        updateTicketStatus(ticketId, { status: newStatus }).then(() => {
            // Update the board state after the ticket is moved
            setTickets(prevTickets => {
                // Remove the ticket from its current status column
                const updatedTickets = { ...prevTickets };
                for (const status in updatedTickets) {
                    updatedTickets[status] = updatedTickets[status].filter(ticket => ticket.id !== ticketId);
                }
                // Add the ticket to the new status column
                updatedTickets[newStatus.toLowerCase().replace('-', '')].push({
                    ...prevTickets[newStatus.toLowerCase().replace('-', '')],
                    status: newStatus
                });
                return updatedTickets;
            });
        });
    };

    return (
        <div className="flex">
            <Column title="Open" tickets={tickets.open} onTicketMove={onTicketMove} />
            <Column title="In Progress" tickets={tickets.inProgress} onTicketMove={onTicketMove} />
            <Column title="On-hold" tickets={tickets.onHold} onTicketMove={onTicketMove} />
            <Column title="Canceled" tickets={tickets.canceled} onTicketMove={onTicketMove} />
            <Column title="Closed" tickets={tickets.closed} onTicketMove={onTicketMove} />
        </div>
    );
};

export default Board;
