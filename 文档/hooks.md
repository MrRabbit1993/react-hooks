### 类组件问题
1、状态难以复用  
2、生命周期与状态混乱，变复杂  
3、this问题  
### hooks
1、存在于函数组件中  
### useState
不能在条件里面调用，只能在顶部调用  
调用useState会得到一个变量与一个修改变量的方法  
变量==状态  
修改变量方法==this.setState  
```js
function App(props) {
  const defaultVal = props.value||0;
//   const [count,setCount] = useState(()=>{
    //延迟调取，只会调取一次
//     return  props.value||0
// });
  const [count,setCount] = useState(0);
  const [name,setName] = useState("nike")
  
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>按钮{count},名称{name}</button>
    </div>
  )
}
```
### useEffect
当视图变化（副作用）,该钩子会执行  
useEffect传的参数，可以控制是否需要执行函数体，一般只希望只想一次，传递一空数组
```js
class App extends Component {
  state = {
    count:0,
    size:{
      width:window.innerWidth,
      height:window.innerHeight
    }
  }
  onResize = ()=>{
   this.setState({
      size:{
        width:window.innerWidth,
        height:window.innerHeight
      }
    })
  }
  componentDidMount(){
    document.title = this.state.count;
    window.addEventListener("resize",this.onResize);
  }
  componentDidUpdate(){
    document.title = this.state.count;
  }
  componentWillUnmount(){
    window.removeEventListener("resize",this.onResize)
  }
  render() {
    const {width,height} = this.state.size;
  return<button onClick={()=>this.setState({count:this.state.count+1})}> count:{this.state.count},屏幕{width}X{height}</button>
  }
} 
function App_(){
  const [count,setCount] = useState(0)
  const [size,setSize] = useState({width:window.innerWidth,height:window.innerHeight})
  const onResize = ()=>{
    setSize({width:window.innerWidth,height:window.innerHeight})
  }
  const Click = ()=>{
    console.log("123")
  }
  useEffect(()=>{//渲染后（包含componentDidUpdate,componentWillUpdate这两个什么周期）这里会一直调用
    document.title = count
  })
  useEffect(()=>{//代表 componentDidMount componentWillUnmount 这里调用一次
    window.addEventListener("resize",onResize)
    return ()=>{
      window.removeEventListener("resize",onResize)
    }
  },[])//这里传递一个空数组 。在调用的时候，会区分这次与上一次是否一样，一样就不会调用，上面的代码没传。默认都会调用
  useEffect(()=>{
    console.log("count",count)
  },[count])//这里当count变化，就会执行，如果只修改浏览器，因为count不变，就不会执行
  useEffect(()=>{
    document.querySelector("#log").addEventListener("click",Click)
    return  ()=>{
      document.querySelector("#log").removeEventListener("click",Click)
    }
  })//这里dom在变化，所以需要每次绑定最新的，并解绑之前的
  return(
    <div>
      <button onClick={()=>setCount(count+1)}>count:{count},屏幕{size.width}X{size.height}</button>
      {count%2?<span id="log">{size.width}X{size.height}</span>:<p id="log">{size.width}X{size.height}</p>}
    </div>
  )
}
```
### useContext
针对函数组件里面，不能使用contextType而使用useContext
```js
const CountContext = createContext()
function App(){
  const [count,setCount] = useState(0)
  return(
    <div>
      <button onClick={()=>setCount(count+1)}>count:{count}</button>
      <CountContext.Provider value={count}>
        <Child/>
        <ChildType/>
        <Count/>
      </CountContext.Provider>
    </div>
  )
}
class Child extends Component{
    render(){
    return (
      <CountContext.Consumer>
        {count=><h1>{count}</h1>}
      </CountContext.Consumer>
    )    
  } 
}
class ChildType extends Component{
 static contextType = CountContext
  render(){
    const count = this.context
    return (
      <h1>{count}</h1>
    )    
} 
}
function Count(){
  const count = useContext(CountContext)//直接传入创建的context
  return <h1>{count}</h1>  
}
```
### useMome 与useCallback
```js
function App(){
  const [count,setCount] = useState(0)
  const double = useMemo(()=>{//这里可以控制是否重新计算了
    return count * 2
  },[count===3])
  // const onClick = ()=>{//这种会引发Count重新渲染，因为句柄变化了
  //   console.log(123)
  // }
  //需要改写成
  // const onClick = useMemo(()=>{
  //   return ()=>{
  //     console.log(123)
  //   }
  // },[])
  //当useMemo返回的是一个函数，可以改写useCallback
  //useMemo(()=>fn)等价于useCallBack(fn)
  const onClick = useCallback(()=>{
    console.log(123)
  },[])
  return(
    <div>
      <button onClick={()=>setCount(count+1)}>count:{count},double:{double}</button>
      <Count count={double} onClick={onClick}/>
    </div>
  )
}
const Count = memo(function Count(props){
  console.log("render count")
  return <h1 onClick={props.onClick}>{props.count}</h1>  
})
```
### useRef
1、获取子组件或者dom元素
2、同步不同周期间的共享数据
```js
function App(){
  const [count,setCount] = useState(0)
  const double = useMemo(()=>{//这里可以控制是否重新计算了
    return count * 2
  },[count===3])
  const countRef = useRef()//获取子组件
  // let it
  let it = useRef(); //就是上说的第二个方案
  const onClick = useCallback(()=>{
    countRef.current.speak()
  },[countRef])
  useEffect(()=>{//创见一个定时器
    // it = setInterval(()=>{
    //     setCount(count=>count+1)
    // },1000)
    it.current = setInterval(()=>{
        setCount(count=>count+1)
    },1000)
  },[])
  useEffect(()=>{
    if(count>=10){
      // clearInterval(it)
      clearInterval(it.current)
    }
  })
  return(
    <div>
      <button onClick={()=>setCount(count+1)}>count:{count},double:{double}</button>
      <Count count={double} onClick={onClick} ref={countRef}/>
    </div>
  )
}
class Count extends PureComponent{
  speak(){
    console.log(`hello count is ${this.props.count}`)
  }
  render(){
    const {props} = this;
    return <h1 onClick={props.onClick}>{props.count}</h1>  
  }
}
// const Count = memo(function Count(props){
//   console.log("render count")
//   return <h1 onClick={props.onClick}>{props.count}</h1>  
// })
```
### 自定义
可以返回类似自带的hooks  
也可以返回一个jsx  
更加可以返回值
```js
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

//jsx
function useCounter(count) {
  const size = useSize()
  return <h1>{count},{size.width}X{size.height}</h1>
}
//返回一个值
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
```
### useReducer
对useState的封装  
一种局部的redux  
一般用于复杂逻辑
```js
function checkedReducer(state, action) {
    const { type, payload } = action;
    let newState
    switch (type) {
        case 'toggle':
            newState = { ...state }
            if (payload in newState) {
                delete newState[payload]
            } else {
                newState[payload] = true
            }
            return newState
        case 'reset':
            return {};
        default:
    }
    return state
}
 // const [localCheckedTicketTypes, setLocalCheckedTicketTypes] = useState(() => {//本地坐席
    //     return { ...checkedTicketTypes }
    // });
    //改写useReducer
    const [localCheckedTicketTypes, localCheckedTicketTypesDispatch] = useReducer(checkedReducer, checkedTicketTypes, (checkedTicketTypes) => {//本地坐席
        return { ...checkedTicketTypes }
    });
    //useReducer相当于是一种局部的redux
    //第一个参数是局部的reducer，第二个是原始值，第三个可以有或者无，当有的时候参数是第二个的的值
    //useReducer内部就是封装的useState
    //useReducer可以完成的，都可以用useState改写
```
