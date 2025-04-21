import React, { useState, useEffect, useContext } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { context } from "../../main";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import Sidebar from '../../components/DoctorSidebar';
import DataTable from "react-data-table-component";

const Message = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [filterText, setFilterText] = useState("");
    const { isAuthenticated } = useContext(context);
    const doctorToken = localStorage.getItem("doctorToken");

    // Assuming doctorId is stored in localStorage or passed from context
    const doctorId = localStorage.getItem("doctorId");  // Or fetch it from context if it's available

    useEffect(() => {
        const fetchFeedbacks = async () => {
            if (!doctorToken) {
                toast.error("Doctor token missing! Please log in again.");
                return;
            }

            if (!doctorId) {
                toast.error("Doctor ID is missing! Please log in again.");
                return;
            }

            try {
                const response = await axios.get(`http://localhost:8080/api/v1/feedback/doctor/feedback/${doctorId}`, {
                    headers: {
                        Authorization: `Bearer ${doctorToken}`,
                    },
                });

                if (response.data?.feedbacks) {
                    setFeedbacks(response.data.feedbacks);
                } else {
                    toast.error("Invalid response from server.");
                    setFeedbacks([]);
                }
            } catch (error) {
                toast.error(error.response?.data?.message || "Error fetching feedbacks.");
                setFeedbacks([]);
            }
        };

        fetchFeedbacks();
    }, [doctorToken, doctorId]);  // Add doctorId to the dependency array

    if (!isAuthenticated) {
        return <Navigate to="/doctor/login" />;
    }

    const handleDelete = async (id) => {
        if (!doctorToken) {
            toast.error("Doctor token missing! Please log in again.");
            return;
        }

        const confirmDelete = window.confirm("Are you sure you want to delete this feedback?");
        if (!confirmDelete) return;

        try {
            const response = await axios.delete(`http://localhost:8080/api/v1/feedback/delete/${id}`, {
                headers: {
                    Authorization: `Bearer ${doctorToken}`,
                },
            });

            if (response.data.success) {
                toast.success("Feedback deleted successfully");
                setFeedbacks(prev => prev.filter((fb) => fb._id !== id));
            } else {
                toast.error("Failed to delete feedback");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to delete feedback");
        }
    };

    const filteredFeedbacks = feedbacks.filter((msg) =>
        Object.values(msg).some((val) =>
            val?.toString().toLowerCase().includes(filterText.toLowerCase())
        )
    );

    const columns = [
        {
            name: "Name",
            selector: (row) => `${row?.firstname || ''} ${row?.lastname || ''}`,
            sortable: true,
        },
        { name: "Email", selector: (row) => row?.email || '', sortable: true },
        { name: "Phone", selector: (row) => row?.phonenumber || '', sortable: true },
        { name: "Message", selector: (row) => row?.message || '', wrap: true },
        {
            name: "Actions",
            cell: (row) =>
                row?._id ? (
                    <Button variant="danger" onClick={() => handleDelete(row._id)}>
                        Delete
                    </Button>
                ) : (
                    <span>No ID</span>
                ),
        },
    ];

    return (
        <>
            <Sidebar />
            <Container className="my-3" style={{ marginLeft: "290px", backgroundColor: "#f9f9f9", padding: "20px" }}>
                <h2 className="text-center" style={{ fontFamily: "initial" }}>Patient Feedbacks</h2>
                <Form.Control
                    type="text"
                    placeholder="Search feedbacks..."
                    value={filterText}
                    onChange={(e) => setFilterText(e.target.value)}
                    className="mb-3"
                />
                <DataTable
                    columns={columns}
                    data={filteredFeedbacks}
                    pagination
                    highlightOnHover
                    striped
                    responsive
                />
            </Container>
        </>
    );
};

export default Message;
