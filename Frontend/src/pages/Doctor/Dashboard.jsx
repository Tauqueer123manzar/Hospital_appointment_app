// import React, { useEffect, useContext, useState, useCallback } from "react";
// import { useNavigate } from "react-router-dom";
// import { context } from "../../main";
// import {
//   GoCheckCircleFill,
//   GoCalendar
// } from "react-icons/go";
// import { AiFillCloseCircle } from "react-icons/ai";
// import DataTable from "react-data-table-component";
// import axios from "axios";
// import { toast } from "react-toastify";
// import {
//   Button,
//   Card,
//   Row,
//   Col,
//   Spinner
// } from "react-bootstrap";
// import DoctorSidebar from "../../components/DoctorSidebar";

// const DoctorDashboard = () => {
//   const { isAuthenticated, user } = useContext(context);
//   const navigate = useNavigate();
//   const [stats, setStats] = useState({
//     totalAppointments: 0,
//     confirmedAppointments: 0,
//     pendingAppointments: 0,
//     rejectedAppointments: 0
//   });
//   const [appointments, setAppointments] = useState([]);
//   const [filter, setFilter] = useState("all");
//   const [loading, setLoading] = useState(true);

//   // Redirect if not authenticated
//   useEffect(() => {
//     if (!isAuthenticated) {
//       navigate("/doctor/login");
//     }
//   }, [isAuthenticated, navigate]);

//   // Fetch dashboard data
//   const fetchDashboardData = useCallback(async () => {
//     try {
//       setLoading(true);
//       const doctorId = user?._id;

//       const endpoints = [
//         `appointment/doctor/${doctorId}/appointments`,
//         `appointment/doctor/${doctorId}/appointments/confirmed`,
//         `appointment/doctor/${doctorId}/appointments/pending`,
//         `appointment/doctor/${doctorId}/appointments/rejected`
//       ];

//       const responses = await Promise.all(
//         endpoints.map(endpoint => 
//           axios.get(`http://localhost:8080/api/v1/${endpoint}`, { 
//             withCredentials: true 
//           })
//         )
//       );

//       setStats({
//         totalAppointments: responses[0].data.count || 0,
//         confirmedAppointments: responses[1].data.count || 0,
//         pendingAppointments: responses[2].data.count || 0,
//         rejectedAppointments: responses[3].data.count || 0
//       });

//       setAppointments(responses[0].data.appointments || []);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       toast.error(error.response?.data?.message || "Failed to load dashboard data");
//     } finally {
//       setLoading(false);
//     }
//   }, [user]);

//   // Initial fetch and setup refresh interval
//   useEffect(() => {
//     if (user && isAuthenticated) {
//       fetchDashboardData();
//       const interval = setInterval(fetchDashboardData, 30000);
//       return () => clearInterval(interval);
//     }
//   }, [user, isAuthenticated, fetchDashboardData]);

//   // Handle appointment status update
//   const handleUpdateStatus = async (id, status) => {
//     try {
//       const { data } = await axios.put(
//         `http://localhost:8080/api/v1/appointment/appointments/${id}/status`,
//         { status },
//         { withCredentials: true }
//       );
      
//       setAppointments(prev =>
//         prev.map(app => (app._id === id ? { ...app, status } : app))
//       );
      
//       toast.success(data.message || "Status updated successfully");
//       fetchDashboardData();
//     } catch (error) {
//       console.error("Update status error:", error);
//       toast.error(error.response?.data?.message || "Failed to update status");
//     }
//   };

//   // Filter appointments based on status
//   const filteredAppointments = appointments.filter(app => {
//     switch (filter) {
//       case "confirmed": return app.status === "Accepted";
//       case "pending": return app.status === "Pending";
//       case "rejected": return app.status === "Rejected";
//       case "completed": return app.hasVisited;
//       default: return true;
//     }
//   });

