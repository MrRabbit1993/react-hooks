export function createSet(payload) {
    return { type: "set", payload }
}
export function createAdd(payload) {
    // return { type: "add", payload }
    //这里要实现异步了
    return (dispatch,getState) =>{
        setTimeout(()=>{
            const {todos} = getState();
            if(!todos.find(todo=>todo.text===payload.text)){
                dispatch({type:"add",payload})
            }
        },3000)
    }
}
export function createRemove(payload) {
    return { type: "remove", payload }
}
export function createToggle(payload) {
    return { type: "toggle", payload }
}