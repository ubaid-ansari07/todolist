import dummyJson from "./dummyJson";
import React, { Component } from 'react'

export default class App extends Component {
  constructor(){
    super();

    this.state={
      todolist:dummyJson,
      task:'',
      active:'Active',
      deactive:'Deactive'
    }
  }
  add=(e)=>{
    e.preventDefault();
    let obj={
      task:this.taskField.value,
      date:this.dateField.value,
      pid:this.pidField.value,
      status:'active'
    }
    this.setState({todolist:[...this.state.todolist,obj]})
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <form className="form-group" onSubmit={this.add}>
           <div className="col-md-6 m-auto mt-5">
            <label htmlFor="">Task</label>
           <input type="text" name="" value={this.tast} onChange={e=>this.setState({task:e.target.value})} ref={(obj)=>this.taskField = obj} className="form-control"/>
           </div>
           <div className="col-md-6 m-auto mt-5">
            <label htmlFor="">Date</label>
           <input type="date" name="" value={this.date}  ref={(obj)=>this.dateField= obj} className="form-control"/>
           </div>
           <div className="col-md-6 m-auto mt-5">
            <label htmlFor="">Priority</label>
              <select className="form-control" ref={(obj)=>this.pidField= obj}>
                <option value="3">Low</option>
                <option value="2">Medium</option>
                <option value="1">High</option>
              </select>
           </div>
           <div className="col-md-6 m-auto mt-5">
              <button type="submit" className="btn btn-primary">Add Task</button>
           </div>
          </form>
        </div>
        <div className="row">
          <div className="col-2">
              <button type="button" style={{backgroundColor:'red'}} className='btn btn-danger'>{this.state.active}:<span></span></button>
          </div>
          <div className="col-2">
              <button type="button" style={{backgroundColor:'green'}} className='btn btn-danger'>{this.state.deactive}:<span></span></button>
          </div>
        </div>
        <div className="row">
          <table className="table text-center">
            <thead>
                <tr>
                  <th>Sno.</th>
                  <th>Task</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {this.state.todolist
                .sort((a,b)=>{
                  return a.pid-b.pid
                })
                .map((obj,index)=>{
                  let bgcolor= obj.pid==1?'red':obj.pid==2?'yellow':'green'
                  let color= obj.pid==1?'white':obj.pid==2?'black':'black'
                  return <tr key={index} style={{backgroundColor:bgcolor,color:color}}>
                    <td>{index+1}</td>
                    <td>{obj.task}</td>
                    <td>{obj.date}</td>
                    <td>{obj.status === 'active'?<button value={'active'} className="btn btn-danger">Active</button>:''}</td>
                  </tr>
                })}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

