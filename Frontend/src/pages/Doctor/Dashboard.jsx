// import React, { useEffect, useContext, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { context } from "../../main";
// import { FaUsers, FaCalendarAlt, FaCheck } from "react-icons/fa";
// import { GoCheckCircleFill } from "react-icons/go";
// import { AiFillCloseCircle } from "react-icons/ai";
// import axios from "axios";
// import DoctorSidebar from "../../components/DoctorSidebar";
// import { toast } from "react-toastify";
// import DataTable from "react-data-table-component";


// const Dashboard = () => {
//   const { isAuthenticated } = useContext(context);
//   const navigateTo = useNavigate();

//   const [totalUsers, setTotalUsers] = useState(0);
//   const [totalAppointments, setTotalAppointments] = useState(0);
//   const [totalDoctors, setTotalDoctors] = useState(0);
//   const [totalConfirmedAppointments, setTotalConfirmedAppointments] = useState(0);
//   const [appointments, setAppointments] = useState([]);

//   useEffect(() => {
//     if (!isAuthenticated) {
//       navigateTo("/doctor/login");
//       return;
//     }

//     const fetchData = async () => {
//       try {
//         const [usersRes, appointmentsRes, doctorsRes, confirmedRes] = await Promise.all([
//           axios.get("http://localhost:8080/api/v1/user/getallusers"),
//           axios.get("http://localhost:8080/api/v1/appointment/getall"),
//           axios.get("http://localhost:8080/api/v1/user/doctors"),
//           axios.get("http://localhost:8080/api/v1/appointment/confirmed", { withCredentials: true }),
//         ]);

//         setTotalUsers(usersRes.data.users.length);
//         setTotalAppointments(appointmentsRes.data.appointments.length);
//         setAppointments(appointmentsRes.data.appointments);
//         setTotalDoctors(doctorsRes.data.doctors.length);
//         if (confirmedRes.data.success) {
//           setTotalConfirmedAppointments(confirmedRes.data.appointments.length);
//         }
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//     const interval = setInterval(fetchData, 10000);
//     return () => clearInterval(interval);
//   }, [isAuthenticated, navigateTo]);

//   const handleUpdateStatus = async (id, status) => {
//     try {
//       const { data } = await axios.put(
//         `http://localhost:8080/api/v1/appointment/appointments/${id}/status`,
//         { status },
//         { withCredentials: true }
//       );
//       setAppointments((prev) =>
//         prev.map((appointment) =>
//           appointment._id === id ? { ...appointment, status: data.appointment.status } : appointment
//         )
//       );

//       toast.success(data.message || "Appointment status updated successfully");
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Failed to update appointment status");
//     }
//   };

//   const columns = [
//     { name: "Patient", selector: (row) => row.patientName || "N/A", sortable: true },
//     { name: "Phone", selector: (row) => row.phone || "N/A", sortable: true },
//     { name: "Date", selector: (row) => row.appointment_date || "N/A", sortable: true },
//     {
//       name: "Doctor",
//       selector: (row) => `${row.doctor?.firstName || "N/A"} ${row.doctor?.lastName || ""}`,
//       sortable: true,
//     },
//     { name: "Department", selector: (row) => row.department || "N/A", sortable: true },
//     {
//       name: "Status",
//       cell: (row) => (
//         <select
//           className={`status-select ${
//             row.status === "Pending"
//               ? "value-pending"
//               : row.status === "Accepted"
//               ? "value-accepted"
//               : "value-rejected"
//           }`}
//           value={row.status}
//           onChange={(e) => handleUpdateStatus(row._id, e.target.value)}
//         >
//           <option value="Pending">Pending</option>
//           <option value="Accepted">Accepted</option>
//           <option value="Rejected">Rejected</option>
//         </select>
//       ),
//     },
//     {
//       name: "Visited",
//       cell: (row) =>
//         row.hasVisited ? <GoCheckCircleFill className="green" /> : <AiFillCloseCircle className="red" />,
//       center: true,
//     },
//   ];

