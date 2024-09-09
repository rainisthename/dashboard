import React, { useState, useEffect, useRef } from "react";
import departmentsData from "../data/autocomplete.json"; // Adjust the path as needed
import { updateTicket } from "../functions/updateTicket"; // Adjust the path as needed
import { deleteTicket } from "../functions/deleteTicket"; // Adjust the path as needed

const UpdateModal = ({ isOpen, onClose, ticket, name }) => {
  const [department, setDepartment] = useState(ticket?.assignedTicket || "");
  const [inputValue, setInputValue] = useState(
    ticket?.assignedTicketName ? ticket.assignedTicketName : name,
  );
  const [names, setNames] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Ref to track the latest ticket data
  const ticketRef = useRef(ticket);

  useEffect(() => {
    // Update the ref whenever ticket changes
    ticketRef.current = ticket;
  }, [ticket]);

  useEffect(() => {
    if (department) {
      setNames(departmentsData[department] || []);
      setSuggestions([]);
      setInputValue(""); // Clear input when department changes
    }
  }, [department]);

  useEffect(() => {
    if (ticket) {
      setDepartment(ticket.assignedTicket || "");
      setInputValue(ticket.assignedTicketName || "");
    }
  }, [ticket]); // Only depend on ticket, not on ticketRef.current

  const handleDepartmentChange = (e) => {
    setDepartment(e.target.value);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    if (value.length > 0) {
      const filteredSuggestions = names.filter((name) =>
        name.toLowerCase().includes(value.toLowerCase()),
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion);
    setSuggestions([]);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const updatedTicket = {
        ...ticketRef.current,
        ticketCategory: document.getElementById("ticketCategory").value,
        ticketPriority: document.getElementById("ticketPriority").value,
        ticketStatus: document.getElementById("ticketStatus").value,
        ticketDepartment: department,
        ticketAssignedName: inputValue || ticket.ticketAssignedName,
      };

      await updateTicket(ticketRef.current.id, updatedTicket); // Function to update ticket
      onClose(); // Close the modal after successful update
      window.location.reload();
    } catch (error) {
      console.error("Error updating ticket:", error);
      // Handle error (e.g., show an error message)
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (ticketRef.current) {
      setIsLoading(true);

      try {
        await deleteTicket(ticketRef.current.id); // Function to delete ticket
        onClose(); // Close the modal after successful deletion
        window.location.reload();
      } catch (error) {
        console.error("Error deleting ticket:", error);
        // Handle error (e.g., show an error message)
      } finally {
        setIsLoading(false);
      }
    }
  };

  if (!isOpen || !ticket) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="relative bg-white rounded-lg shadow-lg w-full max-w-lg mx-auto p-8 space-y-6 transform transition-all duration-300 scale-95">
        <div className="flex justify-between items-center border-b pb-4">
          <h2 className="text-2xl font-semibold">Update Ticket</h2>
          <button
            className="text-gray-600 hover:text-gray-900"
            onClick={onClose}
          >
            ✕
          </button>
        </div>
        <form className="space-y-4" onSubmit={handleUpdate}>
          <div>
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="ticketCategory"
            >
              Category
            </label>
            <select
              id="ticketCategory"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2DB976] transition"
              defaultValue={ticket.category}
            >
              <option>HR Request Ticket</option>
              <option>Incident Ticket</option>
              <option>Trouble Ticket</option>
              <option>Change Order</option>
              <option>Change Request</option>
              <option>Job Order</option>
            </select>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                className="block text-gray-700 font-medium mb-2"
                htmlFor="ticketPriority"
              >
                Priority
              </label>
              <select
                id="ticketPriority"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2DB976] transition"
                defaultValue={ticket.priority}
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
                <option>Critical</option>
              </select>
            </div>
            <div>
              <label
                className="block text-gray-700 font-medium mb-2"
                htmlFor="ticketStatus"
              >
                Status
              </label>
              <select
                id="ticketStatus"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2DB976] transition"
                defaultValue={ticket.status}
              >
                <option>Open</option>
                <option>In Progress</option>
                <option>On-hold</option>
                <option>Canceled</option>
                <option>Closed</option>
              </select>
            </div>
          </div>
          <div className="relative">
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="department"
            >
              Department
            </label>
            <select
              id="department"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2DB976] transition mb-4"
              onChange={handleDepartmentChange}
              value={department}
            >
              <option value={ticket.assignedTicket}>
                {ticket.assignedTicket}
              </option>
              {Object.keys(departmentsData).map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>

            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              defaultValue={ticket?.assignedTicketName || inputValue} // Initial value
              onChange={handleInputChange} // Optional: handle changes if needed
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2DB976] transition"
              disabled={!department} // Disable if no department is selected
            />
            {suggestions.length > 0 && (
              <ul className="absolute w-full bg-white border border-gray-300 rounded-lg mt-1 max-h-60 overflow-auto z-10">
                {suggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="p-2 cursor-pointer hover:bg-gray-100"
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[#2DB976] text-white px-4 py-2 rounded-lg font-mona-bold hover:bg-[#239a60] transition relative"
            >
              {isLoading ? (
                <svg
                  className="w-5 h-5 text-white animate-spin"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 4V1M12 23v-3M4.22 4.22l-2.12-2.12M20.78 20.78l-2.12-2.12M1 12h3M21 12h3M4.22 19.78l-2.12 2.12M20.78 4.22l-2.12 2.12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                "Update"
              )}
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className="bg-red-600 text-white px-4 py-2 rounded-lg font-mona-bold hover:bg-red-700 transition relative"
            >
              {isLoading ? (
                <svg
                  className="w-5 h-5 text-white animate-spin"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 4V1M12 23v-3M4.22 4.22l-2.12-2.12M20.78 20.78l-2.12-2.12M1 12h3M21 12h3M4.22 19.78l-2.12 2.12M20.78 4.22l-2.12 2.12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                "Delete"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateModal;
