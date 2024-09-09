import axios from 'axios';

export const deleteTicket = async (ticketId, ticketData) => {
    try {
      const response = await axios.delete(`http://localhost:3500/api/ticket/${ticketId}`);
  
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
  