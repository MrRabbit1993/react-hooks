import React, { Component, useState, useMemo, useEffect, memo, useCallback, useRef, PureComponent } from 'react';
function App() {
  const [count, setCount] = useCount(0)
  const Counter = useCounter(count)
  const size = useSize()
  console.log(count)
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>count:{count}width:{size.width}X{size.height}</button>
      <Count count={count} />
      {Counter}
    </div>
  )
}
function useCounter(count) {
  const size = useSize()
  return <h1>{count},{size.width}X{size.height}</h1>
}
// class Count extends PureComponent {
//   render() {
//     const size = useSize()
//     console.log(size)
//     const { props } = this;
//     return <h1>{props.count},{size.width}X{size.height}</h1>
//   }
// }
function Count(props){
    const size = useSize()
  return <h1>{props.count},{size.width}X{size.height}</h1>
}
//自定义hooks
function useCount(defaultCount) {
  const [count, setCount] = useState(defaultCount)
  let it = useRef();
  useEffect(() => {//创见一个定时器
    it.current = setInterval(() => {
      setCount(count => count + 1)
    }, 1000)
  }, [])
  useEffect(() => {
    if (count >= 10) {
      clearInterval(it.current)
    }
  })
  return [count, setCount]
}
function useSize() {
  const [size, setSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  const onResize = useCallback(() => setSize({ width: window.innerWidth, height: window.innerHeight }), [])
  useEffect(() => {
    window.addEventListener("resize", onResize, false)
    return () => {
      window.removeEventListener("resize", onResize, false)
    }
  }, [])
  return size
}
export default App;

