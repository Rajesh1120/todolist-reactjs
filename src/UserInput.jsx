import { useState } from "react";
import {v4 as uuidv4 } from "uuid";

export default function UserInput(){

    const [eid,setid]=useState("")
    const [inputValue,setInputValue]=useState("");
    const [isEditing,setEditing]=useState(false)
    const [listOfTask,setListofTask]=useState([])
    function handleChange(e){
        setInputValue(e.target.value)
    }
    function handleClick(e){
            setListofTask((prevList) => ([
                ...prevList, {id:uuidv4(),title:inputValue}
            ]))
        setInputValue("")
    }
    function handleDelete(id){
        
        const deletetask=listOfTask.filter( todo => todo.id !== id)
        setListofTask(deletetask)
    }

    function handleEdit(id){
        const edittask=listOfTask.findIndex(todo => todo.id === id)
        setInputValue(listOfTask[edittask].title)
        setid(id)
        setEditing(true)
    }


    function handleSubmitEdit() {

        const editIndex = listOfTask.findIndex(todo => todo.id ===eid);
        const updatedTask = {
            ...listOfTask[editIndex],
            title: inputValue
        };

        const updatedTaskList = [...listOfTask];
        updatedTaskList[editIndex] = updatedTask;
        setListofTask(updatedTaskList);
        setEditing(false);
        setInputValue("");
    }
    
    return(
        <>
        <div className="container">
            <div className="Input-container">
                <h3>Daily task..</h3>
                <input type='text' placeholder="enter your task" autoFocus value={inputValue} onChange={(e) => handleChange(e)} required/>
                {!isEditing?<button onClick={handleClick}>Add</button>:<button onClick={handleSubmitEdit}>Edit</button>}
            </div>
            <div className="ListofTask">
                        {listOfTask.map((todo,index)=>
                        <ul key={index}>
                            <li>{todo.title}
                                <button onClick={() => handleEdit(todo.id)}>Edit</button>
                                <button onClick={()=>handleDelete(todo.id)}>Delete</button>
                            </li>
                        </ul>
                ) }
            </div>
        </div>
        </>
    )
}