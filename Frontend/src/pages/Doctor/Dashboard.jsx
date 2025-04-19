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
        const [appointmentsRes, confirmedRes] = await Promise.all([
          axios.get("http://localhost:8080/api/v1/user/doctor/appointment/all", {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("doctorToken")}`,
            },
          }),
          axios.get("http://localhost:8080/api/v1/user/doctor/appointment/confirmed", {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("doctorToken")}`,
            },
          }),
        ]);
    
        setTotalAppointments(appointmentsRes.data.data.length);
        setAppointments(appointmentsRes.data.data);
    
        if (confirmedRes.data.success) {
          setTotalConfirmedAppointments(confirmedRes.data.count || 0);
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
          className={`status-select ${row.status === "Pending"
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
              <span>Upcoming Appointment</span>
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
