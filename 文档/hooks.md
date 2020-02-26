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