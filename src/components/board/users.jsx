import React, { useEffect,useState } from "react";
import "./priority.css"
import Cards from "../cards/cards.jsx"
import "./users.css"

  const Users = (props) => {
    // console.log(props);
    const [isLoading, setIsLoading] = useState(true);
    const [namemap,setNamemap]= useState({})
    const [arrayOfEmptyArrays, setArrayOfEmptyArrays] = useState([]);
    useEffect(() => {
      var len = props.users.length;
      setArrayOfEmptyArrays(Array(len).fill([]));
      var map = {};
      const tmpnamemap = {};
      var tmp = 0;
      props.users.forEach((e) => {
        map[e.id] = tmp;
        tmpnamemap[e.id]= e.name;
        tmp++;
      });
      setNamemap(tmpnamemap);
      props.tickets.forEach((e) => {
        var x = map[e.userId];
        setArrayOfEmptyArrays((prevArrays) => {
            const newArray = [...prevArrays];
            newArray[x] = [...newArray[x], e];
            return newArray;
          });
      });
      setIsLoading(false);
    }, [props]);
    
    if (isLoading) {
        return <div>Loading...</div>;
    }
    return (
        <div className='container'>
           {
            arrayOfEmptyArrays.map((e)=>{
                return(
                <div>
                <div style={{display:"flex"}}>
                <div className="userName">{namemap[e[0].userId]}</div>
                <div className="userName2">{e.length}</div>
                </div>
                <div className='wrapper'>
                { <Cards {...{"tickets":e,"users":props.users}}/>}
                </div>
                </div>
                )
            })
           } 
        </div>
    );
};

export default Users;