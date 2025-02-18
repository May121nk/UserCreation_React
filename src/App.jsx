import React, { useEffect, useState } from "react";

const App = () => {
  //use state shortcut - use likh kar 3 bar s

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [password, setPassword] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [data, setData] = useState([]);
  const [editId, setEditId] = useState(null);
  // console.log(name,email,password,number);

  // console.log(data);

  // data lene ke liye or mount karne ke liye
  useEffect(() => {
    const storedUsers = localStorage.getItem("userList");
    if (storedUsers) {
      setData(JSON.parse(storedUsers));
    }
  }, []);

  // data ko local mai save krne ke liye
  useEffect(() => {
    localStorage.setItem("userList", JSON.stringify(data));
  }, [data]);
  


  const submitHandler = (e) => {
    e.preventDefault();

    if (!name || !email || !password || !phonenumber || !image) {
      alert("All fields are required!");
      return;
    }

    if (editId) {
      // 🔹 If Editing, Update the User
      const updatedData = data.map((user) =>
        user.id === editId ? { id: editId, name, email, phonenumber, password, image } : user
      )
      setData(updatedData);
  setEditId(null);


  //data filled hone ke bd black hojayega inputs
  setName("");
  setEmail("");
  setImage("");
  setPassword("");
  setPhonenumber("");
    }
    else {

      
      // setData([{name,email,password,phonenumber}]); // isse ye second time mai data fill krne par over right krdega starting se data save ni hoga bs current user ka data show krega pehle vala over right krdega
      setData([
      ...data,
      { id: data.length + 1, name, email, phonenumber, password, image },
    ]); // ise pora data save hoga users ka over right nhi hoga
    // console.log(name, email, password, phonenumber, image);

    setName("");
    setEmail("");
    setImage("");
    setPassword("");
    setPhonenumber("");
  };
}

const editHandler = (user) => {
  setName(user.name);
  setEmail(user.email);
  setImage(user.image);
  setPassword(user.password);
  setPhonenumber(user.phonenumber);
  setEditId(user.id); 
};

  const deleteHandler = (id) => {
    // console.log(id);

    const newData = data.filter((elem) => elem.id != id);
    //jab filter use hota hai agr id true hogi to new array m save krva dega or false hoga to nhi krvayega
    setData(newData);
  };

  return (
    <div className="w-full min-h-screen flex flex-col md:flex-row">
      {/* Left Section - Form */}
      <div className="w-full md:w-1/3 h-auto flex justify-center items-center bg-zinc-600 overflow-auto ">
        <div className="bg-gray-800 text-white rounded-lg p-6 w-[90%] sm:w-[70%] md:w-[60%] shadow-md">
          <h1 className="text-center text-2xl font-semibold">Create User</h1>
          <form className="mt-4 space-y-3" onSubmit={submitHandler}>
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Enter Name"
              className="w-full bg-gray-700 p-2 rounded"
            />
            <input
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Enter Email"
              className="w-full bg-gray-700 p-2 rounded"
            />
            <input
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Enter Password"
              className="w-full bg-gray-700 p-2 rounded"
            />
            <input
              required
              value={image}
              onChange={(e) => setImage(e.target.value)}
              type="text"
              placeholder="Enter Image URL"
              className="w-full bg-gray-700 p-2 rounded"
            />
            <input
              required
              value={phonenumber}
              onChange={(e) => setPhonenumber(e.target.value)}
              type="text"
              placeholder="Enter Phone Number"
              className="w-full bg-gray-700 p-2 rounded"
            />

<button
  type="submit"
  className={`w-full py-2 rounded transition ${editId ? "bg-blue-600 hover:bg-blue-700" : "bg-green-600 hover:bg-green-700"}`}
>
  {editId ? "Update User Card" : "Create User Card"}
</button>
          </form>
        </div>
      </div>

      {/* Right Section - Cards */}
      <div className="right flex flex-wrap gap-4 sm:gap-6 bg-zinc-700 w-full md:w-2/3 p-5 justify-center h-auto min-h-screen">
        {data.map((elem, index) => (
          <div
            key={index}
            className="user-card w-full sm:w-[70%] md:w-[45%] lg:w-[30%] xl:w-[25%] h-auto bg-zinc-900 text-white flex flex-col items-center justify-center rounded-lg p-6 shadow-lg gap-2">
            <img
              src={elem.image}
              alt="Image Not Found"
              className="w-24 h-24 sm:w-20 sm:h-20 rounded-full object-cover mt-3"
            />

            <h1 className="text-lg font-semibold">{elem.name}</h1>
            <p className="text-sm">{elem.email}</p>
            <p className="text-sm">Password : {elem.password}</p>

            <p className="text-sm">Contact : {elem.phonenumber}</p>
            <button
                onClick={() => editHandler(elem)}
                className="w-1/2 text-xs bg-blue-700 py-1 rounded hover:bg-blue-800 transition">
                Edit
              </button>
            <button
              onClick={() => deleteHandler(elem.id)}
              className="w-full text-xs bg-red-700 py-1 mt-3 rounded hover:bg-red-800 transition mb-5">
              Delete Card
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
