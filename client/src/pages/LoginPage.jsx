import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { UserContext } from "../context/UserContext";
import axios from "axios";

export const LoginPage = () => {
  const { setName, setId } = useContext(UserContext);
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const login = async (data) => {
    try {
      const response = await axios.post("http://localhost:3000/login", data, {
        headers: {
          withCredentials: true,
        },
      });
      const name = response.data.userInfo.name;
      const id = response.data.userInfo._id;
      const rol = response.data.userInfo.rol;
      setName(name);
      setId(id);
      if (rol === "admin") {
        navigate("/admin");
      } else {
        navigate("/user");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-purple-700">
      <form
        onSubmit={handleSubmit(login)}
        className="bg-white w-1/3 p-6 rounded-3xl shadow-2xl flex flex-col justify-center items-center"
      >
        <input
          type="text"
          className="w-full rounded-xl p-3 mt-4 border-2 border-gray-500"
          placeholder="Username"
          {...register("username")}
          required
        />
        <input
          type="password"
          className="w-full rounded-xl p-3 mt-4 border-2 border-gray-500"
          placeholder="Password"
          {...register("password")}
          required
        />
        <button
          type="submit"
          className="bg-green-600 text-white font-extrabold p-3 rounded-2xl hover:bg-green-700 mt-6"
        >
          Login
        </button>
      </form>
    </div>
  );
};
