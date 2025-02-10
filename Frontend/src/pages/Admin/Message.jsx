// import React, { useState, useEffect, useContext } from "react";
// import { Container, Form } from "react-bootstrap";
// import { context } from "../../main";
// import { Navigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import Sidebar from "../../components/Sidebar";
// import axios from "axios";
// import DataTable from "react-data-table-component";

// const Message = () => {
//     const [messages, setMessages] = useState([]);
//     const [filterText, setFilterText] = useState("");
//     const { isAuthenticated } = useContext(context);
//     const adminToken = localStorage.getItem("adminToken");

//     useEffect(() => {
//         const fetchMessages = async () => {
//             if (!adminToken) {
//                 toast.error("Admin token missing! Please log in again.");
//                 return;
//             }

//             try {
//                 const response = await axios.get("http://localhost:8080/api/v1/message/getall", {
//                     withCredentials: true,
//                     headers: {
//                         "Content-Type": "application/json",
//                         Authorization: `Bearer ${adminToken}`,
//                     },
//                 });

//                 if (response.data && response.data.messages) {
//                     setMessages(response.data.messages);
//                 } else {
//                     setMessages([]);
//                     toast.error("Unexpected API response format!");
//                 }
//             } catch (error) {
//                 console.error("Error fetching messages:", error.response);

//                 if (error.response?.status === 401) {
//                     toast.error("Unauthorized! Please log in again.");
//                     localStorage.removeItem("adminToken");
//                 } else {
//                     toast.error(error.response?.data?.message || "Failed to fetch messages");
//                 }

//                 setMessages([]);
//             }
//         };

//         fetchMessages();
//     }, [adminToken]);

//     if (!isAuthenticated) {
//         return <Navigate to="/admin/login" />;
//     }

//     const filteredMessages = messages.filter((msg) =>
//         Object.values(msg).some((val) =>
//             val?.toString().toLowerCase().includes(filterText.toLowerCase())
//         )
//     );

//     const columns = [
//         { name: "Name", selector: (row) => `${row.firstname} ${row.lastname}`, sortable: true },
//         { name: "Email", selector: (row) => row.email, sortable: true },
//         { name: "Phone", selector: (row) => row.phonenumber, sortable: true },
//         { name: "Message", selector: (row) => row.message, wrap: true },
//     ];

//     return (
//         <>
//             <Sidebar />
//             <Container className="my-3" style={{ marginLeft: "290px", backgroundColor: "#f9f9f9", padding: "20px" }}>
//                 <h2 className="text-center" style={{ fontFamily: "initial" }}>Messages</h2>
//                 <Form.Control
//                     type="text"
//                     placeholder="Search messages..."
//                     value={filterText}
//                     onChange={(e) => setFilterText(e.target.value)}
//                     className="mb-3"
//                 />
//                 <DataTable
//                     columns={columns}
//                     data={filteredMessages}
//                     pagination
//                     highlightOnHover
//                     striped
//                     responsive
//                 />
//             </Container>
//         </>
//     );
// };

// export default Message;

import React, { useState, useEffect, useContext } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { context } from "../../main";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import Sidebar from "../../components/Sidebar";
import axios from "axios";
import DataTable from "react-data-table-component";

const Message = () => {
    const [messages, setMessages] = useState([]);
    const [filterText, setFilterText] = useState("");
    const { isAuthenticated } = useContext(context);
    const adminToken = localStorage.getItem("adminToken");

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

    const handleDelete = async (id) => {
        if (!adminToken) {
            toast.error("Admin token missing! Please log in again.");
            return;
        }

        try {
            await axios.delete(`http://localhost:8080/api/v1/message/delete/${id}`, {
                headers: {
                    Authorization: `Bearer ${adminToken}`,
                },
            });
            toast.success("Message deleted successfully");
            setMessages(messages.filter((msg) => msg._id !== id));
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to delete message");
        }
    };

    const filteredMessages = messages.filter((msg) =>
        Object.values(msg).some((val) =>
            val?.toString().toLowerCase().includes(filterText.toLowerCase())
        )
    );

    const columns = [
        { name: "Name", selector: (row) => `${row.firstname} ${row.lastname}`, sortable: true },
        { name: "Email", selector: (row) => row.email, sortable: true },
        { name: "Phone", selector: (row) => row.phonenumber, sortable: true },
        { name: "Message", selector: (row) => row.message, wrap: true },
        { name: "Actions", cell: (row) => <Button variant="danger" onClick={() => handleDelete(row._id)}>Delete</Button> }
    ];

    return (
        <>
            <Sidebar />
            <Container className="my-3" style={{ marginLeft: "290px", backgroundColor: "#f9f9f9", padding: "20px" }}>
                <h2 className="text-center" style={{ fontFamily: "initial" }}>Messages</h2>
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

export default Message;
