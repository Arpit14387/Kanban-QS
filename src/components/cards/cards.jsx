import React, { useState, useEffect } from 'react';
import './cards.css';

const Cards = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [userMap, setUserMap] = useState({});
    const [availableMap, setAvailableMap] = useState({});
    const [sortedTickets, setSortedTickets] = useState([]);
    const [localStorageTasks, setLocalStorageTasks] = useState(localStorage.getItem("tasks"));

    useEffect(() => {
            if (props.users && props.users.length > 0) {
              const tmp = [...props.tickets];
              setSortedTickets(tmp);
              const tempMap = {},tmpavlmap={};
              props.users.forEach((user) => {
                let initials = user.name.match(/\b\w/g) || [];
                initials=((initials.shift() || ' ') + (initials.pop() || ' ')).toUpperCase();
                tempMap[user.id] = initials;
                tmpavlmap[user.id]=user.available; 
              });
              setUserMap(tempMap);
              setAvailableMap(tmpavlmap);
            }
            setIsLoading(false);
    }, [props,localStorageTasks]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            {sortedTickets.map((e)=>{
                return (
                    <div className="task-card">
                        <div className="task-header">
                           <div className="task-id">{e.id}</div>
                           <div id="name-initials" style={{backgroundColor: (availableMap[e.userId]) ? "green" : "rgb(218, 185, 32)"}} className="task-initials" >{userMap[e.userId]}</div>
                        </div>
                        <div className='title'>
                        {
                           e.status === "Todo" ? (
                           <img className='logo' title='Todo' src='./todo.png'></img>) : 
                           e.status === "In progress" ? (
                           <img className='logo' title='In progress' src='./progress.png'></img>) : 
                           e.status === "Done" ? (
                           <img className='logo' title='Done' src='./done.png'></img>) : (
                           e.status === "Cancelled" ? (
                           <img className='logo' title='cancelled' src='./cancelled.png'></img>):(
                           <img className='logo' title='Backlog' src='./backlog.png'></img>))
                        }
                        <div className="task-title">{e.title}</div>
                        </div>
                        <div className='feature-request'>
                            {
                                e.tag[0]!="" ?(
                                    <div style={{"display":"flex"}}>
                                        {
                                          e.priority === 4 ? (
                                          <img className='logo-feature' style={{marginBottom:"5px"}} title='Urgent Priority' src='./urgent.png'></img>) : 
                                          e.priority === 3 ? (
                                          <img className='logo-feature' title='High priority' src='./high_p.png'></img>) : 
                                          e.priority === 2 ? (
                                          <img className='logo-feature' title='Medium priority' src='./medium.png'></img>) : (
                                          e.priority === 1 ? (
                                          <img className='logo-feature' title='Low priority' src='./low_p.png'></img>):(
                                          <img className='logo-feature' title='No priority' src='./dots.png'></img>))
                                        }
                                        <img className='label-image' src="./circle.png"></img>
                                        <div className="task-label">{e.tag[0]}</div>
                                    </div>
                                
                                ):(
                                    <div></div>
                                )
                            }
                        </div>
                    </div>
                )
            })}
        </div>
    );
};

export default Cards;
