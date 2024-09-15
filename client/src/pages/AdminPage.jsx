import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();
  const [records, setRecords] = useState([]);

  const createUser = async (data) => {
    try {
      await axios.post("http://localhost:3000/createUser", data);
      reset();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUser = async (id) => {
    console.log(id);
    try {
      await axios.post(`http://localhost:3000/deleteUser/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    async function showUsers() {
      try {
        const response = await axios.get("http://localhost:3000/getUsers");
        setUsers(response.data);
      } catch (error) {
        setUsers(["API error"]);
      }
    }
    showUsers();
  });

  const getRecords = async (id) => {
    const response = await axios.get(`http://localhost:3000/getRecords/${id}`);
    console.log(`http://localhost:3000/getRecords/${id}`);
    console.log(response.data);
    setRecords(response.data.reverse());
  };

  return (
    <div className="h-screen w-screen justify-center flex items-center bg-indigo-900">
      <main className="bg-white rounded-md p-5 w-3/4 h-3/4 flex justify-center items-center">
        <div className="flex flex-col w-1/2 h-full p-5 overflow-y-auto scrollbar-none">
          {users.length > 0 ? (
            users
              .filter((user) => user.rol != "admin")
              .map((user, index) => (
                <div
                  className="text-white bg-blue-600 rounded-md my-3 p-4 w-full"
                  key={index}
                >
                  <div className="flex flex-col text-left w-full">
                    <p>
                      <strong>Name:</strong> {user.name}
                    </p>
                    <p>
                      <strong>Username:</strong> {user.username}
                    </p>
                    <p>
                      <strong>Role:</strong> {user.rol}
                    </p>
                  </div>
                  <div className="w-full flex justify-between">
                    <button
                      className="text-white rounded-md font-extrabold my-3 p-4 bg-green-500 hover:bg-green-700 "
                      onClick={() => {
                        getRecords(user._id);
                      }}
                    >
                      Records
                    </button>
                    <button
                      onClick={() => deleteUser(user._id)}
                      className="text-white rounded-md font-extrabold my-3 p-4 bg-red-500 hover:bg-red-700 "
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
          ) : (
            <p>No users yet</p>
          )}
        </div>
        <div className="flex flex-col w-1/4 h-full p-5 overflow-y-auto scrollbar-none ">
          {records.length > 0 ? (
            records.map((record, index) => (
              <div
                className="text-white bg-slate-500 rounded-md my-3 p-4 w-full "
                key={index}
              >
                <p>
                  <strong>Fecha:</strong> {record.date}
                </p>
                <p>
                  <strong>Hora:</strong> {record.time}
                </p>
              </div>
            ))
          ) : (
            <p>Sin registros</p>
          )}
        </div>
        <div className="p-6 flex justify-center items-center h-full w-full">
          <form className="flex flex-col" onSubmit={handleSubmit(createUser)}>
            <input
              required
              className="p-3 my-2 border-gray-500 border-2 rounded-md"
              type="text"
              placeholder="Name"
              {...register("name")}
            />
            <input
              required
              className="p-3 my-2 border-gray-500 border-2 rounded-md"
              type="text"
              placeholder="username"
              {...register("username")}
            />
            <input
              required
              className="p-3 my-2 border-gray-500 border-2 rounded-md"
              type="password"
              placeholder="Passoword"
              {...register("password")}
            />
            <select {...register("rol")} required className="bg-white my-2 p-3">
              <option value="empleado">Empleado</option>
              <option value="admin">Admin</option>
            </select>
            <div className="w-full flex justify-between">
              <button
                type="submit"
                className="bg-green-700 text-white font-extrabold p-3 rounded-md"
              >
                Create
              </button>
              <button
                type="button"
                onClick={() => {
                  navigate("/");
                }}
                className="bg-red-700 text-white font-extrabold p-3 rounded-md"
              >
                Logout
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};
