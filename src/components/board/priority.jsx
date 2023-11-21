import React, { useEffect,useState } from "react";
import "./priority.css"
import Cards from "../cards/cards.jsx"
const Priority = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    var urgentArr=[],highPriorityArr=[],mediumPriorityArr=[],lowPriorityArr=[],noPriorityArr=[];
    const [urgent,setUrgent]=useState({});
    const [high,setHigh]=useState({});
    const [medium,setMedium]=useState({});
    const [low,setLow]=useState({});
    const [none,setNone]=useState({});
    useEffect(() => {
        urgentArr = []; highPriorityArr=[]; mediumPriorityArr=[]; lowPriorityArr=[]; noPriorityArr=[];
        props.tickets.map((e)=>{
            if(e.priority===4) urgentArr.push(e);
            else if(e.priority===3) highPriorityArr.push(e);
            else if(e.priority===2) mediumPriorityArr.push(e);
            else if(e.priority===1) lowPriorityArr.push(e);
            else if(e.priority===0) noPriorityArr.push(e);
        })
        setUrgent({
            "tickets": urgentArr,
            "users": props.users
        });
        setHigh({
            "tickets": highPriorityArr,
            "users": props.users
        });
        setMedium({
            "tickets": mediumPriorityArr,
            "users": props.users
        });
        setLow({
            "tickets": lowPriorityArr,
            "users": props.users
        });
        setNone({
            "tickets": noPriorityArr,
            "users": props.users
        });
        setIsLoading(false);
    }, [props]);
    
    if (isLoading) {
        return <div>Loading...</div>;
    }
    return (
        <div className='container'>
            <div className=''>
                <div className="card-top">
                <img className="priority-icons" src="./urgent.png"></img>
                <div className="userName">Urgent</div>
                <div className="userName2">{urgent.tickets.length}</div>
                </div>
                <div className='wrapper'>
                    { <Cards {...urgent}/>}
                </div>
            </div>

            <div className=''>
            <div className="card-top">
                <img className="priority-icons" src="./high_p.png"></img>
                <div className="userName">High</div>
                <div className="userName2">{high.tickets.length}</div>
                </div>
                <div className='wrapper'>
                   { <Cards {...high}/>}
                </div>
            </div>

            <div className=''>
            <div className="card-top">
                <img className="priority-icons" src="./medium.png"></img>
                <div className="userName">Medium</div>
                <div className="userName2">{medium.tickets.length}</div>
                </div>
                <div className='wrapper'>
                   { <Cards {...medium}/>}  
                </div>
            </div>
            <div className=''>
            <div className="card-top">
                <img className="priority-icons" src="./low_p.png"></img>
                <div className="userName">Low</div>
                <div className="userName2">{low.tickets.length}</div>
                </div>
                <div className='wrapper'>
                   { <Cards {...low}/>}
                </div>
            </div>
            <div className=''>
            <div className="card-top">
                <img className="priority-icons" src="./dots.png"></img>
                <div className="userName">No Priority</div>
                <div className="userName2">{none.tickets.length}</div>
                </div>
                <div className='wrapper'>
                   { <Cards {...none}/>}
                </div>
            </div>
        </div>
    );
};

export default Priority;