//   // DataTable columns configuration
//   const columns = [
//     {
//       name: "Patient",
//       selector: row => row.patient?.name || "N/A",
//       sortable: true,
//       cell: row => <span className="fw-semibold">{row.patient?.name || "N/A"}</span>
//     },
//     {
//       name: "Phone",
//       selector: row => row.patient?.phone || "N/A"
//     },
//     {
//       name: "Date & Time",
//       selector: row => row.appointment_date || "N/A",
//       sortable: true,
//       cell: row => (
//         <span className="text-primary">
//           {row.appointment_date ? new Date(row.appointment_date).toLocaleString() : "N/A"}
//         </span>
//       )
//     },
//     {
//       name: "Department",
//       selector: row => row.department || "N/A",
//       cell: row => <span className="badge bg-secondary">{row.department}</span>
//     },
//     {
//       name: "Status",
//       cell: row =>
//         row.hasVisited ? (
//           <span className="badge bg-success">Completed</span>
//         ) : (
//           <select
//             className={`form-select form-select-sm status-select ${row.status.toLowerCase()}`}
//             value={row.status}
//             onChange={e => handleUpdateStatus(row._id, e.target.value)}
//             disabled={row.hasVisited}
//           >
//             <option value="Pending">Pending</option>
//             <option value="Accepted">Accepted</option>
//             <option value="Rejected">Rejected</option>
//           </select>
//         )
//     },
//     {
//       name: "Visited",
//       cell: row =>
//         row.hasVisited ? (
//           <GoCheckCircleFill className="text-success fs-4" />
//         ) : (
//           <AiFillCloseCircle className="text-danger fs-4" />
//         ),
//       center: true
//     }
//   ];

//   return (
//     <div className="d-flex" style={{ minHeight: "100vh" }}>
//       {/* Sidebar */}
//       <DoctorSidebar />

//       {/* Main Content */}
//       <div className="flex-grow-1" style={{ marginLeft: "250px", padding: "20px" }}>
//         {/* Stats Cards */}
//         <Row className="g-4 mb-4">
//           <Col xl={3} md={6}>
//             <Card className="h-100 shadow-sm">
//               <Card.Body className="text-center">
//                 <Card.Title>Total Appointments</Card.Title>
//                 <h2 className="text-primary">{stats.totalAppointments}</h2>
//               </Card.Body>
//             </Card>
//           </Col>
//           <Col xl={3} md={6}>
//             <Card className="h-100 shadow-sm">
//               <Card.Body className="text-center">
//                 <Card.Title>Pending</Card.Title>
//                 <h2 className="text-warning">{stats.pendingAppointments}</h2>
//               </Card.Body>
//             </Card>
//           </Col>
//           <Col xl={3} md={6}>
//             <Card className="h-100 shadow-sm">
//               <Card.Body className="text-center">
//                 <Card.Title>Confirmed</Card.Title>
//                 <h2 className="text-success">{stats.confirmedAppointments}</h2>
//               </Card.Body>
//             </Card>
//           </Col>
//           <Col xl={3} md={6}>
//             <Card className="h-100 shadow-sm">
//               <Card.Body className="text-center">
//                 <Card.Title>Rejected</Card.Title>
//                 <h2 className="text-danger">{stats.rejectedAppointments}</h2>
//               </Card.Body>
//             </Card>
//           </Col>
//         </Row>

//         {/* Appointments Table */}
//         <Card className="shadow">
//           <Card.Header className="bg-white">
//             <div className="d-flex justify-content-between align-items-center">
//               <h5 className="mb-0">Appointments Management</h5>
//               <div>
//                 {["all", "pending", "confirmed", "rejected", "completed"].map(item => (
//                   <Button
//                     key={item}
//                     variant={filter === item ? "primary" : "outline-primary"}
//                     size="sm"
//                     className="ms-2"
//                     onClick={() => setFilter(item)}
//                   >
//                     {item.charAt(0).toUpperCase() + item.slice(1)}
//                   </Button>
//                 ))}
//               </div>
//             </div>
//           </Card.Header>
//           <Card.Body>
//             {loading ? (
//               <div className="text-center py-5">
//                 <Spinner animation="border" variant="primary" />
//                 <p className="mt-2">Loading appointments...</p>
//               </div>
//             ) : (
//               <DataTable
//                 columns={columns}
//                 data={filteredAppointments}
//                 pagination
//                 responsive
//                 striped
//                 highlightOnHover
//                 noDataComponent={<div className="py-4">No appointments found</div>}
//               />
//             )}
//           </Card.Body>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default DoctorDashboard;

import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { context } from "../../main";
import { FaUsers, FaCalendarAlt, FaCheck } from "react-icons/fa";
import { GoCheckCircleFill } from "react-icons/go";
import { AiFillCloseCircle } from "react-icons/ai";
import axios from "axios";
import DoctorSidebar from "../../components/DoctorSidebar";
import { toast } from "react-toastify";
import DataTable from "react-data-table-component";


