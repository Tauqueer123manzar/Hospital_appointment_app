import React, { useEffect, useContext, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { context } from "../../main";
import {
  GoCheckCircleFill,
  GoCalendar
} from "react-icons/go";
import { AiFillCloseCircle } from "react-icons/ai";
import DataTable from "react-data-table-component";
import axios from "axios";
import { toast } from "react-toastify";
import {
  Button,
  Card,
  Row,
  Col
} from "react-bootstrap";
import DoctorSidebar from "../../components/DoctorSidebar";

const DoctorDashboard = () => {
  const { isAuthenticated, user } = useContext(context);
  const navigateTo = useNavigate();
  const [stats, setStats] = useState({
    totalAppointments: 0,
    confirmedAppointments: 0,
    pendingAppointments: 0,
    completedAppointments: 0
  });
  const [appointments, setAppointments] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  // If the user is not authenticated, redirect them to login
  useEffect(() => {
    if (!isAuthenticated) {
      navigateTo("/doctor/login");
      return;
    }
  }, [isAuthenticated]);

  // Fetch doctor-related data for the dashboard
  const fetchDashboardData = useCallback(async () => {
    try {
      setLoading(true);
      const doctorId = user?._id;
  
      const [allRes, confirmedRes, pendingRes, rejectedRes] = await Promise.all([
        axios.get(`http://localhost:8080/api/v1/appointment/doctor/${doctorId}/appointments`, { withCredentials: true }),
        axios.get(`http://localhost:8080/api/v1/appointment/doctor/${doctorId}/appointments/confirmed`, { withCredentials: true }),
        axios.get(`http://localhost:8080/api/v1/appointment/doctor/${doctorId}/appointments/pending`, { withCredentials: true }),
        axios.get(`http://localhost:8080/api/v1/appointment/doctor/${doctorId}/appointments/rejected`, { withCredentials: true })
      ]);
  
      setStats({
        totalAppointments: allRes.data.count || 0,
        confirmedAppointments: confirmedRes.data.count || 0,
        pendingAppointments: pendingRes.data.count || 0,
        rejectedAppointments: rejectedRes.data.count || 0
      });
  
      setAppointments(allRes.data.appointments || []);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  }, [user]);

  // Fetch data initially and set up periodic refresh every 30 seconds
  useEffect(() => {
    fetchDashboardData();
    const interval = setInterval(fetchDashboardData, 30000); // 30 seconds
    return () => clearInterval(interval);
  }, [fetchDashboardData]);

  // Handle status update for an appointment
  const handleUpdateStatus = async (id, status) => {
    try {
      setAppointments(prev =>
        prev.map(app => (app._id === id ? { ...app, status } : app))
      );

      // Update appointment status
      const { data } = await axios.put(
        `http://localhost:8080/api/v1/appointment/appointments/${id}/status`,
        { status },
        { withCredentials: true }
      );

      toast.success(data.message || "Status updated successfully");
      fetchDashboardData(); // Refresh the data after updating
    } catch (error) {
      console.error("Update status error:", error);
      toast.error(error.response?.data?.message || "Failed to update status");
    }
  };

  // Filter appointments based on status
  const filteredAppointments = appointments.filter(app => {
    if (filter === "all") return true;
    if (filter === "confirmed") return app.status === "Accepted";
    if (filter === "pending") return app.status === "Pending";
    if (filter === "completed") return app.hasVisited;
    return true;
  });

  // Columns for DataTable
  const columns = [
    {
      name: "Patient",
      selector: row => row.patientName || "N/A",
      sortable: true,
      cell: row => <span className="fw-semibold">{row.patientName || "N/A"}</span>
    },
    {
      name: "Phone",
      selector: row => row.phone || "N/A"
    },
    {
      name: "Date & Time",
      selector: row => row.appointment_date || "N/A",
      sortable: true,
      cell: row => (
        <span className="text-primary">
          {new Date(row.appointment_date).toLocaleString()}
        </span>
      )
    },
    {
      name: "Department",
      selector: row => row.department || "N/A",
      cell: row => <span className="badge bg-secondary">{row.department}</span>
    },
    {
      name: "Status",
      cell: row =>
        row.hasVisited ? (
          <span className="badge bg-success">Completed</span>
        ) : (
          <select
            className={`form-select form-select-sm status-select ${row.status.toLowerCase()}`}
            value={row.status}
            onChange={e => handleUpdateStatus(row._id, e.target.value)}
            disabled={row.hasVisited}
          >
            <option value="Pending">Pending</option>
            <option value="Accepted">Accepted</option>
            <option value="Rejected">Rejected</option>
          </select>
        )
    },
    {
      name: "Visited",
      cell: row =>
        row.hasVisited ? (
          <GoCheckCircleFill className="text-success fs-4" />
        ) : (
          <AiFillCloseCircle className="text-danger fs-4" />
        ),
      center: true
    }
  ];

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <div
        style={{
          width: "250px",
          background: "#343a40",
          color: "#fff",
          minHeight: "100vh",
          position: "fixed",
          top: 0,
          left: 0
        }}
      >
        <DoctorSidebar />
      </div>

      {/* Main Content */}
      <div style={{ marginLeft: "250px", padding: "20px", width: "100%" }}>
        <Row>
          <Col xl={3} md={6}>
            <Card className="mb-4">
              <Card.Body>
                <Card.Title>Total Appointments</Card.Title>
                <h3>{stats.totalAppointments}</h3>
              </Card.Body>
            </Card>
          </Col>
          <Col xl={3} md={6}>
            <Card className="mb-4">
              <Card.Body>
                <Card.Title>Pending Appointments</Card.Title>
                <h3>{stats.pendingAppointments}</h3>
              </Card.Body>
            </Card>
          </Col>
          <Col xl={3} md={6}>
            <Card className="mb-4">
              <Card.Body>
                <Card.Title>Confirmed Appointments</Card.Title>
                <h3>{stats.confirmedAppointments}</h3>
              </Card.Body>
            </Card>
          </Col>
          <Col xl={3} md={6}>
            <Card className="mb-4">
              <Card.Body>
                <Card.Title>Rejected Appointments</Card.Title>
                <h3>{stats.completedAppointments}</h3>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Card>
          <Card.Header>
            <div className="d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Appointments Management</h5>
              <div>
                {["all", "pending", "confirmed", "completed"].map(item => (
                  <Button
                    key={item}
                    variant={filter === item ? "primary" : "outline-primary"}
                    size="sm"
                    className="me-2"
                    onClick={() => setFilter(item)}
                  >
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </Button>
                ))}
              </div>
            </div>
          </Card.Header>
          <Card.Body>
            <DataTable
              columns={columns}
              data={filteredAppointments}
              progressPending={loading}
              pagination
              responsive
              striped
              highlightOnHover
            />
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default DoctorDashboard;
