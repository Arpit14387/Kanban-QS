import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import Priority from "./components/board/priority.jsx"
import Status from "./components/board/status.jsx"
import Users from "./components/board/users.jsx"

function App() {
const [isLoading, setIsLoading] = useState(true);
const [data,setData]=useState({});
const [selectedGrouping, setSelectedGrouping] = useState(localStorage.getItem("groupBy")||"Priority");  //defatut Grouping by Priority
const [selectedOrdering, setSelectedOrdering] = useState(localStorage.getItem("orderBy")||"Priority");  //defatut Ordering by Priority

useEffect(()=>{
  axios.get("https://api.quicksell.co/v1/internal/frontend-assignment").then((data)=> {setData(data.data); setIsLoading(false);});
},[])
useEffect(() => {
  const handleOutsideClick = (e) => {
    const modal = document.getElementById('selection');
    const btn = document.getElementById('select');
    if (modal && !modal.contains(e.target)&&btn&&!btn.contains(e.target)) {
    document.getElementById("selection").style.display="none";
    }
  };
  document.addEventListener('click', handleOutsideClick);
}, []);
useEffect(() => {
  if (data && data.tickets) {
    changeOrdering(selectedOrdering);
  }
}, [data]);

const changeOrdering=async (e)=>{
    try{
    localStorage.setItem("orderBy",e);
    setSelectedOrdering(e);
    if(e=="Priority")
    {
      const sorted = [...data.tickets].sort((a, b) => b.priority - a.priority);
      if(!(JSON.stringify(sorted) === JSON.stringify(data.tickets)))
      {setData({
      "tickets":sorted,
      "users":data.users
      });}
    }
    else
    {
      const sorted = [...data.tickets].sort((a, b) => a.title.localeCompare(b.title));
      if(!(JSON.stringify(sorted) === JSON.stringify(data.tickets)))
      setData({
      "tickets":sorted,
      "users":data.users
      });
    }}
    catch(error)
    {
      console.log(error);
    }
  }
  const changeGrouping = (e) => {
    setSelectedGrouping(e);
    localStorage.setItem("groupBy",e);
  };
  const closeModal=()=> {
    var x = document.getElementById("selection");
    if (x.style.display === "none") {
    x.style.display = "inherit";
  } else {
    x.style.display = "none";
  }
  }
if (isLoading) {
  return <div>Loading...</div>;
}
  return (
    <div id="main">
      <div>
        <nav id="navbar">
        <div className="display-btn" style={{display:"flex"}}>
        <img id="settings-img" src="./settings.png"></img>
        <p id="select" onClick={closeModal}>Display</p>
        </div>
        </nav>
        <div id="selection" style={{"display": "none"}} className="modal">
        <div className="modal-content">
          <div className="group">
            <div className="grouping">Grouping</div>
            <select id="selectGrouping" value={selectedGrouping} onChange={(e) => changeGrouping(e.target.value)}>
            <option value="Priority">Priority</option>
            <option value="Status">Status</option>
            <option value="Users">User Name</option>
          </select>
          </div>
          <div className="order">
            <div className="ordering">Ordering</div>
            <select id="selectOrdering" value={selectedOrdering} onChange={(e) => changeOrdering(e.target.value)}>
            <option value="Priority">Priority</option>
            <option value="Title">Title</option>
          </select>
          </div>
        </div>
        </div>
      </div>
      <div id="cards">
      {
        selectedGrouping === "Users" ? (
        <Users id="users" {...data} />) : 
        selectedGrouping === "Priority" ? (
        <Priority id="priority" {...data} />) : 
        selectedGrouping === "Status" ? (
        <Status id="status" {...data} />) : (
        <Priority id="priority" {...data} />)
      }
      </div>
    </div>
  );
}

export default App
