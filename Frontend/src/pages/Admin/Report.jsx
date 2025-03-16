import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import { Container, Form } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import DataTable from "react-data-table-component";
import "../../App.css";

const Report = () => {
  const [reportData, setReportData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchReport();
  }, []);

  const fetchReport = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/reports/getreport",
        { withCredentials: true }
      );

      // Group appointments by doctor and count visits
      const doctorStats = data.appointments.reduce((acc, appointment) => {
        const doctorName = `${appointment.doctor?.firstName || "N/A"} ${
          appointment.doctor?.lastName || ""
        }`;

        if (!acc[doctorName]) {
          acc[doctorName] = { doctorName, count: 0 };
        }
        acc[doctorName].count += 1;

        return acc;
      }, {});

      const sortedData = Object.values(doctorStats).sort((a, b) => b.count - a.count);
      setReportData(sortedData);
    } catch (error) {
      console.error("Error fetching report:", error);
      toast.error("Failed to load report data");
    }
  };

  // Define Columns for DataTable
  const columns = [
    {
      name: "#",
      selector: (row, index) => index + 1,
      sortable: true,
      width: "80px",
    },
    {
      name: "Doctor Name",
      selector: (row) => row.doctorName,
      sortable: true,
    },
    {
      name: "Total Accepted Patients",
      selector: (row) => row.count,
      sortable: true,
      right: true,
    },
  ];

  // Filtered Data
  const filteredData = reportData.filter((doctor) =>
    doctor.doctorName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Sidebar />
      <Container
        fluid
        className="report-container"
        style={{
          marginLeft: "250px",
          padding: "20px",
          overflow: "auto",
          position: "relative",
          width: "calc(100% - 250px)",
          background: "#f8f9fa",
          minHeight: "100vh",
        }}
      >
        <h3 className="mb-4" style={{ color: "#007bff" }}>
          Accepted Appointments Report
        </h3>

        {/* Search Input */}
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="Search by doctor name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: "300px" }}
          />
        </Form.Group>

        {/* Data Table */}
        <DataTable
          columns={columns}
          data={filteredData}
          pagination
          highlightOnHover
          responsive
          striped
          defaultSortFieldId={1}
          customStyles={{
            headCells: {
              style: {
                backgroundColor: "#007bff",
                color: "white",
                fontWeight: "bold",
              },
            },
          }}
        />
      </Container>
    </>
  );
};

export default Report;
