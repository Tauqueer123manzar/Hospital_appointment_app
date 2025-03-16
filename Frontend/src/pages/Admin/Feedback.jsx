import React, { useState, useEffect, useContext } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { context } from '../../main';
import { Navigate } from "react-router-dom";
import Sidebar from '../../components/Sidebar';
import DataTable from "react-data-table-component";
import axios from "axios";
import { toast } from "react-toastify";

const Feedback = () => {
  const [data, setData] = useState([]);
  const [filterText, setFilterText] = useState("");
  const { isAuthenticated } = useContext(context);
  const adminToken = localStorage.getItem("adminToken");

  // Fetch feedback messages from the backend
  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/v1/feedback/getall", {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${adminToken}`,
          },
        });
    
        if (response.data && response.data.feedbacks) {
          setData(response.data.feedbacks);
        } else {
          setData([]);
          toast.error("Unexpected API response format!");
        }
      } catch (error) {
        console.error("Error fetching feedbacks:", error.response);
        toast.error(error.response?.data?.message || "Failed to fetch feedbacks");
        setData([]);
      }
    };
    fetchFeedback();
  }, [adminToken]);

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" />;
  }

  // Filter messages based on search input
  const filteredMessages = data.filter((msg) =>
    Object.values(msg).some((val) =>
      val?.toString().toLowerCase().includes(filterText.toLowerCase())
    )
  );

  // Function to delete a message
  const handleDelete = async (id) => {
    if (!adminToken) {
      toast.error("Admin token missing! Please log in again.");
      return;
    }

    const confirmDelete = window.confirm("Are you sure you want to delete this message?");
    if (!confirmDelete) return;

    try {
      const response = await axios.delete(`http://localhost:8080/api/v1/feedback/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      });

      if (response.data.success) {
        toast.success("Message deleted successfully");
        setData(data.filter((msg) => msg._id !== id)); // Update UI after deletion
      } else {
        toast.error("Failed to delete message");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete message");
    }
  };

  // Define columns for DataTable
  const columns = [
  { name: "Patient", selector: (row) => row.patientName || "N/A", sortable: true },
  { name: "Doctor", selector: (row) => `${row.firstname} ${row.lastname}`|| "N/A", sortable: true },
  { name: "Feedback", selector: (row) => row.feedback || "N/A", sortable: true },
  { name: "Rating", selector: (row) => row.rating || "No Rating", wrap: true },
  {
    name: "Actions",
    cell: (row) => (
      <Button variant="danger" onClick={() => handleDelete(row._id)}>
        Delete
      </Button>
    ),
  },
];


  return (
    <>
      <Sidebar />
      <Container className="my-3" style={{ marginLeft: "290px", backgroundColor: "#f9f9f9", padding: "20px" }}>
        <h2 className="text-center" style={{ fontFamily: "initial" }}>Patient Feedback For the Doctor</h2>
        <Form.Control
          type="text"
          placeholder="Search messages..."
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          className="mb-3"
        />
        <DataTable
          columns={columns}
          data={filteredMessages}
          pagination
          highlightOnHover
          striped
          responsive
        />
      </Container>
    </>
  );
};

export default Feedback;
