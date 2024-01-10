import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import CircularProgress from "@mui/material/CircularProgress";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    sessionStorage.clear();
  }, []);

  const proceedLogin = (e) => {
    e.preventDefault();
    if (validate()) {
      setLoading(true);
      fetch("http://localhost:3001/user/" + username)
        .then((res) => res.json())
        .then((resp) => {
          if (Object.keys(resp).length === 0) {
            toast.error("Please enter a valid username");
          } else {
            if (resp.password === password) {
              toast.success(`${username} Login successful`);
              sessionStorage.setItem("username", username);
              // sessionStorage.setItem("userrole", resp.role);
              navigate("/");
            } else {
              toast.error("Invalid credentials");
            }
          }
        })
        .catch((err) => {
          toast.error("Login failed due to: " + err.message);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const validate = () => {
    let result = true;
    if (username === "" || username === null) {
      result = false;
      toast.warning("Please enter a username");
    }
    if (password === "" || password === null) {
      result = false;
      toast.warning("Please enter a password");
    }
    return result;
  };

  return (
    <div
      className="row"
      style={{ display: "flex", justifyContent: "center", marginTop: "150px" }}
    >
      <div className="col-lg-6" style={{ marginTop: "100px" }}>
        <form onSubmit={proceedLogin} className="container">
          <Card>
            <CardHeader title="User Login" />
            <CardContent>
              <div className="form-group" style={{ marginBottom: "16px" }}>
                <TextField
                  label="User Name *"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  style={{ marginBottom: "8px" }}
                />
              </div>
              <div className="form-group" style={{ marginBottom: "16px" }}>
                <TextField
                  label="Password *"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  style={{ marginBottom: "8px" }}
                />
              </div>
            </CardContent>
            <CardActions>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={loading}
              >
                {loading ? <CircularProgress size={20} /> : "Login"}
              </Button>
              <Link to="/register">
                <Button variant="contained" color="success">
                  New User
                </Button>
              </Link>
            </CardActions>
          </Card>
        </form>
      </div>
    </div>
  );
};

export default Login;
