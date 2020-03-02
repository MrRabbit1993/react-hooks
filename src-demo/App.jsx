import React, { useState, useMemo, useEffect, memo, useCallback, useRef } from 'react';
import "./App.css"
import reducer from "./reducers.js"
import { createSet, createAdd, createRemove, createToggle } from "./action"
let idIns = Date.now();
const TO_KEY = "_$KEY_";
let store = {
  todos:[],
  incrementCount:0
}
function bindActionCreators(actionCreators, dispatch) {//创建一个绑定dispath函数
  // params :{ addTodo: createAdd }, dispatch
  const res = {}
  for (let key in actionCreators) {
    res[key] = function (...args) {
      const actionCreator = actionCreators[key];//得到每个函数--createAdd
      const action = actionCreator(...args);//调用得到返回 --createAdd(payload) -->  得到了 { type: "set", payload }
      dispatch(action)//触发派发  dispatch({ type: "set", payload })
    }
  }
  //得到的值
  // {
  // addTodo:addTodo = (payload)=>{
    // dispatch({ type: "set", payload })
  // }
  // ================或者返回的是=============
  // addTodo:addTodo = (payload)=>{
    // ()=>dispatch({ type: "set", payload })
  // }
  // ================或者返回的是=============
  // remove:remove=(payload)=>{
    // dispatch({ type: "remove", payload })
  // }
// }
  return res
}
function App() {
  const [todos, setTodos] = useState([]);
  const [incrementCount, setIncrementCount] = useState(0)
  useEffect(()=>{
    Object.assign(store,{todos,incrementCount})
  },[todos,incrementCount])
  // const dispatch = useCallback((action) => {
  const dispatch =(action) => {
    // const state = { todos, incrementCount } 异步这里就可以不要了
    const setter = {
      todos: setTodos,
      incrementCount: setIncrementCount
    }
    if(typeof action =="function"){
      action(dispatch,()=>store)
      return
    }
    const newState = reducer(store, action)//如果这里吧把state更换成store，会重复出现
    for (let key in newState) {
      setter[key](newState[key])
    }
  // }, [todos, incrementCount])
  }
  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem(TO_KEY) || "[]");
    // setTodos(todos)
    // dispatch({type:"set",payload:todos})
    dispatch(createSet(todos))
  }, [])
  useEffect(() => {
    localStorage.setItem(TO_KEY, JSON.stringify(todos))
  }, [todos])

  return (
    <div className="container">
      <Control {
        ...bindActionCreators({ addTodo: createAdd }, dispatch)
      } />
      <ToDolists {
        ...bindActionCreators({
          removeTodo: createRemove,
          toggleTodo: createToggle
        }, dispatch)
      } todos={todos} />
    </div>
  )
}

const Control = memo(function Control(props) {
  const { addTodo } = props;
  const InputRef = useRef();
  const onSubmit = (e) => {
    e.preventDefault();
    const inputVal = InputRef.current.value.trim();
    addTodo({
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
  const { removeTodo, toggleTodo, todos } = props;
  return (
    <ul className="ul">
      {todos.map(item => <TodoItem todo={item} key={item.id} removeTodo={removeTodo} toggleTodo={toggleTodo} />)}
    </ul>
  )
})
const TodoItem = memo(function TodoItem(props) {
  const { removeTodo, toggleTodo, todo: { id, text, complete } } = props;
  const onChange = () => {
    toggleTodo(id)
  }
  const onRemove = () => {
    removeTodo(id)
  }
  return (
    <li className="li">
      <input type="checkbox" checked={complete} onChange={onChange} />
      <label className={complete ? "complete" : ""}>{text}</label>
      <button onClick={onRemove}>&#xd7;</button>
    </li>)
})
export default App;

