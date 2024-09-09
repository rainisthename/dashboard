import axios from 'axios';

export const updateTicket = async (ticketId, ticketData) => {
    try {
      const response = await axios.put(`https://dashboard-n5mz1bbik-caletinamarklestergmailcoms-projects.vercel.app/api/ticket/${ticketId}`, ticketData);
  
      if (response.data) {
        console.log('Ticket updated successfully:', response.data);
      } else {
        console.error('Unexpected response format:', response.data);
        throw new Error('Unexpected response format');
      }
    } catch (error) {
      console.error(`Error updating ticket with ID ${ticketId}:`, error);
      throw error;
    }
  };
  