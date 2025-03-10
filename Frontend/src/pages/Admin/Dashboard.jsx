import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { context } from "../../main";
import { FaUsers, FaCalendarAlt, FaCheck } from "react-icons/fa";
import { GoCheckCircleFill } from "react-icons/go";
import { AiFillCloseCircle } from "react-icons/ai";
import axios from "axios";
import Sidebar from "../../components/Sidebar";
import "../../App.css";
import { toast } from "react-toastify";

const Dashboard = () => {
  const { isAuthenticated } = useContext(context);
  const navigateTo = useNavigate();

  const [totalUsers, setTotalUsers] = useState(0);
  const [totalAppointments, setTotalAppointments] = useState(0);
  const [totalDoctors, setTotalDoctors] = useState(0);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigateTo("/admin/login");
      return;
    }

    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/v1/user/getallusers");
        setTotalUsers(res.data.users.length);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    const fetchAppointments = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/v1/appointment/getall");
        setTotalAppointments(res.data.appointments.length);
        setAppointments(res.data.appointments);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    const fetchDoctors = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/v1/user/doctors");
        setTotalDoctors(res.data.doctors.length);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    fetchUsers();
    fetchAppointments();
    fetchDoctors();

    const interval = setInterval(() => {
      fetchUsers();
      fetchAppointments();
      fetchDoctors();
    }, 10000);

    return () => clearInterval(interval);
  }, [isAuthenticated, navigateTo]);

  const handleUpdateStatus = async (id, status) => {
    try {
      const { data } = await axios.put(
        `http://localhost:8080/api/v1/appointment/${id}`,
        { status },
        { withCredentials: true }
      );

      setAppointments((prev) =>
        prev.map((appointment) =>
          appointment._id === id ? { ...appointment, status } : appointment
        )
      );

      toast.success("Appointment status updated successfully");
    } catch (error) {
      toast.error("Failed to update appointment status");
    }
  };

  return (
    <>
      <Sidebar />
      <div
        style={{
          backgroundColor: "rgb(45, 193, 226)",
          width: "100%",
          height: "100vh",
          overflowY: "scroll",
        }}
      >
        <h3 className="text-center mt-2 font-weight-bold" style={{ marginLeft: "280px", color: "white" }}>
          Admin Dashboard
        </h3>

        <div className="values">
          <div className="value mt-3">
            <div className="val-box">
              <i style={{ fontSize: "35px", fontWeight: "700", marginLeft: "20px" }}>
                <FaUsers style={{ color: "blue" }} />
              </i>
              <div>
                <span>Total Users</span>
                <h3>{totalUsers}</h3>
              </div>
            </div>

            <div className="val-box">
              <i style={{ fontSize: "35px", fontWeight: "700", marginLeft: "20px" }}>
                <FaCalendarAlt color="pink" />
              </i>
              <div>
                <span>Total Appointments</span>
                <h3>{totalAppointments}</h3>
              </div>
            </div>

            <div className="val-box">
              <i style={{ fontSize: "35px", fontWeight: "700", marginLeft: "20px" }}>
                <FaCheck color="purple" />
              </i>
              <div>
                <span>Confirm Booking</span>
                <h3>4,000</h3>
              </div>
            </div>

            <div className="val-box">
              <i style={{ fontSize: "35px", fontWeight: "700", marginLeft: "20px" }}>
                <FaUsers />
              </i>
              <div>
                <span>Registered Doctors</span>
                <h3>{totalDoctors}</h3>
              </div>
            </div>
          </div>
        </div>

        <div className="banner mt-3" style={{ marginLeft: "270px",marginRight:"20px"}}>
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
                    <td>{appointment.appointment_date|| "N/A"}</td>
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
                        <option value="Pending" className="value-pending">
                          Pending
                        </option>
                        <option value="Accepted" className="value-accepted">
                          Accepted
                        </option>
                        <option value="Rejected" className="value-rejected">
                          Rejected
                        </option>
                      </select>
                    </td>
                    <td>
                      {appointment.hasVisited ? (
                        <GoCheckCircleFill className="green" />
                      ) : (
                        <AiFillCloseCircle className="red" />
                      )}
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

