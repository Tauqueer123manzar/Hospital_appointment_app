import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Button, Form, InputGroup } from 'react-bootstrap';
import { toast } from 'react-toastify';
import Sidebar from '../../components/Sidebar';
import DataTable from 'react-data-table-component';
import { FaTrash, FaStar } from 'react-icons/fa';

const FeedbackList = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const [pending, setPending] = useState(true);

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      setLoading(true);
      setPending(true);
      const response = await axios.get('http://localhost:8080/api/v1/feedback/getall');
      if (response.status === 200) {
        setFeedbacks(response.data.feedbacks);
      }
    } catch (error) {
      console.error('Error fetching feedbacks:', error);
      toast.error('Failed to load feedbacks');
    } finally {
      setLoading(false);
      setPending(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this feedback?')) {
      try {
        const response = await axios.delete(`http://localhost:8080/api/v1/feedback/delete/${id}`);
        if (response.status === 200) {
          toast.success('Feedback deleted successfully');
          fetchFeedbacks(); // Refresh the list
        }
      } catch (error) {
        console.error('Error deleting feedback:', error);
        toast.error('Failed to delete feedback');
      }
    }
  };

  // Custom styled component for the DataTable
  const customStyles = {
    headRow: {
      style: {
        backgroundColor: '#f8f9fa',
        color: '#212529',
        fontWeight: 'bold',
        borderBottomWidth: '1px',
        borderBottomColor: '#dee2e6',
      },
    },
    rows: {
      style: {
        minHeight: '60px',
        fontSize: '14px',
      },
      highlightOnHoverStyle: {
        backgroundColor: '#f1f5f9',
        cursor: 'pointer',
      },
    },
    pagination: {
      style: {
        color: '#6c757d',
        fontSize: '14px',
      },
    },
  };

  // Star rating component to display stars instead of numbers
  const RatingStars = ({ rating }) => {
    return (
      <div className="d-flex">
        {[...Array(5)].map((_, index) => (
          <FaStar
            key={index}
            size={18}
            color={index < rating ? "#ffc107" : "#e4e5e9"}
            style={{ marginRight: 2 }}
          />
        ))}
      </div>
    );
  };

  // DataTable columns configuration
  const columns = [
    {
      name: 'Patient',
      selector: row => row.patientName,
      sortable: true,
      wrap: true,
    },
    {
      name: 'Doctor',
      selector: row => row.doctorId ? `${row.doctorId.firstname} ${row.doctorId.lastname}` : 'Unknown Doctor',
      sortable: true,
      wrap: true,
    },
    {
      name: 'Feedback',
      selector: row => row.feedback,
      sortable: true,
      wrap: true,
      grow: 2,
    },
    {
      name: 'Rating',
      cell: row => <RatingStars rating={row.rating} />,
      sortable: true,
      center: true,
    },
    {
      name: 'Actions',
      cell: row => (
        <Button
          variant="danger"
          size="sm"
          onClick={() => handleDelete(row._id)}
        >
          <FaTrash />
        </Button>
      ),
      center: true,
    },
  ];

  // Filter function for search
  const filteredItems = feedbacks.filter(feedback => {
    const doctorName = feedback.doctorId ? 
      `${feedback.doctorId.firstname} ${feedback.doctorId.lastname}`.toLowerCase() : '';
    const patientName = feedback.patientName ? feedback.patientName.toLowerCase() : '';
    const feedbackText = feedback.feedback ? feedback.feedback.toLowerCase() : '';
    
    return (
      doctorName.includes(searchTerm.toLowerCase()) ||
      patientName.includes(searchTerm.toLowerCase()) ||
      feedbackText.includes(searchTerm.toLowerCase())
    );
  });

  // Search handler
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setResetPaginationToggle(!resetPaginationToggle);
  };

  return (
    <>
      <Sidebar/>
      <div className="content-area" style={{ marginLeft: "280px", width: "calc(100% - 280px)" }}>
        <Container fluid className="py-4">
          <h2 className="text-center mb-4">Patient Feedbacks</h2>
          
          <div className="card mb-4">
            <div className="card-body">
              <InputGroup className="mb-3">
                <Form.Control
                  placeholder="Search by patient, doctor, or feedback content..."
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </InputGroup>
              
              <DataTable
                columns={columns}
                data={filteredItems}
                pagination
                paginationResetDefaultPage={resetPaginationToggle}
                customStyles={customStyles}
                highlightOnHover
                pointerOnHover
                progressPending={pending}
                progressComponent={<div className="text-center my-3">Loading feedbacks...</div>}
                noDataComponent={<div className="text-center my-3">No feedbacks found</div>}
                paginationPerPage={10}
                paginationRowsPerPageOptions={[5, 10, 15, 20, 25]}
              />
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default FeedbackList;