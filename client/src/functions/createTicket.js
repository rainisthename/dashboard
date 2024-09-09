import axios from 'axios';


export const createTicket = async (ticketData) => {
    try {
      // Ensure ticketData follows the expected format
      const response = await axios.post('http://localhost:3500/api/ticket', ticketData);
  
      console.log("response", response);
  
      // Check and handle the expected response format
      if (response.data && response.data.status) {
        return {
          id: response.data.result._id,
          category: response.data.result.ticketCategory,
          priority: response.data.result.ticketPriority,
          status: response.data.result.ticketStatus,
          assignedTicket: response.data.result.ticketDepartment,
          assignedTicketName: response.data.result.ticketAssignedName,
          dateCreated: new Date(response.data.result.createdAt).toLocaleString()
        };
      } else {
        // Log and handle unexpected response formats
        console.error('Unexpected response format:', response.data);
        throw new Error('Unexpected response format');
      }
    } catch (error) {
      console.error('Error creating ticket:', error);
      throw error;
    }
  };
  