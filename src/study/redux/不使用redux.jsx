import React, { useState, useMemo, useEffect, memo, useCallback, useRef } from 'react';
import "./App.css"
let idIns = Date.now();
const TO_KEY= "_$KEY_";
function App() {
  const [todos, setTodos] = useState([]);
  const addTodo = useCallback((todo) => { setTodos(todos => [...todos, todo]) }, [])
  const removeTodo = useCallback((id) => { setTodos(todos => todos.filter(_ => _.id !== id)) }, [])
  const toggleTodo = useCallback((id) => {
    setTodos(todos => todos.map(todo => {
      return todo.id === id ? { ...todo, complete: !todo.complete } : todo
    }))
  }, [])
  useEffect(()=>{
    const todos = JSON.parse(localStorage.getItem(TO_KEY)||"[]");
    setTodos(todos)
  },[])
  useEffect(()=>{
    localStorage.setItem(TO_KEY,JSON.stringify(todos))
  },[todos])
  return (
    <div className="container">
      <Control addTodo={addTodo} />
      <ToDolists removeTodo={removeTodo} toggleTodo={toggleTodo} todos={todos} />
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

