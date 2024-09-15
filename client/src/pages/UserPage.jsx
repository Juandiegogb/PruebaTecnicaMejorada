import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const UserPage = () => {
  const { register, handleSubmit } = useForm();
  const { name, id } = useContext(UserContext);
  const [records, setRecords] = useState([]);
  const navigate = useNavigate();

  const createRecord = async () => {
    await axios.post(`http://localhost:3000/createRecord/${id}`);
  };

  useEffect(() => {
    const getRecords = async () => {
      const response = await axios.get(
        `http://localhost:3000/getRecords/${id}`
      );
      setRecords(response.data.reverse());
    };
    getRecords();
    if (!id) navigate("/");
  });

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-teal-700">
      <main className="h-3/4 flex bg-white w-1/2 p-6 rounded-3xl shadow-2xl justify-center items-center">
        <div className="w-1/2 h-full overflow-y-auto scrollbar-none">
          {records.length > 0 ? (
            records.map((record, index) => (
              <div
                className="text-white bg-blue-600 rounded-md my-3 p-4 w-full "
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
        <form
          onSubmit={handleSubmit(createRecord)}
          className="p-5 flex flex-col justify-center items-center"
        >
          <h1 className="text-3xl font-extrabold">
            Para crear un nuevo registro de ingreso solo da click en el botón.
          </h1>
          <div className="w-full flex justify-between">
            <button
              type="submit"
              className="bg-green-600 text-white font-extrabold p-3 rounded-2xl hover:bg-green-700 mt-6"
            >
              Crear nuevo registro
            </button>
            <button
              type="button"
              onClick={() => {
                navigate("/");
              }}
              className="bg-red-700 text-white font-extrabold p-3 rounded-md mt-6"
            >
              Logout
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};
