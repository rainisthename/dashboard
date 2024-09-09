const Ticket = require("../models/ticketSchema");
const asyncHandler = require("express-async-handler");

const getTicketById = asyncHandler(async (req, res) => {
  const { ticketId } = req.params; 
  try {

    const ticket = await Ticket.findById(ticketId);

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    res.json(ticket);
  } catch (error) {
    console.error("Error fetching ticket:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

const updateTicketStatus = asyncHandler(async (req, res) => {
  const { ticketId } = req.params; 
  const { ticketStatus } = req.body;

  
  console.log("test")
  try {
    
    if (!ticketId) {
      return res.status(400).json({ message: "Ticket ID is required" });
    }

    
    const updatedTicket = await Ticket.findByIdAndUpdate(
      ticketId,
      {
 
        ticketStatus,
      
      },
      { new: true } 
    );

    if (!updatedTicket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    res.json({ message: `Ticket with ID ${updatedTicket._id} updated successfully`, ticket: updatedTicket });
  } catch (error) {
    console.error("Error updating ticket:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});



const getAllTickets = asyncHandler(async (req, res) => {
  let response = { status: false, result: "" };
  try {
    
    const tickets = await Ticket.find().lean();

    if (!tickets.length) {
      response.result = "No tickets found";
    } else {
      response.status = true;
      response.result = tickets;
    }
  } catch (error) {
    console.error("Error fetching tickets:", error);
    response.result = "Internal Server Error";
    return res.status(500).json(response);
  }
  res.json(response);
});

const createNewTicket = asyncHandler(async (req, res) => {
  try {
 
    console.log(req.body);

    const ticket = await Ticket.create(req.body);

    if (ticket) {
      return res.status(201).json({ message: "New Ticket Created" });
    } else {
      return res.status(400).json({ message: "Invalid ticket data received" });
    }
  } catch (error) {
    console.error("Error creating ticket:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});



const updateTicket = asyncHandler(async (req, res) => {
  const { ticketId } = req.params; 
  const { ticketCategory, ticketPriority, ticketStatus, ticketDepartment, ticketAssignedName } = req.body;

  console.log("Request ID:", ticketId); 
  console.log("Request Body:", req.body); 

  try {
    
    if (!ticketId) {
      return res.status(400).json({ message: "Ticket ID is required" });
    }

    
    const updatedTicket = await Ticket.findByIdAndUpdate(
      ticketId,
      {
        ticketCategory,
        ticketPriority,
        ticketStatus,
        ticketDepartment,
        ticketAssignedName
      },
      { new: true } 
    );

    if (!updatedTicket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    res.json({ message: `Ticket with ID ${updatedTicket._id} updated successfully`, ticket: updatedTicket });
  } catch (error) {
    console.error("Error updating ticket:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});


const deleteTicket = asyncHandler(async (req, res) => {
  try {
    const ticketId = req.params.ticketId;

   
    const existingTicket = await Ticket.findById(ticketId);

    if (!existingTicket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    
    await Ticket.findByIdAndDelete(ticketId);

    return res.json({ message: "Ticket deleted successfully" });
  } catch (error) {
    console.error("Error deleting ticket:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = {
  getAllTickets,
  createNewTicket,
  updateTicket,
  deleteTicket,
  getTicketById,
  updateTicketStatus
};
