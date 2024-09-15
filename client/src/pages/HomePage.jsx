import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";

export const HomePage = () => {
  const [items, setItems] = useState([]);
  const itemName = useRef("");
  const { handleSubmit } = useForm();

  const addItem = () => {
    setItems([...items, itemName.current.value]);
    itemName.current.value = "";
  };
  const deleteItem = (indexToDelete) => {
    setItems(items.filter((_,index) => index !== indexToDelete));
  };

  return (
    <div className="h-screen w-screen bg-slate-800 flex justify-center items-center">
      <main className="flex justify-center items-center bg-white w-1/2 h-1/2 rounded-md p-6">
        <div className="flex flex-col w-1/4 h-full p-5 overflow-y-auto scrollbar-none">
          {items.length > 0 ? (
            items.map((item, index) => (
              <button
                key={index}
                onClick={() => deleteItem(index)}
                className="text-white bg-blue-600 rounded-md my-3 p-4 hover:bg-red-500  font-extrabold"
              >
                Name: {item}
              </button>
            ))
          ) : (
            <p> Add new items!</p>
          )}
        </div>
        <form className="flex flex-col p-5" onSubmit={handleSubmit(addItem)}>
          <h1>Write the name of your item and create it !</h1>
          <input
            className="border-gray-500 border-2 rounded-md  p-2 my-2"
            required
            type="text"
            ref={itemName}
          />
          <button
            type="submit"
            className="bg-green-600 rounded-md p-2 text-white font-extrabold"
          >
            Create
          </button>
        </form>
      </main>
    </div>
  );
};
