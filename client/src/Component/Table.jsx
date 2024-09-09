import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import UpdateModal from "./UpdateModal"; // Import the new UpdateModal component
import { fetchTickets } from '../functions/getTickets';

const TicketTable = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // For the Add Ticket modal
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false); // For the Update Ticket modal
  const [selectedTicket, setSelectedTicket] = useState(null); // To store the selected ticket
  
  console.log(isUpdateModalOpen)
  const [sortPriority, setSortPriority] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState("");
  
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadTickets = async () => {
      try {
        const data = await fetchTickets();
        console.log(data);
        setTickets(data);
      } catch (error) {
        setError('Failed to fetch tickets');
      } finally {
        setLoading(false);
      }
    };

    loadTickets();
  }, []);

  if (loading) return <p>Loading...</p>;

  // Sorting function
  const sortedTickets = [...tickets].sort((a, b) => {
    if (!sortPriority) return 0;
    const priorities = ["Low", "Medium", "High", "Critical"];
    const direction = sortPriority === "asc" ? 1 : -1;
    return (priorities.indexOf(a.priority) - priorities.indexOf(b.priority)) * direction;
  });

  // Filtering function
  const filteredTickets = sortedTickets.filter(
    (ticket) => categoryFilter === "" || ticket.category === categoryFilter
  );

  const openUpdateModal = (ticket) => {
    setSelectedTicket(ticket);
    setIsUpdateModalOpen(true);
  };
  
  const closeUpdateModal = () => {
    setSelectedTicket(null);
    setIsUpdateModalOpen(false);
  };

  return (
    <div className="flex-1 p-6">
      <div className="flex justify-between items-center mb-4">
        <p className="text-2xl font-mona-bold text-[#011F4B]">Ticket</p>
        <button
          className="bg-[#2DB976] text-white px-4 py-2 rounded font-mona-bold hover:bg-[#1d8c5f] transition-colors duration-300"
          onClick={() => setIsModalOpen(true)}
        >
          Add Ticket
        </button>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <UpdateModal isOpen={isUpdateModalOpen} onClose={closeUpdateModal} ticket={selectedTicket} name={tickets.assignedTicketName} />

      <div className="flex justify-start items-center space-x-4 mb-4 font-mona-regular">
        <button
          onClick={() =>
            setSortPriority(sortPriority === "asc" ? "desc" : "asc")
          }
          className="bg-white border border-gray-300 text-gray-800 text-xs font-mona-bold rounded-lg focus:ring-[#2DB976] focus:border-[#2DB976] px-3 py-1 shadow-sm transition duration-150 ease-in-out flex items-center space-x-2"
        >
          <span>Sort by Priority</span>
          <span>{sortPriority === "asc" ? "▲" : "▼"}</span>
        </button>

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="bg-white border border-gray-300 text-gray-800 text-xs font-mona-bold rounded-lg focus:ring-[#2DB976] focus:border-[#2DB976] px-2 py-1 shadow-sm transition duration-150 ease-in-out"
        >
          <option value="" className="text-gray-500">
            All Categories
          </option>
          <option value="HR Request Ticket">HR Request Ticket</option>
          <option value="Incident Ticket">Incident Ticket</option>
          <option value="Trouble Ticket">Trouble Ticket</option>
          <option value="Change Order">Change Order</option>
          <option value="Change Request">Change Request</option>
          <option value="Job Order">Job Order</option>
        </select>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-[#e5e5e5] text-gray-600 text-xs">
              <th className="py-3 px-6 text-left font-mona-extrabold text-xs">
                Ticket ID
              </th>
              <th className="py-3 px-6 text-left font-mona-extrabold text-xs">
                Category
              </th>
              <th className="py-3 px-6 text-left font-mona-extrabold text-xs">
                Priority
              </th>
              <th className="py-3 px-6 text-left font-mona-extrabold text-xs">
                Status
              </th>
              <th className="py-3 px-6 text-left font-mona-medium text-xs">
                Assigned Ticket
              </th>
              <th className="py-3 px-6 text-left font-mona-medium text-xs">
                Assigned Ticket Personel
              </th>
              <th className="py-3 px-6 text-left font-mona-medium text-xs">
                Date Created
              </th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {filteredTickets.map((ticket) => (
              <tr
              key={ticket.id}
              onClick={() => openUpdateModal(ticket)} // Pass the full ticket object        
                className="border-b border-gray-200 hover:bg-gray-100 font-mona-semibold"
              >
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  {ticket.id}
                </td>
                <td className="py-3 px-6 text-left font-mona-semibold text-xs">
                  {ticket.category}
                </td>
                <td className="py-3 px-6 text-left font-mona-semibold text-xs">
                  <span
                    className={`${
                      ticket.priority === "Low"
                        ? "bg-blue-500"
                        : ticket.priority === "Medium"
                          ? "bg-yellow-500"
                          : ticket.priority === "High"
                            ? "bg-orange-500"
                            : "bg-[#ff0000]"
                    } text-white font-mona-bold px-2 py-1 rounded-lg text-xs`}
                  >
                    {ticket.priority}
                  </span>
                </td>
                <td className="py-3 px-6 text-left font-mona-semibold text-xs">
                  {ticket.status}
                </td>
                <td className="py-3 px-6 text-left font-mona-semibold text-xs">
                  {ticket.assignedTicket}
                </td>
                <td className="py-3 px-6 text-left font-mona-semibold text-xs">
                  {ticket.assignedTicketName}
                </td>
                <td className="py-3 px-6 text-left font-mona-semibold text-xs">
                  {ticket.dateCreated}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TicketTable;
