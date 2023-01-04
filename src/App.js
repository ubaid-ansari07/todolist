// import dummyJson from "./dummyJson";
// import React, { Component } from 'react'

import { useEffect, useRef, useState } from "react"
import dummyJson from "./dummyJson"


export default ()=>{
  const [tasklist,setTasklist] = useState(dummyJson);
  const [defaultTaskStatus,setDefaultTaskStatus] = useState('active')
  const [priority,setPriority] = useState([{id:1,pr:'High'},{id:2,pr:'Medium'},{id:3,pr:'Low'}])
  const [activeQty,setActiveQty] = useState(0);
  const [deActiveQty,setDeactiveQty] = useState(0);
  const [activeBtn,setActiveBtn] = useState(true);
  const [deActiveBtn,setDeactiveBtn] = useState(false);
  let taskField = useRef('');
  let priorityField = useRef(0);

  const changeStatus=(status,id)=>{
    let index= tasklist.findIndex(obj=>obj.id == id)
    let newObj = tasklist[index];
    newObj.status = status
    tasklist.splice(index,1);
    setTasklist([...tasklist,newObj])
  }
  useEffect(()=>{
    console.log(tasklist);
    let activeQty = tasklist.filter(task=>task.status === 'active' ).length;
    let deActiveQty = tasklist.length-activeQty

    setActiveQty(activeQty)
    setDeactiveQty(deActiveQty)
  },[tasklist])

  const addTask = ()=>{
    let date= new Date()
    let ids = tasklist.map(task=>task.id);
    let newObj = {
      id : Math.max(...ids)+1,
      task : taskField.current.value,
      date : date.getDay()+'-'+(date.getMonth()+1)+'-'+date.getFullYear(),
      pid : priorityField.current.value*1,
      status : 'active'
    }
    setTasklist([...tasklist,newObj])
  }
  return (
    <div className="container">
      <center><h1>TODO List</h1></center>
      <div className="row mt-5">
          <div className="col-md-6 form-group" >
            <input type="text" placeholder="Enter task name" className="form-control" ref={taskField}/>
          </div>
          <div className="col-md-6 form-group" >
            <select className="form-select" ref={priorityField}>
              {
                priority.map((pr,index)=><option key={index} value={pr.id}>{pr.pr}</option>)
              }
            </select>
          </div>
      </div>
      <div className="row mt-5">
        <div className="col-md-3">
          <button type="" className="btn btn-success" onClick={addTask}> Add</button>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-md-3">
          <button type="button" disabled={activeBtn} className="btn btn-success" onClick={()=>{setDefaultTaskStatus('active');setActiveBtn(true);setDeactiveBtn(false)}}>Active ({activeQty})</button>
          <button type="button" disabled={deActiveBtn} className="btn btn-primary ml-3" onClick={()=>{setDefaultTaskStatus('deactive');setActiveBtn(false);setDeactiveBtn(true)}}>Deactive ({deActiveQty})</button>
        </div>
      </div>
      <table className="table">
        <thead>
            <tr>
              <th>S No.</th>
              <th>Task</th>
              <th>Date</th>
              <th>Priority</th>
              <th>Status</th>
            </tr>
        </thead>
        <tbody>
          {tasklist.sort((a,b)=>a.pid-b.pid)
          .filter(task=>task.status === defaultTaskStatus)
          .map((task,index)=><tr key={index} style={{backgroundColor:task.pid === 1 ? "tomato" : task.pid === 2 ? "lightgreen" : "grey"}}>
            <td>{index+1}</td>
            <td>{task.task}</td>
            <td>{task.date}</td>
            <td>
              {task.pid === 1 ?
                "High" : task.pid===2 ?
                "Medium" : "Low"
              }
            </td>
            <td>{
              defaultTaskStatus === 'active' ? 
              <button type="" className="btn btn-danger" onClick={()=>changeStatus('deactive',task.id)}>Deactive</button> :
              <button type="" className="btn btn-danger" onClick={()=>changeStatus('active',task.id)}>Active</button>
              }</td>
          </tr>)
          
          }
        </tbody>
      </table>
    </div>
  )
}