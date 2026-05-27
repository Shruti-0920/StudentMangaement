import { useState } from "react";

function Login() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {

    try {

      const response = await fetch(
        "http://localhost:8082/auth/login",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            username: username,
            password: password
          })
        }
      );

      const token = await response.text();

      // if invalid login
      if(token === "Invalid Username or Password") {

        setError("Invalid Username or Password");
        return;

      }

      // save token
      localStorage.setItem("token", token);

      // reload app
      window.location.reload();

    }
    catch(err) {

      console.log(err);
      setError("Backend not running");

    }

  };

  return (

    <div
      style={{
        width: "400px",
        margin: "100px auto",
        padding: "30px",
        borderRadius: "10px",
        boxShadow: "0 0 10px gray"
      }}
    >

      <h1 style={{ textAlign: "center" }}>
        Login
      </h1>

      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "20px"
        }}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "20px"
        }}
      />

      <button
        onClick={handleLogin}
        style={{
          width: "100%",
          padding: "10px",
          backgroundColor: "black",
          color: "white",
          border: "none"
        }}
      >
        Login
      </button>

      <p style={{ textAlign: "center" }}>
        {error}
      </p>

    </div>

  );

}

export default Login;