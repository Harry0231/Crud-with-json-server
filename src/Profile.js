import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { Typography, Box, Paper, Grid } from "@mui/material";
import axios from "axios";
import Button from "@mui/material/Button";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const location = useLocation();

  useEffect(() => {
    // Fetch user data based on the currently logged-in username
    const username = sessionStorage.getItem("username");

    if (username) {
      axios
        .get(`http://localhost:3001/user/${username}`)
        .then((res) => {
          setUserData(res.data);
        })
        .catch((err) => console.error("Error fetching user data:", err));
    }
  }, [location]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="80vh"
    >
      <Typography variant="h4" gutterBottom>
        Profile
      </Typography>
      {userData ? (
        <Paper elevation={3} style={{ padding: "20px", maxWidth: "600px" }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h6">Username: {userData.id}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1">
                Full Name: {userData.name}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1">Email: {userData.email}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1">
                Phone No: {userData.phone}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1">
                Address: {userData.address}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1">Gender: {userData.gender}</Typography>
            </Grid>
          </Grid>
        </Paper>
      ) : (
        <Typography variant="body1">Loading...</Typography>
      )}
      <Link to={"/"} style={{ marginTop: "10px" }}>
        <Button variant="contained" color="secondary">
          Back
        </Button>
      </Link>
    </Box>
  );
};

export default Profile;
