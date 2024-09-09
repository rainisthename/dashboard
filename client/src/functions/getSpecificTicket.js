import axios from 'axios';

export const fetchTicketById = async (ticketId) => {
    try {
      const response = await axios.get(`http://localhost:3500/api/ticket/${ticketId}`);
  
      if (response.data) {
        const ticket = response.data;
        return {
          id: ticket._id,
          category: ticket.ticketCategory,
          priority: ticket.ticketPriority,
          status: ticket.ticketStatus,
          assignedTicket: ticket.ticketDepartment,
          assignedTicketName: ticket.ticketAssignedName,
          dateCreated: new Date(ticket.createdAt).toLocaleString()
        };
      } else {
        console.error('Unexpected response format:', response.data);
        throw new Error('Unexpected response format');
      }
    } catch (error) {
      console.error('Error fetching ticket by ID:', error);
      throw error;
    }
  };
  