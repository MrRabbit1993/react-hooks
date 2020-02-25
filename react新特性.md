## react 新特性
### context
提供了一种方式，能够让数据在组件树中传递而不必一级一级的手动传递。  
基于createContext 创建一个组件 ，得到Provider 和 Consumer。  
基于createContext使用默认值的时候，一般用于Consumer找不到对应的Provider ，一般用于单元测试。  
多个context， Provider嵌套 Consumer并联。
```js
const BatteryContext = createContext();
const OnlineContext = createContext();
<BatteryContext.Provider value={battery}>
    <OnlineContext.Provider value={online}>
        <button onClick={() => {
            this.setState({ battery: battery - 1 })
        }}>按钮</button>
        <button onClick={() => {
            this.setState({ online: !online })
        }}>按钮1</button>
        <Middle />
    </OnlineContext.Provider>
</BatteryContext.Provider>

<BatteryContext.Consumer>
    {battery => (
        <OnlineContext.Consumer>
            {online => <h1>battery:{battery},online:{String(online)}</h1>}
        </OnlineContext.Consumer>
    )}
</BatteryContext.Consumer>
```
### contextType
对context的一种补充 。语法糖
当只有一个context的时候使用，简洁很多代码
```js
class Last extends Component {
  static contextType = BatteryContext;//静态属性
  render() {
    const battery = this.context;
    return <h1>battery:{battery}</h1>
  }
}
```
### lazy 与 Suspense
允许懒加载组件 不能单独使用 要和Suspense 一起使用  
lazy 可能触发loading Suspense来生成这段视觉体验
```js
const About = lazy(() => import("./About.jsx"));
class App extends Component {
  render() {
    return (
      <Suspense fallback={<div>loading</div>}>
        <About />
      </Suspense>
    )
  }
}
//处理错误
//可以在生命周期componentDidCatch 
componentDidCatch(){
    this.setState({
        hasErr:true
    })
}
//也可以使用
static getDerivedStateFromError(){
    return {hasErr:true}
}
```
### memo
类似PureComponent 优化渲染性能--针对组件是否需要重新渲染  
PureComponent只能检测到state的第一级变化，才能控制是否要重新渲染，多级就失效  
mome针对无状态组件
```js
const Foo = memo(function Foo(props) {
  console.log("hello")
  return <div>{props.age}</div>
})
```