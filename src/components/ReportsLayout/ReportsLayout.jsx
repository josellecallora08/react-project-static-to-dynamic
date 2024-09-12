import React from "react";
import "./ReportsLayout.css";
import Navbar from "../Navbar/Navbar.jsx";
import pdf from '../../assets/patient_report.pdf'
const reportsData = [
  {
    serialNumber: 1,
    doctorName: "Dr. John Doe",
    speciality: "Cardiology",
  },
  {
    serialNumber: 2,
    doctorName: "Dr. Jane Smith",
    speciality: "Dermatology",
  },
];

const ReportsLayout = () => {
  return (
    <>
      <Navbar />
      <div className="reports-container">
        <h2>Reports</h2>
        <table className="reports-table">
          <thead>
            <tr>
              <th>Serial Number</th>
              <th>Doctor Name</th>
              <th>Doctor Specialty</th>
              <th>View Report</th>
              <th>Download Report</th>
            </tr>
          </thead>
          <tbody>
            {reportsData.map((report, index) => (
              <tr key={index}>
                <td>{report.serialNumber}</td>
                <td>{report.doctorName}</td>
                <td>{report.speciality}</td>
                <td>
                  <a download href={pdf} className="btn view-btn">View Report</a>
                </td>
                <td>
                  <button className="btn download-btn">Download Report</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ReportsLayout;
