import React, { useEffect, useContext, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { context } from "../../main";
import { 
  FaUsers, 
  FaCalendarAlt, 
  FaCheck, 
  FaClock,
  FaUserMd,
  FaHistory
} from "react-icons/fa";
import { 
  GoCheckCircleFill,
  GoCalendar
} from "react-icons/go";
import { AiFillCloseCircle } from "react-icons/ai";
import DataTable from 'react-data-table-component';
import axios from "axios";
import Sidebar from "../../components/DoctorSidebar";
import "../../App.css";
import { toast } from "react-toastify";

const Dashboard = () => {
  const { isAuthenticated, user } = useContext(context);
  const navigateTo = useNavigate();

  const [stats, setStats] = useState({
    totalAppointments: 0,
    confirmedAppointments: 0,
    pendingAppointments: 0,
    completedAppointments: 0
  });

  const [appointments, setAppointments] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      navigateTo("/doctor/login");
      return;
    }
  }, [isAuthenticated]);

  const fetchDashboardData = useCallback(async () => {
    try {
      setLoading(true);
      const [appointmentsRes, confirmedRes, completedRes] = await Promise.all([
        axios.get("http://localhost:8080/api/v1/appointment/doctor-appointments", { 
          withCredentials: true 
        }),
        axios.get("http://localhost:8080/api/v1/appointment/doctor-confirmed", { 
          withCredentials: true 
        }),
        axios.get("http://localhost:8080/api/v1/appointment/doctor-completed", { 
          withCredentials: true 
        }),
      ]);

      setStats({
        totalAppointments: appointmentsRes.data.appointments.length,
        confirmedAppointments: confirmedRes.data.appointments.length,
        completedAppointments: completedRes.data.appointments.length,
        pendingAppointments: appointmentsRes.data.appointments.filter(
          app => app.status === 'Pending'
        ).length
      });

      setAppointments(appointmentsRes.data.appointments);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboardData();
    const interval = setInterval(fetchDashboardData, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, [fetchDashboardData]);

  const handleUpdateStatus = async (id, status) => {
    try {
      setAppointments(prev => 
        prev.map(app => 
          app._id === id ? { ...app, status } : app
        )
      );

      const { data } = await axios.put(
        `http://localhost:8080/api/v1/appointment/appointments/${id}/status`,
        { status },
        { withCredentials: true }
      );

      toast.success(data.message || "Status updated successfully");
      fetchDashboardData(); // Refresh data
    } catch (error) {
      console.error("Update status error:", error);
      toast.error(error.response?.data?.message || "Failed to update status");
    }
  };

  const filteredAppointments = appointments.filter(app => {
    if (filter === 'all') return true;
    if (filter === 'confirmed') return app.status === 'Accepted';
    if (filter === 'pending') return app.status === 'Pending';
    if (filter === 'completed') return app.hasVisited;
    return true;
  });

  const columns = [
    {
      name: 'Patient',
      selector: row => row.patientName || 'N/A',
      sortable: true,
    },
    {
      name: 'Phone',
      selector: row => row.phone || 'N/A',
    },
    {
      name: 'Date & Time',
      selector: row => row.appointment_date || 'N/A',
      sortable: true,
    },
    {
      name: 'Department',
      selector: row => row.department || 'N/A',
    },
    {
      name: 'Status',
      cell: row => (
        row.hasVisited ? (
          <span className="badge bg-success">Completed</span>
        ) : (
          <select
            className={`form-select status-select ${row.status.toLowerCase()}`}
            value={row.status}
            onChange={(e) => handleUpdateStatus(row._id, e.target.value)}
          >
            <option value="Pending">Pending</option>
            <option value="Accepted">Accepted</option>
            <option value="Rejected">Rejected</option>
          </select>
        )
      ),
    },
    {
      name: 'Visited',
      cell: row => (
        row.hasVisited ? 
          <GoCheckCircleFill className="text-success fs-4" /> : 
          <AiFillCloseCircle className="text-danger fs-4" />
      ),
      center: true
    },
  ];

  return (
    <div className="dashboard-container">
      <Sidebar />
      
      <div className="main-content">
        {/* Header */}
        <div className="dashboard-header">
          <h2 className="welcome-title">
            Welcome, Dr. {user?.firstName} {user?.lastName}
          </h2>
          <p className="welcome-subtitle">
            <GoCalendar className="me-2" />
            Today is {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>

        {/* Stats Cards */}
        <div className="row stats-row">
          <div className="col-md-3">
            <div className="stat-card bg-primary-light">
              <div className="stat-icon">
                <FaCalendarAlt className="text-primary" />
              </div>
              <div className="stat-info">
                <h3>{stats.totalAppointments}</h3>
                <p>Total Appointments</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="stat-card bg-warning-light">
              <div className="stat-icon">
                <FaClock className="text-warning" />
              </div>
              <div className="stat-info">
                <h3>{stats.pendingAppointments}</h3>
                <p>Pending Appointments</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="stat-card bg-success-light">
              <div className="stat-icon">
                <FaCheck className="text-success" />
              </div>
              <div className="stat-info">
                <h3>{stats.confirmedAppointments}</h3>
                <p>Confirmed Appointments</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="stat-card bg-info-light">
              <div className="stat-icon">
                <FaHistory className="text-info" />
              </div>
              <div className="stat-info">
                <h3>{stats.completedAppointments}</h3>
                <p>Completed Appointments</p>
              </div>
            </div>
          </div>
        </div>

        {/* Appointments Section */}
        <div className="appointments-section">
          <div className="section-header">
            <h3>Appointments Management</h3>
            <div className="filter-buttons">
              <button 
                className={`btn ${filter === 'all' ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => setFilter('all')}
              >
                All
              </button>
              <button 
                className={`btn ${filter === 'pending' ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => setFilter('pending')}
              >
                Pending
              </button>
              <button 
                className={`btn ${filter === 'confirmed' ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => setFilter('confirmed')}
              >
                Confirmed
              </button>
              <button 
                className={`btn ${filter === 'completed' ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => setFilter('completed')}
              >
                Completed
              </button>
            </div>
          </div>

          <div className="appointments-table">
            <DataTable
              columns={columns}
              data={filteredAppointments}
              pagination
              progressPending={loading}
              noDataComponent={<div className="py-4">No appointments found</div>}
              customStyles={{
                headCells: {
                  style: {
                    backgroundColor: '#f8f9fa',
                    fontWeight: '600',
                  },
                },
                rows: {
                  style: {
                    '&:hover': {
                      backgroundColor: '#f8f9fa',
                    },
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;