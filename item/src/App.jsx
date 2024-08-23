import React, { useState, useEffect, useRef } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ClipLoader from "react-spinners/ClipLoader"; // Import a spinner component

function App() {
  const [items, setItems] = useState([]); // State to store items
  const [name, setName] = useState(""); // State to store the name input
  const [description, setDescription] = useState(""); // State to store the description input
  const [price, setPrice] = useState(""); // State to store the price input
  const [isAdding, setIsAdding] = useState(false); // State to manage adding loading
  const [isDeleting, setIsDeleting] = useState(null); // State to manage which item is being deleted
  const [nameError, setNameError] = useState(""); // State to manage name input error

  const nameInputRef = useRef(null); // Ref to access the name input field

  const backendUrl = `${import.meta.env.VITE_API_URL}`;

  // Function to fetch items from the backend
  useEffect(() => {
    setIsAdding(true);
    fetch(`${backendUrl}/api/item`)
      .then((response) => response.json())
      .then((data) => {
        setItems(data);
        setIsAdding(false);
      })
      .catch((error) => {
        toast.error("Error fetching items.");
        setIsAdding(false);
      });
  }, [backendUrl]);

  // Function to handle the form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim()) {
      // Check if the name field is empty or contains only whitespace
      setNameError("Name field is required.");
      nameInputRef.current.focus(); // Focus on the name input field
      return;
    }

    setNameError(""); // Clear any previous error
    setIsAdding(true);

    const newItem = { name, description, price: parseFloat(price) };

    fetch(`${backendUrl}/api/item`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newItem),
    })
      .then((response) => response.json())
      .then((data) => {
        setItems([...items, data]); // Add the new item to the existing list
        setName(""); // Clear the name input field
        setDescription(""); // Clear the description input field
        setPrice(""); // Clear the price input field
        toast.success("Item added successfully");
        setIsAdding(false);
      })
      .catch((error) => {
        console.error("Error adding item:", error);
        toast.error("Error adding item");
        setIsAdding(false);
      });
  };

  // Function to handle item deletion
  const handleDelete = (id) => {
    setIsDeleting(id);

    fetch(`${backendUrl}/api/item/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          setItems(items.filter((item) => item.id !== id)); // Remove the deleted item from the state
          toast.success("Item deleted successfully");
        } else {
          throw new Error("Failed to delete item");
        }
      })
      .catch((error) => {
        console.error("Error deleting item:", error);
        toast.error("Error deleting item");
      })
      .finally(() => {
        setIsDeleting(null);
      });
  };

  return (
    <div className="">
      <div className="container mx-auto mt-8 w-[400px] rounded-md overflow-hidden bg-white py-6 px-4">
        <h2 className="text-2xl font-bold mb-4">Add New Item</h2>
        <form onSubmit={handleSubmit} className="mb-8">
          <div className="mb-4">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              className="w-full p-2 border border-gray-300 rounded outline-none"
              ref={nameInputRef} // Attach ref to the name input field
            />
            {nameError && (
              <p className="text-red-500 text-sm mt-1">{nameError}</p> // Display error message
            )}
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600"
            disabled={isAdding}
          >
            {isAdding ? <ClipLoader size={20} color="#fff" /> : "Add Item"}
          </button>
        </form>

        <h2 className="text-2xl font-bold mb-4 max-h-[350px]">Items List</h2>
        <div className="max-h-[300px] overflow-y-scroll">
          {isAdding && !items.length ? (
            <div className="flex justify-center items-center h-full">
              <ClipLoader size={50} color="#000" />
            </div>
          ) : items.length === 0 ? (
            <p className="text-center text-gray-500">No data available</p>
          ) : (
            <ul className="space-y-4">
              {items.map((item) => (
                <li key={item.id} className="p-4 bg-gray-100 rounded shadow">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-semibold">{item.name}</h3>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      disabled={isDeleting === item.id}
                    >
                      {isDeleting === item.id ? (
                        <ClipLoader size={10} color="#fff" />
                      ) : (
                        "Delete"
                      )}
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <ToastContainer /> {/* Add ToastContainer here */}
    </div>
  );
}

export default App;
