import { adminLogin } from "../functions";
import { useState } from "react";
import { toast } from "react-toastify";

const AdminLogin = ({ setToken, history, token }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  if (token) history.push("/");

  const handleLogin = (e) => {
    e.preventDefault();
    adminLogin(username, password)
      .then((res) => {
        setToken(res.data);
        sessionStorage.setItem("token", res.data);
        history.push("/");
      })
      .catch((err) => {
        if (
          err.response.data === "Not Found" ||
          err.response.data === "Incorrect Password"
        )
          toast.error("Invalid Username or Password");
      });
  };
  return (
    <div className="col-md-4 offset-md-4 pt-5">
      <h4 className="form-title">Admin Login</h4>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label className="form-label">Username</label>
          <input
            required
            type="text"
            className="form-control"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <br />
        <div className="form-group">
          <label className="form-label">Password</label>
          <input
            required
            type="password"
            className="form-control"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <br />
        <button className="btn btn-primary">Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;