//   return (
//     <>
//       <DoctorSidebar />
//       <div className="dashboard-container">
//         <h3 className="text-center dashboard-title">Doctor Dashboard</h3>

//         <div className="stats-container">
//           <div className="stat-box">
//             <FaUsers className="stat-icon blue" />
//             <div>
//               <span>Total Users</span>
//               <h3>{totalUsers}</h3>
//             </div>
//           </div>

//           <div className="stat-box">
//             <FaCalendarAlt className="stat-icon pink" />
//             <div>
//               <span>Total Appointments</span>
//               <h3>{totalAppointments}</h3>
//             </div>
//           </div>

//           <div className="stat-box">
//             <FaCheck className="stat-icon purple" />
//             <div>
//               <span>Confirmed Appointments</span>
//               <h3>{totalConfirmedAppointments}</h3>
//             </div>
//           </div>

//           <div className="stat-box">
//             <FaUsers className="stat-icon green" />
//             <div>
//               <span>Registered Doctors</span>
//               <h3>{totalDoctors}</h3>
//             </div>
//           </div>
//         </div>

//         <div className="appointment-table">
//           <h3 className="table-title">Manage Appointments</h3>
//           <DataTable columns={columns} data={appointments} pagination responsive striped highlightOnHover />
//         </div>
//       </div>
//     </>
//   );
// };

// export default Dashboard;


import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { context } from "../../main";
import { FaUsers, FaCalendarAlt, FaCheck, FaTimes } from "react-icons/fa";
import { GoCheckCircleFill } from "react-icons/go";
import { AiFillCloseCircle } from "react-icons/ai";
import axios from "axios";
import DoctorSidebar from "../../components/DoctorSidebar";
import { toast } from "react-toastify";
import DataTable from "react-data-table-component";

