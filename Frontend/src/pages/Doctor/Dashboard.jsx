import React, { useEffect, useContext, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { context } from "../../main";
import { 
  FaUsers, 
  FaCalendarAlt, 
  FaCheck, 
  FaClock,
  FaUserMd,
  FaHistory,
  FaBars
} from "react-icons/fa";
import { 
  GoCheckCircleFill,
  GoCalendar
} from "react-icons/go";
import { AiFillCloseCircle } from "react-icons/ai";
import DataTable from 'react-data-table-component';
import axios from "axios";
import { toast } from "react-toastify";
// import "../../DoctorDashboard.css";
const DoctorDashboard = () => {
  const { isAuthenticated, user } = useContext(context);
  const navigateTo = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

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
      cell: row => <span className="fw-semibold">{row.patientName || 'N/A'}</span>
    },
    {
      name: 'Phone',
      selector: row => row.phone || 'N/A',
    },
    {
      name: 'Date & Time',
      selector: row => row.appointment_date || 'N/A',
      sortable: true,
      cell: row => (
        <span className="text-primary">
          {new Date(row.appointment_date).toLocaleString()}
        </span>
      )
    },
    {
      name: 'Department',
      selector: row => row.department || 'N/A',
      cell: row => <span className="badge bg-secondary">{row.department || 'N/A'}</span>
    },
    {
      name: 'Status',
      cell: row => (
        row.hasVisited ? (
          <span className="badge bg-success">Completed</span>
        ) : (
          <select
            className={`form-select form-select-sm status-select ${row.status.toLowerCase()}`}
            value={row.status}
            onChange={(e) => handleUpdateStatus(row._id, e.target.value)}
            disabled={row.hasVisited}
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

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleMobileSidebar = () => {
    setMobileSidebarOpen(!mobileSidebarOpen);
  };

  return (
    <div className={`dashboard-container ${sidebarOpen ? 'sidebar-open' : 'sidebar-collapsed'}`}>
      {/* Mobile Sidebar Toggle */}
      <button 
        className="mobile-sidebar-toggle btn btn-primary"
        onClick={toggleMobileSidebar}
      >
        <FaBars />
      </button>

      {/* Sidebar */}
      <div className={`sidebar doctor-sidebar ${mobileSidebarOpen ? 'mobile-open' : ''}`}>
        <div className="sidebar-header">
          <h3>Doctor Panel</h3>
        </div>
        <ul className="sidebar-menu">
          <li className="active">
            <a href="#">
              <FaUserMd className="icon" />
              <span>Dashboard</span>
            </a>
          </li>
          <li>
            <a href="#">
              <FaCalendarAlt className="icon" />
              <span>Appointments</span>
            </a>
          </li>
          <li>
            <a href="#">
              <FaUsers className="icon" />
              <span>Patients</span>
            </a>
          </li>
          <li>
            <a href="#">
              <FaHistory className="icon" />
              <span>History</span>
            </a>
          </li>
        </ul>
        <div className="sidebar-footer">
          <button className="btn btn-sm btn-outline-light">
            <span>Logout</span>
          </button>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="main-content">
        {/* Header */}
        <div className="dashboard-header">
          <div className="header-left">
            <button 
              className="sidebar-toggle btn btn-link"
              onClick={toggleSidebar}
            >
              <FaBars />
            </button>
            <h2 className="welcome-title">
              Welcome, Dr. {user?.firstName} {user?.lastName}
            </h2>
          </div>
          <div className="header-right">
            <p className="welcome-subtitle">
              <GoCalendar className="me-2" />
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="row stats-row">
          <div className="col-xl-3 col-md-6 mb-4">
            <div className="stat-card total-appointments">
              <div className="stat-icon">
                <FaCalendarAlt />
              </div>
              <div className="stat-info">
                <h3>{stats.totalAppointments}</h3>
                <p>Total Appointments</p>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-md-6 mb-4">
            <div className="stat-card pending-appointments">
              <div className="stat-icon">
                <FaClock />
              </div>
              <div className="stat-info">
                <h3>{stats.pendingAppointments}</h3>
                <p>Pending Appointments</p>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-md-6 mb-4">
            <div className="stat-card confirmed-appointments">
              <div className="stat-icon">
                <FaCheck />
              </div>
              <div className="stat-info">
                <h3>{stats.confirmedAppointments}</h3>
                <p>Confirmed Appointments</p>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-md-6 mb-4">
            <div className="stat-card completed-appointments">
              <div className="stat-icon">
                <FaHistory />
              </div>
              <div className="stat-info">
                <h3>{stats.completedAppointments}</h3>
                <p>Completed Appointments</p>
              </div>
            </div>
          </div>
        </div>

        {/* Appointments Section */}
        <div className="appointments-section card">
          <div className="card-header">
            <h3 className="card-title">Appointments Management</h3>
            <div className="filter-buttons">
              <button 
                className={`btn btn-sm ${filter === 'all' ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => setFilter('all')}
              >
                All
              </button>
              <button 
                className={`btn btn-sm ${filter === 'pending' ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => setFilter('pending')}
              >
                Pending
              </button>
              <button 
                className={`btn btn-sm ${filter === 'confirmed' ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => setFilter('confirmed')}
              >
                Confirmed
              </button>
              <button 
                className={`btn btn-sm ${filter === 'completed' ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => setFilter('completed')}
              >
                Completed
              </button>
            </div>
          </div>
          <div className="card-body">
            <DataTable
              columns={columns}
              data={filteredAppointments}
              pagination
              progressPending={loading}
              noDataComponent={
                <div className="py-4 text-center text-muted">
                  No appointments found
                </div>
              }
              customStyles={{
                headCells: {
                  style: {
                    backgroundColor: '#f8f9fa',
                    fontWeight: '600',
                    fontSize: '14px',
                  },
                },
                cells: {
                  style: {
                    fontSize: '14px',
                  },
                },
                rows: {
                  style: {
                    '&:hover': {
                      backgroundColor: '#f8f9fa!important',
                    },
                  },
                },
              }}
              paginationPerPage={10}
              paginationRowsPerPageOptions={[10, 25, 50]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;