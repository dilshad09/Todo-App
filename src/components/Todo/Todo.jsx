import React, { useEffect, useState } from "react"
import './Todo.css'

const getDataFromLS = ()=>{
    const list = localStorage.getItem("myTodoList")
    if(list){
        return JSON.parse(list);
    }else{
        return []
    }
}
export const Todo = ()=>{
    const [addData, setAddData] = useState("")
    const [items, setItems] = useState(getDataFromLS())
    const addItems = ()=>{
        if(!addData){
            alert("please fill the data first")
        }else{
            const myInputData = {
                id:Date.now().toString(),
                name:addData
            }
            setItems([...items, myInputData])
            console.log("dis")
            setAddData("")
        }
    }
    // how to delete items
     const  deleteItem = (index)=>{
        let updatedItems =  items.filter((el)=>{
             return el.id !== index
         })
         setItems(updatedItems)
     }

     // remove all elements
     const removeAll = ()=>{
         setItems([])
     }
     // add data on local storage
    useEffect(()=>{
        localStorage.setItem("myTodoList", JSON.stringify(items))
    },[items])
    return <>
    <div className="main-div">
        <div className="child-div">
            <figure>
                <img src="https://is2-ssl.mzstatic.com/image/thumb/Purple115/v4/87/1e/9b/871e9b4b-d811-8955-e994-ee96775729be/source/512x512bb.jpg" alt="" />
                <figcaption>Add your Todo List Here ✌</figcaption>
            </figure>
            <div className="addItems">
                <input type="text" value={addData || ""} onChange={(e)=>setAddData(e.target.value)} placeholder="✍ Add Items..." className="form-control" />
                <i className="fa fa-plus add-btn" onClick={()=>{addItems()}}></i>
            </div>
            {/* show our items */}

            <div className="showItems">
                {items.map((el)=>{
                    return (
                    <div className="eachItem" key={el.id}>
                        <h3>{el.name}</h3>
                        <div className="todo-btn">
                        <i className="far fa-edit add-btn"></i>
                        <i className="fa fa-trash-alt add-btn" onClick={()=>{
                            deleteItem(el.id)
                        }}></i>
                        </div>
                    </div>
                    )
                })}
            </div>
            {/* remove all btn*/}
            <div className="showItems">
                <button className="btn effect04" data-sm-link-text="Remove All" onClick={removeAll}><span>CHECK LIST</span></button>
            </div>
        </div>
    </div>
    
    </>
}