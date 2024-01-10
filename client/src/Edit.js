import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Link, useNavigate, useParams } from "react-router-dom"; 
import axios from "axios";
import { toast } from "react-toastify";

const Edit = () => {
  const [data, setData] = useState({ id: "", name: "", email: "" });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3001/users/${id}`)
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  function handleSubmit(event) {
    event.preventDefault();
    axios.put(`http://localhost:3001/users/${id}`, data).then((res) => {
      toast.success("Data updated");
      navigate("/");
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100vh"
      >
        <TextField
          label="ID"
          name="id"
          margin="normal"
          variant="outlined"
          value={data.id}
          InputLabelProps={{
            shrink: !!data.id, 
          }}
          disabled
        />
        <TextField
          label="Name"
          name="name"
          margin="normal"
          variant="outlined"
          value={data.name}
          onChange={(e) => setData({ ...data, name: e.target.value })}
          InputLabelProps={{
            shrink: !!data.name, 
          }}
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          margin="normal"
          variant="outlined"
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
          InputLabelProps={{
            shrink: !!data.email, 
          }}
        />
        <Button type="submit" variant="contained" color="primary" mt={2}>
          Update
        </Button>
        <Box mt={2}>
          <Link to="/" className="btn btn-secondary">
            Back
          </Link>
        </Box>
      </Box>
    </form>
  );
};

export default Edit;