const Dashboard = () => {
  const { isAuthenticated, user } = useContext(context);
  const navigateTo = useNavigate();

  const [doctorData, setDoctorData] = useState(null);
  const [totalAppointments, setTotalAppointments] = useState(0);
  const [totalConfirmedAppointments, setTotalConfirmedAppointments] = useState(0);
  const [totalPendingAppointments, setTotalPendingAppointments] = useState(0);
  const [totalRejectedAppointments, setTotalRejectedAppointments] = useState(0);
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      navigateTo("/doctor/login");
      return;
    }

    // Get doctor ID from token
    const token = localStorage.getItem("doctorToken");
    if (!token) {
      navigateTo("/doctor/login");
      return;
    }

    // Extract doctor info from token or get it from API
    const fetchDoctorData = async () => {
      setIsLoading(true);
      try {
        // Parse the JWT token to get doctor ID (if you store it in the token)
        // Or make a request to get the current doctor's ID
        const doctorId = user?._id;
        
        if (!doctorId) {
          // If we don't have the ID from the user context, try to get it from an API call
          const { data } = await axios.get("http://localhost:8080/api/v1/user/me", {
            withCredentials: true
          });
          
          if (!data.success || data.user.role !== "doctor") {
            toast.error("Please login as a doctor");
            navigateTo("/doctor/login");
            return;
          }
          
          setDoctorData(data.user);
          fetchAppointments(data.user._id);
        } else {
          fetchAppointments(doctorId);
        }
      } catch (error) {
        console.error("Error fetching doctor data:", error);
        toast.error("Failed to load doctor data");
        navigateTo("/doctor/login");
      }
    };

    const fetchAppointments = async (doctorId) => {
      try {
        const [
          totalAppts, 
          confirmedAppts, 
          pendingAppts, 
          rejectedAppts
        ] = await Promise.all([
          axios.get(`http://localhost:8080/api/v1/doctor/${doctorId}/appointments`, { withCredentials: true }),
          axios.get(`http://localhost:8080/api/v1/doctor/${doctorId}/appointments/confirmed`, { withCredentials: true }),
          axios.get(`http://localhost:8080/api/v1/doctor/${doctorId}/appointments/pending`, { withCredentials: true }),
          axios.get(`http://localhost:8080/api/v1/doctor/${doctorId}/appointments/rejected`, { withCredentials: true })
        ]);

        setTotalAppointments(totalAppts.data.count);
        setTotalConfirmedAppointments(confirmedAppts.data.count);
        setTotalPendingAppointments(pendingAppts.data.count);
        setTotalRejectedAppointments(rejectedAppts.data.count);
        setAppointments(totalAppts.data.appointments || []);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching appointment data:", error);
        toast.error("Failed to load appointment data");
        setIsLoading(false);
      }
    };

    fetchDoctorData();
    
    // Set up auto-refresh interval
    const interval = setInterval(() => {
      if (doctorData?._id) {
        fetchAppointments(doctorData._id);
      }
    }, 30000); // Refresh every 30 seconds
    
    return () => clearInterval(interval);
  }, [isAuthenticated, navigateTo, user]);

  const handleUpdateStatus = async (id, status) => {
    try {
      const { data } = await axios.put(
        `http://localhost:8080/api/v1/appointment/appointments/${id}/status`,
        { status },
        { withCredentials: true }
      );
      
      // Update the appointment in the table
      setAppointments(prev => 
        prev.map(appointment =>
          appointment._id === id 
            ? { ...appointment, status: data.appointment.status } 
            : appointment
        )
      );

      // Update the counters based on previous status and new status
      const updatedAppointment = appointments.find(appointment => appointment._id === id);
      const prevStatus = updatedAppointment.status;
      const newStatus = data.appointment.status;

      if (prevStatus !== newStatus) {
        // Decrement previous status counter
        if (prevStatus === "Accepted") {
          setTotalConfirmedAppointments(prev => prev - 1);
        } else if (prevStatus === "Pending") {
          setTotalPendingAppointments(prev => prev - 1);
        } else if (prevStatus === "Rejected") {
          setTotalRejectedAppointments(prev => prev - 1);
        }

        // Increment new status counter
        if (newStatus === "Accepted") {
          setTotalConfirmedAppointments(prev => prev + 1);
        } else if (newStatus === "Pending") {
          setTotalPendingAppointments(prev => prev + 1);
        } else if (newStatus === "Rejected") {
          setTotalRejectedAppointments(prev => prev + 1);
        }
      }

      toast.success(data.message || "Appointment status updated successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update appointment status");
    }
  };

  const columns = [
    { name: "Patient", selector: (row) => row.patientName || row.patient?.name || "N/A", sortable: true },
    { name: "Phone", selector: (row) => row.phone || row.patient?.phone || "N/A", sortable: true },
    { name: "Date", selector: (row) => row.appointment_date || "N/A", sortable: true },
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

  if (isLoading) {
    return (
      <>
        <DoctorSidebar />
        <div className="dashboard-container">
          <h3 className="text-center dashboard-title">Loading doctor dashboard...</h3>
        </div>
      </>
    );
  }

  return (
    <>
      <DoctorSidebar />
      <div className="dashboard-container">
        <h3 className="text-center dashboard-title">My Doctor Dashboard</h3>

        <div className="stats-container">
          <div className="stat-box">
            <FaCalendarAlt className="stat-icon blue" />
            <div>
              <span>Total Appointments</span>
              <h3>{totalAppointments}</h3>
            </div>
          </div>

          <div className="stat-box">
            <FaCheck className="stat-icon green" />
            <div>
              <span>Confirmed Appointments</span>
              <h3>{totalConfirmedAppointments}</h3>
            </div>
          </div>

          <div className="stat-box">
            <FaCalendarAlt className="stat-icon yellow" />
            <div>
              <span>Pending Appointments</span>
              <h3>{totalPendingAppointments}</h3>
            </div>
          </div>

          <div className="stat-box">
            <FaTimes className="stat-icon red" />
            <div>
              <span>Rejected Appointments</span>
              <h3>{totalRejectedAppointments}</h3>
            </div>
          </div>
        </div>

        <div className="appointment-table">
          <h3 className="table-title">My Appointments</h3>
          <DataTable 
            columns={columns} 
            data={appointments} 
            pagination 
            responsive 
            striped 
            highlightOnHover 
            noDataComponent="No appointments found"
            progressPending={isLoading}
          />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
