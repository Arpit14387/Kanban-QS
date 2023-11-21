import React, { useEffect,useState } from "react";
import "./priority.css"
import Cards from "../cards/cards.jsx"
const Status = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    var backlogArr=[],todoArr=[],progressArr=[],doneArr=[],cancelledArr=[];
    const [backlog,setBacklog]=useState({});
    const [todo,setTodo]=useState({});
    const [progress,setProgress]=useState({});
    const [done,setDone]=useState({});
    const [cancelled,setCancelled]=useState({});
    useEffect(() => {
        backlogArr = []; todoArr=[]; progressArr=[]; doneArr=[]; cancelledArr=[];
        props.tickets.map((e)=>{
            if(e.status=="Backlog") backlogArr.push(e);
            else if(e.status==="Todo") todoArr.push(e);
            else if(e.status==="In progress") progressArr.push(e);
            else if(e.status==="Done") doneArr.push(e);
            else if(e.status==="Cancelled") cancelledArr.push(e);
        })
        setBacklog({
            "tickets": backlogArr,
            "users": props.users
        });
        setTodo({
            "tickets": todoArr,
            "users": props.users
        });
        setProgress({
            "tickets": progressArr,
            "users": props.users
        });
        setDone({
            "tickets": doneArr,
            "users": props.users
        });
        setCancelled({
            "tickets": cancelledArr,
            "users": props.users
        });
        setIsLoading(false);
    }, [props]);
    
    if (isLoading) {
        return <div>Loading...</div>;
    }
    return (
        <div className='container'>
            <div>
            <div className="card-top">
                <img className="priority-icons" src="./urgent.png"></img>
                <div className="userName">Backlog</div>
                <div className="userName2">{backlog.tickets.length}</div>
                </div>
                <div className='wrapper'>
                    { <Cards {...backlog}/>}
                </div>
            </div>
            <div>
                <div className="card-top">
                <img className="priority-icons" src="./todo.png"></img>
                <div className="userName">Todo</div>
                <div className="userName2">{todo.tickets.length}</div>
                </div>
                <div className='wrapper'>
                   { <Cards {...todo}/>}
                </div>
            </div>
            <div>
            <div className="card-top">
                <img className="priority-icons" src="./progress.png"></img>
                <div className="userName">In Progress</div>
                <div className="userName2">{progress.tickets.length}</div>
                </div>
                <div className='wrapper'>
                   { <Cards {...progress}/>}  
                </div>
            </div>
            <div>
            <div className="card-top">
                <img className="priority-icons" src="./done.png"></img>
                <div className="userName">Done</div>
                <div className="userName2">{done.tickets.length}</div>
                </div>
                <div className='wrapper'>
                   { <Cards {...done}/>}
                </div>
            </div>
            <div>
            <div className="card-top">
                <img className="priority-icons" src="./cancelled.png"></img>
                <div className="userName">Cancelled</div>
                <div className="userName2">{cancelled.tickets.length}</div>
                </div>
                <div className='wrapper'>
                   { <Cards {...cancelled}/>}
                </div>
            </div>
        </div>
    );
};

export default Status;