const Dashboard = () => {
  const { isAuthenticated } = useContext(context);
  const navigateTo = useNavigate();

  const [totalUsers, setTotalUsers] = useState(0);
  const [totalAppointments, setTotalAppointments] = useState(0);
  const [totalDoctors, setTotalDoctors] = useState(0);
  const [totalConfirmedAppointments, setTotalConfirmedAppointments] = useState(0);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigateTo("/doctor/login");
      return;
    }

    const fetchData = async () => {
      try {
        const [usersRes, appointmentsRes, doctorsRes, confirmedRes] = await Promise.all([
          axios.get("http://localhost:8080/api/v1/user/getallusers"),
          axios.get("http://localhost:8080/api/v1/appointment/getall"),
          axios.get("http://localhost:8080/api/v1/user/doctors"),
          axios.get("http://localhost:8080/api/v1/appointment/confirmed", { withCredentials: true }),
        ]);

        setTotalUsers(usersRes.data.users.length);
        setTotalAppointments(appointmentsRes.data.appointments.length);
        setAppointments(appointmentsRes.data.appointments);
        setTotalDoctors(doctorsRes.data.doctors.length);
        if (confirmedRes.data.success) {
          setTotalConfirmedAppointments(confirmedRes.data.appointments.length);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, [isAuthenticated, navigateTo]);

  const handleUpdateStatus = async (id, status) => {
    try {
      const { data } = await axios.put(
        `http://localhost:8080/api/v1/appointment/appointments/${id}/status`,
        { status },
        { withCredentials: true }
      );
      setAppointments((prev) =>
        prev.map((appointment) =>
          appointment._id === id ? { ...appointment, status: data.appointment.status } : appointment
        )
      );

      toast.success(data.message || "Appointment status updated successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update appointment status");
    }
  };

  const columns = [
    { name: "Patient", selector: (row) => row.patientName || "N/A", sortable: true },
    { name: "Phone", selector: (row) => row.phone || "N/A", sortable: true },
    { name: "Date", selector: (row) => row.appointment_date || "N/A", sortable: true },
    {
      name: "Doctor",
      selector: (row) => `${row.doctor?.firstName || "N/A"} ${row.doctor?.lastName || ""}`,
      sortable: true,
    },
    { name: "Department", selector: (row) => row.department || "N/A", sortable: true },
    {
      name: "Status",
      cell: (row) => (
        <select
          className={`status-select ${
            row.status === "Pending"
              ? "value-pending"
              : row.status === "Accepted"
              ? "value-accepted"
              : "value-rejected"
          }`}
          value={row.status}
          onChange={(e) => handleUpdateStatus(row._id, e.target.value)}
        >
          <option value="Pending">Pending</option>
          <option value="Accepted">Accepted</option>
          <option value="Rejected">Rejected</option>
        </select>
      ),
    },
    {
      name: "Visited",
      cell: (row) =>
        row.hasVisited ? <GoCheckCircleFill className="green" /> : <AiFillCloseCircle className="red" />,
      center: true,
    },
  ];

  return (
    <>
      <DoctorSidebar />
      <div className="dashboard-container">
        <h3 className="text-center dashboard-title">Doctor Dashboard</h3>

        <div className="stats-container">
          <div className="stat-box">
            <FaUsers className="stat-icon blue" />
            <div>
              <span>Total Users</span>
              <h3>{totalUsers}</h3>
            </div>
          </div>

          <div className="stat-box">
            <FaCalendarAlt className="stat-icon pink" />
            <div>
              <span>Total Appointments</span>
              <h3>{totalAppointments}</h3>
            </div>
          </div>

          <div className="stat-box">
            <FaCheck className="stat-icon purple" />
            <div>
              <span>Confirmed Appointments</span>
              <h3>{totalConfirmedAppointments}</h3>
            </div>
          </div>

          <div className="stat-box">
            <FaUsers className="stat-icon green" />
            <div>
              <span>Registered Doctors</span>
              <h3>{totalDoctors}</h3>
            </div>
          </div>
        </div>

        <div className="appointment-table">
          <h3 className="table-title">Manage Appointments</h3>
          <DataTable columns={columns} data={appointments} pagination responsive striped highlightOnHover />
        </div>
      </div>
    </>
  );
};

export default Dashboard;

