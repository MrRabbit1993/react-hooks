//聚合reducer
function combineReducers(reducers) {
    return function reducer(state, action) {//这里的state包含了全部的状态
        const changed = {}
        for (let key in reducers) {
            changed[key] = reducers[key](state[key], action)
        }
        return {
            ...state,
            ...changed
        }
    }
}
const reducers = {
    todos(state, action) {
        const { type, payload } = action;
        switch (type) {
            case "set":
                return payload
            case "add":
                return [...state, payload]
            case "remove":
                return state.filter(_ => _.id !== payload)
            case "toggle":
                return state.map(todo => {
                    return todo.id === payload ? { ...todo, complete: !todo.complete } : todo
                })
        }
        return state
    },
    incrementCount(state, action) {
        const { type } = action;
        switch (type) {
            case "set":
            case "add":
                return state + 1
        }
        return state
    }
}
export default combineReducers(reducers);