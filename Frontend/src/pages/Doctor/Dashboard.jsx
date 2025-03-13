import React, { useEffect, useContext, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { context } from "../../main";
import { FaUsers, FaCalendarAlt, FaCheck } from "react-icons/fa";
import { GoCheckCircleFill } from "react-icons/go";
import { AiFillCloseCircle } from "react-icons/ai";
import axios from "axios";
import Sidebar from "../../components/DoctorSidebar";
import "../../App.css";
import '../../sidebar.css';
import { toast } from "react-toastify";

const Dashboard = () => {
  const { isAuthenticated } = useContext(context);
  const navigateTo = useNavigate();

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalAppointments: 0,
    totalConfirmedAppointments: 0,
  });

  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigateTo("/doctor/login");
      return;
    }
  }, [isAuthenticated]);

  const fetchDashboardData = useCallback(async () => {
    try {
      const [usersRes, appointmentsRes, confirmedRes] = await Promise.all([
        axios.get("http://localhost:8080/api/v1/user/getallusers"),
        axios.get("http://localhost:8080/api/v1/appointment/getall"),
        axios.get("http://localhost:8080/api/v1/appointment/confirmed", { withCredentials: true }),
      ]);

      setStats({
        totalUsers: usersRes.data.users.length,
        totalAppointments: appointmentsRes.data.appointments.length,
        totalConfirmedAppointments: confirmedRes.data.appointments.length,
      });

      setAppointments(appointmentsRes.data.appointments);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

  useEffect(() => {
    fetchDashboardData();
    const interval = setInterval(fetchDashboardData, 10000);
    return () => clearInterval(interval);
  }, [fetchDashboardData]);

  const handleUpdateStatus = async (id, status) => {
    try {
      setAppointments((prev) =>
        prev.map((appointment) =>
          appointment._id === id ? { ...appointment, status } : appointment
        )
      );

      const { data } = await axios.put(
        `http://localhost:8080/api/v1/appointment/appointments/${id}/status`,
        { status },
        { withCredentials: true }
      );

      toast.success(data.message || "Appointment status updated successfully");
    } catch (error) {
      console.error("Update status error:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Failed to update appointment status");
    }
  };

  return (
    <>
      <Sidebar />
      <div className="dashboard-container">
        <h3 className="text-center mt-2 font-weight-bold">Doctor Dashboard</h3>

        <div className="values">
          {[
            { icon: <FaUsers style={{ color: "blue" }} />, label: "Total Users", count: stats.totalUsers },
            { icon: <FaCalendarAlt color="pink" />, label: "Total Appointments", count: stats.totalAppointments },
            { icon: <FaCheck color="purple" />, label: "Confirm Booking", count: stats.totalConfirmedAppointments },
          ].map((item, index) => (
            <div className="val-box mt-3" key={index}>
              <i style={{ fontSize: "35px", fontWeight: "700", marginLeft: "20px" }}>{item.icon}</i>
              <div>
                <span>{item.label}</span>
                <h3>{item.count}</h3>
              </div>
            </div>
          ))}
        </div>

        <div className="banner mt-3">
          <h3 className="font-weight-bold text-white">Manage Appointments</h3>
          <table>
            <thead>
              <tr>
                <th>Patient</th>
                <th>Phone</th>
                <th>Date</th>
                <th>Doctor</th>
                <th>Department</th>
                <th>Status</th>
                <th>Visited</th>
              </tr>
            </thead>
            <tbody>
              {appointments.length > 0 ? (
                appointments.map((appointment) => (
                  <tr key={appointment._id}>
                    <td>{appointment.patientName || "N/A"}</td>
                    <td>{appointment.phone || "N/A"}</td>
                    <td>{appointment.appointment_date || "N/A"}</td>
                    <td>{`${appointment.doctor?.firstName || "N/A"} ${appointment.doctor?.lastName || ""}`}</td>
                    <td>{appointment.department || "N/A"}</td>
                    <td>
                      <select
                        className={
                          appointment.status === "Pending"
                            ? "value-pending"
                            : appointment.status === "Accepted"
                            ? "value-accepted"
                            : "value-rejected"
                        }
                        value={appointment.status}
                        onChange={(e) => handleUpdateStatus(appointment._id, e.target.value)}
                      >
                        <option value="Pending" className="value-pending">Pending</option>
                        <option value="Accepted" className="value-accepted">Accepted</option>
                        <option value="Rejected" className="value-rejected">Rejected</option>
                      </select>
                    </td>
                    <td>
                      {appointment.hasVisited ? <GoCheckCircleFill className="green" /> : <AiFillCloseCircle className="red" />}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center">No Appointments Found!</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
