import React, { useState } from "react";
import axios from "axios";

const GenerateReport = () => {
  const [reportUrl, setReportUrl] = useState("");

  const handleGenerateReport = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/reports/generate-report");
      setReportUrl(response.data.url);
    } catch (error) {
      console.error("Error generating report", error);
    }
  };

  return (
    <div>
      <button onClick={handleGenerateReport}>Generate Report</button>
      {reportUrl && (
        <div>
          <p>Report Generated Successfully!</p>
          <a href={reportUrl} target="_blank" rel="noopener noreferrer">
            View Report
          </a>
        </div>
      )}
    </div>
  );
};

export default GenerateReport;
