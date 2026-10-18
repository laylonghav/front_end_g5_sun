import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState({ username: "", password: "" });

  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();

    // if (form?.username.trim() == "") {
    //   alert("Username is required.");
    //   return;
    // }
    // if (form?.password.trim() == "") {
    //   alert("Password is required.");
    //   return;
    // }

    const newError = {
      username: "",
      password: "",
    };

    if (!form.username.trim()) {
      newError.username = "Username is required.";
    }
    if (!form.password.trim()) {
      newError.password = "Password is required.";
    }

    setError(newError);

    if (newError.username != "" || newError.password != "") return;

    console.log("Form data: ", form);
    setForm({ username: "", password: "" });
    setError({ username: "", password: "" });

    // Go to HomePage
    navigate("/");
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form
        onSubmit={onSubmit}
        style={{
          width: "350px",
          height: "350px",
          backgroundColor: "gray",
          padding: "1rem",
          borderRadius: "1rem",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <strong style={{ textAlign: "center" }}>Register</strong>

        <div className="" style={{ display: "flex", flexDirection: "column" }}>
          <label htmlFor="">Username</label>
          <input
            value={form?.username}
            style={{
              border: "none",
              outline: "none",
              padding: "1rem",
              borderRadius: "1rem",
            }}
            onChange={(e) => {
              setForm({ ...form, username: e.target.value });
              setError({ ...error, username: "" });
            }}
            type="text"
            placeholder="Username"
          />
          <p style={{ color: "red" }}>{error?.username}</p>
        </div>
        <div className="" style={{ display: "flex", flexDirection: "column" }}>
          <label htmlFor="">Password</label>
          <input
            value={form?.password}
            style={{
              border: "none",
              outline: "none",
              padding: "1rem",
              borderRadius: "1rem",
            }}
            onChange={(e) => {
              setForm({ ...form, password: e.target.value });
              setError({ ...error, password: "" });
            }}
            type="text"
            placeholder="Password"
          />
          <p style={{ color: "red" }}>{error?.password}</p>
        </div>

        <button
          style={{
            border: "none",
            outline: "none",
            padding: "0.5rem",
            borderRadius: "1rem",
            fontSize: "1rem",
          }}
          type="submit"
        >
          Register
        </button>
        <p style={{ textAlign: "center" }}>
          Do you already have an account ?{" "}
          <NavLink to={"/auth/login"}>Login</NavLink>{" "}
        </p>
      </form>
    </div>
  );
}
