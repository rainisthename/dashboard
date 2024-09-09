// utils/api.js

import axios from 'axios';

export const fetchTickets = async () => {
  try {
    const response = await axios.get('https://dashboard-n5mz1bbik-caletinamarklestergmailcoms-projects.vercel.app/api/ticket');

    console.log("response", response)

    // Check and handle the expected format
    if (response.data && response.data.result && Array.isArray(response.data.result)) {
      return response.data.result.map(ticket => ({
        id: ticket._id,
        category: ticket.ticketCategory,
        priority: ticket.ticketPriority,
        status: ticket.ticketStatus,
        assignedTicket: ticket.ticketDepartment,
        assignedTicketName: ticket.ticketAssignedName,
        dateCreated: new Date(ticket.createdAt).toLocaleString()
      }));
    } else {
      // Log and handle unexpected response formats
      console.error('Unexpected response format:', response.data);
      throw new Error('Unexpected response format');
    }
  } catch (error) {
    console.error('Error fetching tickets:', error);
    throw error;
  }
};
