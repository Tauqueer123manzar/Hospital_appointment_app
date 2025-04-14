import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { context } from "../main";
import axios from "axios";
import Sidebar from "../components/DoctorSidebar";
import { toast } from "react-toastify";
import { 
  FaUserMd, 
  FaEnvelope, 
  FaPhone, 
  FaCalendarAlt,
  FaGraduationCap,
  FaBriefcaseMedical,
  FaHospital,
  FaMapMarkerAlt,
  FaEdit,
  FaIdCard,
  FaStethoscope
} from "react-icons/fa";
import { GiDoctorFace } from "react-icons/gi";
import '../../App.css';

const DoctorProfile = () => {
  const { isAuthenticated, user } = useContext(context);
  const navigateTo = useNavigate();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      navigateTo("/doctor/login");
      return;
    }
    
    const fetchDoctorProfile = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:8080/api/v1/user/getdoctor/${user._id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("doctorToken")}`,
            },
            withCredentials: true }
        );
        setDoctor(response.data.doctor);
      } catch (error) {
        console.error("Error fetching doctor profile:", error);
        toast.error("Failed to load profile data");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctorProfile();
  }, [isAuthenticated, user, navigateTo]);

  if (loading) {
    return (
      <div className="doctor-profile-container">
        <Sidebar />
        <div className="profile-loading">
          <div className="spinner"></div>
          <p>Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="doctor-profile-container">
        <Sidebar />
        <div className="profile-error">
          <p>No profile data found</p>
          <button onClick={() => window.location.reload()}>Try Again</button>
        </div>
      </div>
    );
  }

  return (
    <div className="doctor-profile-container">
      <Sidebar />
      
      <div className="doctor-profile-content">
        <div className="profile-header">
          <h1>My Professional Profile</h1>
          <button 
            className="edit-btn"
            onClick={() => navigateTo("/doctor/profile/edit")}
          >
            <FaEdit /> Edit Profile
          </button>
        </div>

        <div className="profile-card">
          <div className="profile-top-section">
            <div className="avatar-section">
              {doctor.avatar ? (
                <img 
                  src={doctor.avatar} 
                  alt={`Dr. ${doctor.firstName}`}
                  className="profile-avatar"
                />
              ) : (
                <div className="avatar-placeholder">
                  <GiDoctorFace />
                </div>
              )}
            </div>
            
            <div className="profile-title">
              <h2>Dr. {doctor.firstName} {doctor.lastName}</h2>
              <p className="specialty">{doctor.specialization}</p>
              <div className="profile-meta">
                <span className="rating">
                  {doctor.rating ? `${doctor.rating.toFixed(1)} ★` : "New Doctor"}
                </span>
                <span className="experience">
                  {doctor.experience || "0"} years experience
                </span>
              </div>
            </div>
          </div>

          <div className="profile-details-grid">
            {/* Personal Information Column */}
            <div className="details-column">
              <h3><FaUserMd /> Personal Information</h3>
              
              <div className="detail-item">
                <div className="detail-icon"><FaIdCard /></div>
                <div className="detail-content">
                  <label>Full Name</label>
                  <p>Dr. {doctor.firstName} {doctor.lastName}</p>
                </div>
              </div>

              <div className="detail-item">
                <div className="detail-icon"><FaEnvelope /></div>
                <div className="detail-content">
                  <label>Email</label>
                  <p>{doctor.email}</p>
                </div>
              </div>

              <div className="detail-item">
                <div className="detail-icon"><FaPhone /></div>
                <div className="detail-content">
                  <label>Phone</label>
                  <p>{doctor.phone || "Not provided"}</p>
                </div>
              </div>

              <div className="detail-item">
                <div className="detail-icon"><FaCalendarAlt /></div>
                <div className="detail-content">
                  <label>Date of Birth</label>
                  <p>
                    {doctor.dob ? new Date(doctor.dob).toLocaleDateString() : "Not provided"}
                  </p>
                </div>
              </div>

              <div className="detail-item">
                <div className="detail-icon"><FaMapMarkerAlt /></div>
                <div className="detail-content">
                  <label>Address</label>
                  <p>{doctor.address || "Not provided"}</p>
                </div>
              </div>
            </div>

            {/* Professional Information Column */}
            <div className="details-column">
              <h3><FaStethoscope /> Professional Information</h3>
              
              <div className="detail-item">
                <div className="detail-icon"><FaBriefcaseMedical /></div>
                <div className="detail-content">
                  <label>Specialization</label>
                  <p>{doctor.specialization}</p>
                </div>
              </div>

              <div className="detail-item">
                <div className="detail-icon"><FaGraduationCap /></div>
                <div className="detail-content">
                  <label>Qualifications</label>
                  <p>
                    {doctor.qualifications?.join(", ") || "Not provided"}
                  </p>
                </div>
              </div>

              <div className="detail-item">
                <div className="detail-icon"><FaHospital /></div>
                <div className="detail-content">
                  <label>Hospital/Clinic</label>
                  <p>{doctor.hospital || "Not provided"}</p>
                </div>
              </div>

              <div className="detail-item">
                <div className="detail-icon"><FaBriefcaseMedical /></div>
                <div className="detail-content">
                  <label>Experience</label>
                  <p>{doctor.experience || "0"} years</p>
                </div>
              </div>

              <div className="detail-item">
                <div className="detail-icon"><FaBriefcaseMedical /></div>
                <div className="detail-content">
                  <label>Consultation Fee</label>
                  <p>{doctor.fee ? `₹${doctor.fee}` : "Not set"}</p>
                </div>
              </div>
            </div>
          </div>

          {doctor.bio && (
            <div className="bio-section">
              <h3>About Me</h3>
              <p className="bio-content">{doctor.bio}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;