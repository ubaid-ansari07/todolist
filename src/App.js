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
// export default class App extends Component {
//   constructor(){
//     super();

//     this.state={
//       todolist:dummyJson,
//       active:'Active',
//       deactive:'Deactive',
//       activeQty:'',
//       deactiveQty:'',
//     }
//   }
//   activeshow(){
//     let btnac=document.getElementById('btnac');
//     let btndeac= document.getElementById('btndeac')
//     btndeac.style.visibility='hidden'
//     let arr = this.state.todolist.map(obj=>{
//       if(obj.status === 'active')
//         return obj;
//     })

//     this.setState({todolist:arr})
//   }
//   componentDidMount(){
    
//     this.activeshow()
//     this.changeQty()
//     }
//   changeQty(){
//     let ac=0;
//     let deac=0;
//     this.state.todolist.map(obj=>{
//       if(obj.status === 'active')
//         ac++;
//       else
//         deac++;
//     })
//     this.setState({activeQty:ac,deactiveQty:deac})
//   }
//   changestatustodeactive(status,id){
//     let arr=[]
//     if(status === 'deactive'){
//       arr=this.state.todolist.map(obj=>{
//         if(obj.id === id){
//           obj.status='active'
//         }this.componentDidMount()
//         return obj
//       })
//     }
//     console.log(arr);
//   }
//   changestatustoactive(status,id){
//     let arr=[]
//     if(status === 'active'){
//       arr=this.state.todolist.map(obj=>{
//         if(obj.id === id){
//           obj.status='deactive'
//         }this.componentDidMount()
//         return obj
//       })
//     }
//     this.setState({todolist:arr})
//     this.componentDidMount()
//   }
//   add=(e)=>{
//     e.preventDefault();
//     let obj={<h1>hello</h1>
//       task:this.taskField.value,
//       date:this.dateField.value,
//       pid:this.pidField.value,
//       status:'active'
//     }
//     this.setState({todolist:[...this.state.todolist,obj]})
//   }
//   render() {
//     return (
//       <div className="container">
//         <div className="row">
//           <form className="form-group" onSubmit={this.add}>
//            <div className="col-md-6 m-auto mt-2">
//             <label htmlFor="">Task</label>
//            <input type="text" defaultValue="" ref={(obj)=>this.taskField = obj} className="form-control"/>
//            </div>
//            <div className="col-md-6 m-auto mt-2">
//             <label htmlFor="">Date</label>
//            <input type="date" name="" value={this.date}  ref={(obj)=>this.dateField= obj} className="form-control"/>
//            </div>
//            <div className="col-md-6 m-auto mt-2">
//             <label htmlFor="">Priority</label>
//               <select className="form-control" ref={(obj)=>this.pidField= obj}>
//                 <option value="3">Low</option>
//                 <option value="2">Medium</option>
//                 <option value="1">High</option>
//               </select>
//            </div>
//            <div className="col-md-6 m-auto mt-2">
//               <button type="submit" className="btn btn-primary">Add Task</button>
//            </div>
//           </form>
//         </div>
//         <div className="row mt-5">
//           <div className="col-2">
//               <button type="button" style={{backgroundColor:'red'}} className='btn btn-danger'>{this.state.active}:<span>{this.state.activeQty}</span></button>
//           </div>
//           <div className="col-2">
//               <button type="button" style={{backgroundColor:'green'}} className='btn btn-danger'>{this.state.deactive}:<span>{this.state.deactiveQty}</span></button>
//           </div>
//         </div>
//         <div className="row mt-5">
//           <table className="table text-center">import dummyJson from "./dummyJson";
// import React, { Component } from 'react'

// export default class App extends Component {
//   constructor(){
//     super();

//     this.state={
//       todolist:dummyJson,
//       active:'Active',
//       deactive:'Deactive',
//       activeQty:'',
//       deactiveQty:'',
//     }
//   }
//   activeshow(){
//     let btnac=document.getElementById('btnac');
//     let btndeac= document.getElementById('btndeac')
//     btndeac.style.visibility='hidden'
//     let arr = this.state.todolist.map(obj=>{
//       if(obj.status === 'active')
//         return obj;
//     })

//     this.setState({todolist:arr})
//   }
//   componentDidMount(){
    
