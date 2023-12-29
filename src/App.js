import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TextField from "@mui/material/TextField";

function App() {
  const [columns, setColumns] = useState([]);
  const [records, setRecords] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3001/users")
      .then((res) => {
        if (Array.isArray(res.data) && res.data.length > 0) {
          setColumns(Object.keys(res.data[0]));
          setRecords(res.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  async function handleSubmit(id) {
    const confirmed = window.confirm("Do you want to delete?");
    if (confirmed) {
      try {
        await axios.delete(`http://localhost:3001/users/${id}`);
        toast.success("Data deleted");

        // Update the state to trigger a re-render
        setRecords((prevRecords) =>
          prevRecords.filter((record) => record.id !== id)
        );
      } catch (err) {
        console.error("Error deleting data:", err);
        toast.error("Error deleting data");
      }
    }
  }

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredRecords = records.filter(
    (record) =>
      record.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-5">
      <ToastContainer />
      <div className="text-start">
        <Link to="/create" className="btn btn-success">
          Add +
        </Link>
        <div className="text-center mb-3">
          <TextField
            label="Search"
            variant="outlined"
            margin="normal"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>E-mail</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredRecords.length > 0 ? (
            filteredRecords.map((d, i) => (
              <tr key={i}>
                <td>{d.id}</td>
                <td>{d.name}</td>
                <td>{d.email}</td>
                <td>
                  <Link
                    to={`/update/${d.id}`}
                    className="btn btn-sm btn-secondary"
                  >
                    Update
                  </Link>
                  <button
                    onClick={(e) => handleSubmit(d.id)}
                    className="btn btn-sm ms-1 btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">
                No data available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;
