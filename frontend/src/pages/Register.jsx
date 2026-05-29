import { useState } from "react";

import axios from "axios";

import {
  useNavigate,
  Link,
} from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      password: "",
    });

  const handleChange = (e) => {
    setFormData({
      ...formData,

      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        formData
      );

      localStorage.setItem(
        "token",
        res.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      navigate("/chat");
    } catch (error) {
      console.log(error);

      alert("Registration Failed");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-slate-950">
      <form
        onSubmit={handleSubmit}
        className="bg-slate-800 p-10 rounded-2xl w-[400px]"
      >
        <h1 className="text-4xl font-bold text-white mb-8">
          Register
        </h1>

        <input
          type="text"
          name="name"
          placeholder="Name"

          onChange={handleChange}

          required

          className="w-full p-4 rounded-xl mb-4 bg-slate-700 text-white outline-none"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"

          onChange={handleChange}

          required

          className="w-full p-4 rounded-xl mb-4 bg-slate-700 text-white outline-none"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"

          onChange={handleChange}

          required

          className="w-full p-4 rounded-xl mb-6 bg-slate-700 text-white outline-none"
        />

        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-xl">
          Register
        </button>

        <p className="text-white mt-5">
          Already have account?{" "}
          <Link
            to="/"
            className="text-blue-400 hover:text-blue-300"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;