//     this.activeshow()
//     this.changeQty()
//     }
//   changeQty(){
//     let ac=0;
//     let deac=0;
//     this.state.todolist.map(obj=>{
//       if(obj.status === 'active')
//         ac++;
//       else
//         deac++;
//     })
//     this.setState({activeQty:ac,deactiveQty:deac})
//   }
//   changestatustodeactive(status,id){
//     let arr=[]
//     if(status === 'deactive'){
//       arr=this.state.todolist.map(obj=>{
//         if(obj.id === id){
//           obj.status='active'
//         }this.componentDidMount()
//         return obj
//       })
//     }
//     console.log(arr);
//   }
//   changestatustoactive(status,id){
//     let arr=[]
//     if(status === 'active'){
//       arr=this.state.todolist.map(obj=>{
//         if(obj.id === id){
//           obj.status='deactive'
//         }this.componentDidMount()
//         return obj
//       })
//     }
//     this.setState({todolist:arr})
//     this.componentDidMount()
//   }
//   add=(e)=>{
//     e.preventDefault();
//     let obj={
//       task:this.taskField.value,
//       date:this.dateField.value,
//       pid:this.pidField.value,
//       status:'active'
//     }
//     this.setState({todolist:[...this.state.todolist,obj]})
//   }
//   render() {
//     return (
//       <div className="container">
//         <div className="row">
//           <form className="form-group" onSubmit={this.add}>
//            <div className="col-md-6 m-auto mt-2">
//             <label htmlFor="">Task</label>
//            <input type="text" defaultValue="" ref={(obj)=>this.taskField = obj} className="form-control"/>
//            </div>
//            <div className="col-md-6 m-auto mt-2">
//             <label htmlFor="">Date</label>
//            <input type="date" name="" value={this.date}  ref={(obj)=>this.dateField= obj} className="form-control"/>
//            </div>
//            <div className="col-md-6 m-auto mt-2">
//             <label htmlFor="">Priority</label>
//               <select className="form-control" ref={(obj)=>this.pidField= obj}>
//                 <option value="3">Low</option>
//                 <option value="2">Medium</option>
//                 <option value="1">High</option>
//               </select>
//            </div>
//            <div className="col-md-6 m-auto mt-2">
//               <button type="submit" className="btn btn-primary">Add Task</button>
//            </div>
//           </form>
//         </div>
//         <div className="row mt-5">
//           <div className="col-2">
//               <button type="button" style={{backgroundColor:'red'}} className='btn btn-danger'>{this.state.active}:<span>{this.state.activeQty}</span></button>
//           </div>
//           <div className="col-2">
//               <button type="button" style={{backgroundColor:'green'}} className='btn btn-danger'>{this.state.deactive}:<span>{this.state.deactiveQty}</span></button>
//           </div>
//         </div>
//         <div className="row mt-5">
//           <table className="table text-center">
//             <thead>
//                 <tr style={{backgroundColor:'darkgray',color:'black'}}>
//                   <th>Sno.</th>
//                   <th>Task</th>
//                   <th>Date</th>
//                   <th>Status</th>
//                 </tr>
//             </thead>
//             <tbody>
//                 {this.state.todolist
//                 .sort((a,b)=>{
//                   return a.pid-b.pid
//                 })
//                 .map((obj,index)=>{
//                   let bgcolor= obj.pid==1?'#F96167':obj.pid==2?'#FBEAEB':'#2F3C7E   '
//                   let color= obj.pid==1?'white':obj.pid==2?'black':'black'
//                   return <tr key={index} style={{backgroundColor:bgcolor,color}}>
//                     <td>{index+1}</td>
//                     <td>{obj.task}</td>
//                     <td>{obj.date}</td>
//                     <td>
//                       {obj.status == "active" ?
//                       <button type="" id="btnac" onClick={()=>{this.changestatustoactive(obj.status,obj.id)}} className="btn btn-danger">{obj.status}</button>
//                       :
//                       <button type="" id="btndeac" onClick={()=>{this.changestatustodeactive(obj.status,obj.id)}} className="btn btn-danger">{obj.status}</button>
//                       }
//                     </td>
//                   </tr>
//                 })}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     )
//   }
// }


//             <thead>
//                 <tr style={{backgroundColor:'darkgray',color:'black'}}>
//                   <th>Sno.</th>
//                   <th>Task</th>
//                   <th>Date</th>
//                   <th>Status</th>
//                 </tr>
//             </thead>
//             <tbody>
//                 {this.state.todolist
//                 .sort((a,b)=>{
//                   return a.pid-b.pid
//                 })
//                 .map((obj,index)=>{
//                   let bgcolor= obj.pid==1?'#F96167':obj.pid==2?'#FBEAEB':'#2F3C7E   '
//                   let color= obj.pid==1?'white':obj.pid==2?'black':'black'
//                   return <tr key={index} style={{backgroundColor:bgcolor,color}}>
//                     <td>{index+1}</td>
//                     <td>{obj.task}</td>
//                     <td>{obj.date}</td>
//                     <td>
//                       {obj.status == "active" ?
//                       <button type="" id="btnac" onClick={()=>{this.changestatustoactive(obj.status,obj.id)}} className="btn btn-danger">{obj.status}</button>
//                       :
//                       <button type="" id="btndeac" onClick={()=>{this.changestatustodeactive(obj.status,obj.id)}} className="btn btn-danger">{obj.status}</button>
//                       }
//                     </td>
//                   </tr>
//                 })}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     )
//   }
// }

