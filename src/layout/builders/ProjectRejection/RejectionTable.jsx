import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import useProjectStatus from "../../../store/builders/useProjectStatus";

const RejectionTable = () => {
  const navigate = useNavigate();
  const { projects, isLoading, fetchProjects, updateProjectStatus } =
    useProjectStatus();
  const [openDropdownId, setOpenDropdownId] = useState(null);

  useEffect(() => {
    fetchProjects("rejected"); // Fetch only rejected projects
  }, [fetchProjects]);

  // Mapping for Tailwind classes
  const statusClasses = {
    active: {
      bg: "bg-green-100",
      text: "text-green-700",
      dot: "bg-green-500",
    },
    hold: {
      bg: "bg-orange-100",
      text: "text-orange-700",
      dot: "bg-orange-500",
    },
    completed: {
      bg: "bg-blue-100",
      text: "text-blue-700",
      dot: "bg-blue-500",
    },
    approved: {
      bg: "bg-purple-100",
      text: "text-purple-700",
      dot: "bg-purple-500",
    },
    rejected: {
      bg: "bg-red-100",
      text: "text-red-700",
      dot: "bg-red-500",
    },
  };

  const handleStatusChange = async (projectId, newStatus) => {
    let holdComment = null;
    if (newStatus === "hold") {
      holdComment = prompt("Please enter a hold comment:");
      if (!holdComment) return; // Cancel if no comment provided
    }

    await updateProjectStatus(projectId, newStatus, holdComment);
    // Fetch only rejected projects again after status update
    fetchProjects("rejected");
    setOpenDropdownId(null); // Close dropdown after status change
  };

  const handlenav = (path) => {
    navigate(path);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white shadow rounded-lg p-6">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Rejected Projects</h2>
        <input
          type="text"
          placeholder="Search..."
          className="border rounded-lg px-4 py-2 w-1/3 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Table Section */}
      {projects && projects.length > 0 ? (
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="text-left text-sm font-medium text-gray-500 border-b">
              <th className="py-2 px-4">Customer Name</th>
              <th className="py-2 px-4">Customer ID</th>
              <th className="py-2 px-4">Started</th>
              <th className="py-2 px-4">Location</th>
              <th className="py-2 px-4">Status</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr
                key={project.id}
                className="text-sm text-gray-700 border-b hover:bg-gray-50"
                onClick={() => handlenav("/builder/profilecard")}
              >
                <td className="py-3 px-4">{project.customer_name}</td>
                <td className="py-3 px-4">{project.customer_ducktail_id}</td>
                <td className="py-3 px-4">
                  {new Date(project.starting_date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </td>
                <td className="py-3 px-4">{project.project_location}</td>
                <td className="py-3 px-4 relative">
                  {project.status && statusClasses[project.status] && (
                    <div className="relative">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenDropdownId(
                            openDropdownId === project.id ? null : project.id
                          );
                        }}
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                          statusClasses[project.status].bg
                        } ${statusClasses[project.status].text} cursor-pointer`}
                      >
                        <span
                          className={`h-2 w-2 rounded-full ${
                            statusClasses[project.status].dot
                          } mr-2`}
                        ></span>
                        {project.status.charAt(0).toUpperCase() +
                          project.status.slice(1)}
                      </button>

                      {openDropdownId === project.id && (
                        <div className="absolute z-10 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                          <div className="py-1" role="menu">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleStatusChange(project.id, "active");
                              }}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                            >
                              Live
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleStatusChange(project.id, "completed");
                              }}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                            >
                              Completed
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleStatusChange(project.id, "approved");
                              }}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                            >
                              Pending
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleStatusChange(project.id, "rejected");
                              }}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                            >
                              Rejection
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleStatusChange(project.id, "hold");
                              }}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                            >
                              Hold
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </td>
                <td className="py-3 px-4 flex space-x-2">
                  <button
                    onClick={() => handlenav("/builder/chat")}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    💬
                  </button>
                  <button
                    onClick={() => handlenav("/builder/payment")}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    📁
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="text-center py-8 text-gray-500">
          No rejected projects available
        </div>
      )}
    </div>
  );
};

export default RejectionTable;
