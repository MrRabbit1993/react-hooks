import React, { useState, useMemo, useEffect, memo, useCallback, useRef } from 'react';
import "./App.css"
import {createSet,createAdd,createRemove,createToggle} from "./action"
let idIns = Date.now();
const TO_KEY= "_$KEY_";
// {
  // add:dispath(add(1))
  // remove:dispath(remove(1))
// }
//自我实现绑定
function bindActionCreators(actionCreators,dispatch){//创建一个绑定dispath函数
  const res = {}
  for(let key in actionCreators){
    res[key] = function(...args){
      const actionCreator = actionCreators[key];//得到每个函数
      const action = actionCreator(...args);//调用得到返回
      dispatch(action)//触发派发
    }
  }
  return res
}
function App() {
  const [todos, setTodos] = useState([]);
  // const addTodo = useCallback((todo) => { setTodos(todos => [...todos, todo]) }, [])
  // const removeTodo = useCallback((id) => { setTodos(todos => todos.filter(_ => _.id !== id)) }, [])
  // const toggleTodo = useCallback((id) => {
  //   setTodos(todos => todos.map(todo => {
  //     return todo.id === id ? { ...todo, complete: !todo.complete } : todo
  //   }))
  // }, [])
  //共享替换分离的方法
  const dispatch = useCallback((action)=>{
    const {type,payload} = action;
    switch(type){
      case "set":
        setTodos(payload)
        break;
      case "add":
        setTodos(todos => [...todos, payload])
        break;
      case "remove":
        setTodos(todos => todos.filter(_ => _.id !== payload))
        break;
      case "toggle":
        setTodos(todos => todos.map(todo => {
          return todo.id === payload ? { ...todo, complete: !todo.complete } : todo
        }))
        break;
      default:
    }
  },[])
  useEffect(()=>{
    const todos = JSON.parse(localStorage.getItem(TO_KEY)||"[]");
    // setTodos(todos)
    // dispatch({type:"set",payload:todos})
    dispatch(createSet(todos))
  },[])
  useEffect(()=>{
    localStorage.setItem(TO_KEY,JSON.stringify(todos))
  },[todos])
  
  return (
    <div className="container">
      {/* <Control addTodo={addTodo} /> */}
      {/* <ToDolists removeTodo={removeTodo} toggleTodo={toggleTodo} todos={todos} /> */}
      {/* <Control dispatch={dispatch} /> */}
      {/* <ToDolists dispatch={dispatch} todos={todos} /> */}
      <Control {
        ...bindActionCreators({addTodo:createAdd},dispatch)
      }/>{/*使用bindActionCreators函数 */}
      <ToDolists {
         ...bindActionCreators({
           removeTodo:createRemove,
           toggleTodo:createToggle
          },dispatch)
      } todos={todos} />{/*使用bindActionCreators函数 */}
    </div>
  )
}

const Control = memo(function Control(props) {
  // const { addTodo } = props;
  // const { dispatch } = props;
  const { addTodo } = props;//使用了bindActionCreators
  const InputRef = useRef();
  const onSubmit = (e) => {
    e.preventDefault();
    const inputVal = InputRef.current.value.trim();
    // addTodo({
    //   id: ++idIns,
    //   text: inputVal,
    //   complete: false
    // })
    // dispatch({type:"add",payload:{
    //     id: ++idIns,
    //     text: inputVal,
    //     complete: false
    //   }})
    // dispatch(createAdd({
    //       id: ++idIns,
    //       text: inputVal,
    //       complete: false
    //     }))
    addTodo({//使用了bindActionCreators
            id: ++idIns,
            text: inputVal,
            complete: false
          })
    InputRef.current.value = ""
  }
  return (
    <div>
      <h1>todo</h1>
      <form onSubmit={onSubmit}>
        <input type="text" ref={InputRef} className="input-container" placeholder="请输入需要做的事情" />
      </form>
    </div>
  )
})

const ToDolists = memo(function ToDolists(props) {
  // const { removeTodo, toggleTodo, todos } = props;
  // const { dispatch,todos } = props;
  const { removeTodo, toggleTodo, todos } = props;////使用了bindActionCreators
  return (
    <ul className="ul">
      {/* {todos.map(item => <TodoItem todo={item} key={item.id} removeTodo={removeTodo} toggleTodo={toggleTodo} />)} */}
      {/* {todos.map(item => <TodoItem todo={item} key={item.id} dispatch={dispatch} />)} */}
       {todos.map(item => <TodoItem todo={item} key={item.id} removeTodo={removeTodo} toggleTodo={toggleTodo} />)}
    </ul>
  )
})
const TodoItem = memo(function TodoItem(props) {
  // const { removeTodo, toggleTodo, todo: { id, text, complete } } = props;
  // const { dispatch, todo: { id, text, complete } } = props;
  const {removeTodo, toggleTodo,todo: { id, text, complete } } = props;//使用了bindActionCreators
  const onChange = () => {
    // toggleTodo(id)
    // dispatch({type:"toggle",payload:id})
    // dispatch(createToggle(id))
    toggleTodo(id)//使用了bindActionCreators
  }
  const onRemove = () => {
    // removeTodo(id)
    // dispatch({type:"remove",payload:id})
    // dispatch(createRemove(id))
    removeTodo(id)//使用了bindActionCreators
  }
  return (
    <li className="li">
      <input type="checkbox" checked={complete} onChange={onChange} />
      <label className={complete ? "complete" : ""}>{text}</label>
      <button onClick={onRemove}>&#xd7;</button>
    </li>)
})
export default App;

