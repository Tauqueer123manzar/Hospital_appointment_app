import React, { useState, useEffect, useContext } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { context } from "../../main";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import Sidebar from "../../components/Sidebar";
import axios from "axios";
import DataTable from "react-data-table-component";

const Message = () => {
    const [messages, setMessages] = useState([]);
    const [filterText, setFilterText] = useState("");
    const [sidebarVisible, setSidebarVisible] = useState(true);
    const { isAuthenticated } = useContext(context);
    const adminToken = localStorage.getItem("adminToken");
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    // Track window resize
    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
            // Auto-hide sidebar on small screens
            if (window.innerWidth < 768) {
                setSidebarVisible(false);
            } else {
                setSidebarVisible(true);
            }
        };

        window.addEventListener('resize', handleResize);
        // Initial check
        handleResize();
        
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // Fetch messages from the backend
    useEffect(() => {
        const fetchMessages = async () => {
            if (!adminToken) {
                toast.error("Admin token missing! Please log in again.");
                return;
            }

            try {
                const response = await axios.get("http://localhost:8080/api/v1/message/getall", {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${adminToken}`,
                    },
                });

                if (response.data && response.data.messages) {
                    setMessages(response.data.messages);
                } else {
                    setMessages([]);
                    toast.error("Unexpected API response format!");
                }
            } catch (error) {
                console.error("Error fetching messages:", error.response);
                if (error.response?.status === 401) {
                    toast.error("Unauthorized! Please log in again.");
                    localStorage.removeItem("adminToken");
                } else {
                    toast.error(error.response?.data?.message || "Failed to fetch messages");
                }
                setMessages([]);
            }
        };

        fetchMessages();
    }, [adminToken]);

    if (!isAuthenticated) {
        return <Navigate to="/admin/login" />;
    }

    // Function to delete a message
    const handleDelete = async (id) => {
        if (!adminToken) {
            toast.error("Admin token missing! Please log in again.");
            return;
        }

        const confirmDelete = window.confirm("Are you sure you want to delete this message?");
        if (!confirmDelete) return;

        try {
            const response = await axios.delete(`http://localhost:8080/api/v1/message/delete/${id}`, {
                headers: {
                    Authorization: `Bearer ${adminToken}`,
                },
            });

            if (response.data.success) {
                toast.success("Message deleted successfully");
                setMessages(messages.filter((msg) => msg._id !== id)); // Update UI after deletion
            } else {
                toast.error("Failed to delete message");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to delete message");
        }
    };

    // Toggle sidebar visibility
    const toggleSidebar = () => {
        setSidebarVisible(!sidebarVisible);
    };

    // Filter messages based on search input
    const filteredMessages = messages.filter((msg) =>
        Object.values(msg).some((val) =>
            val?.toString().toLowerCase().includes(filterText.toLowerCase())
        )
    );

    // Define columns for DataTable - adjusting based on screen size
    const getColumns = () => {
        const baseColumns = [
            { 
                name: "Name", 
                selector: (row) => `${row.firstname} ${row.lastname}`, 
                sortable: true,
                // Make column width responsive
                minWidth: "150px",
                wrap: true
            },
            { 
                name: "Email", 
                selector: (row) => row.email, 
                sortable: true,
                wrap: true,
                // Hide email on very small screens
                omit: windowWidth < 480
            },
            { 
                name: "Phone", 
                selector: (row) => row.phonenumber, 
                sortable: true,
                // Hide phone on smaller screens
                omit: windowWidth < 640
            },
            { 
                name: "Message", 
                selector: (row) => row.message, 
                wrap: true,
                // Adjust message display
                grow: 2,
                // On small screens, limit text length and show ellipsis
                cell: row => windowWidth < 768 ? 
                    (row.message.length > 30 ? row.message.substring(0, 30) + '...' : row.message) : 
                    row.message
            },
            {
                name: "Actions",
                cell: (row) => (
                    <Button 
                        variant="danger" 
                        onClick={() => handleDelete(row._id)}
                        size={windowWidth < 768 ? "sm" : "md"}
                    >
                        Delete
                    </Button>
                ),
                // Make actions column fixed width
                width: "100px",
                center: true
            },
        ];

        return baseColumns;
    };

    const contentStyle = {
        transition: "margin 0.3s ease",
        padding: "20px",
        backgroundColor: "#f9f9f9",
        marginLeft: sidebarVisible && windowWidth >= 768 ? "240px" : "0",
        width: "100%"
    };

    return (
        <div className="d-flex flex-column flex-md-row">
            {/* Sidebar with conditional rendering */}
            {sidebarVisible && <Sidebar />}
            
            {/* Main content */}
            <div style={contentStyle} className="flex-grow-1">
                <Container fluid className="px-2 px-sm-3 py-3">
                    <Row className="mb-3 align-items-center">
                        <Col xs="auto">
                            {windowWidth < 768 && (
                                <Button 
                                    variant="secondary" 
                                    onClick={toggleSidebar}
                                    className="me-2"
                                >
                                    ☰
                                </Button>
                            )}
                        </Col>
                        <Col>
                            <h2 className="text-center m-0" style={{ fontFamily: "initial" }}>
                                Patient Messages
                            </h2>
                        </Col>
                    </Row>
                    
                    <Form.Control
                        type="text"
                        placeholder="Search messages..."
                        value={filterText}
                        onChange={(e) => setFilterText(e.target.value)}
                        className="mb-3"
                    />
                    
                    <div className="table-responsive">
                        <DataTable
                            columns={getColumns()}
                            data={filteredMessages}
                            pagination
                            paginationPerPage={windowWidth < 768 ? 5 : 10}
                            highlightOnHover
                            striped
                            responsive
                            fixedHeader
                            fixedHeaderScrollHeight="calc(100vh - 250px)"
                            noHeader
                            defaultSortFieldId={1}
                            theme="default"
                            customStyles={{
                                rows: {
                                    style: {
                                        minHeight: '60px',
                                    },
                                },
                                headCells: {
                                    style: {
                                        paddingLeft: '8px',
                                        paddingRight: '8px',
                                        fontWeight: 'bold',
                                    },
                                },
                                cells: {
                                    style: {
                                        paddingLeft: '8px',
                                        paddingRight: '8px',
                                    },
                                },
                            }}
                        />
                    </div>
                </Container>
            </div>
        </div>
    );
};

export default Message;
