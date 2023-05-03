let store = Redux.createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()); 

let steps = document.querySelector('.steps')
let max_value = document.querySelector('.max_value')
let increment = document.querySelector('#increment')
let decrement = document.querySelector('#decrement')
let reset = document.querySelector('#reset')
let h1 = document.querySelector('h1')


let step = 1
let max = +Infinity
let Arr = [5, 10, 15, 15, 100, 200]
function btnUI(){
    steps.innerHTML=''
    max_value.innerHTML=''
    Arr.forEach((element, i) => {
        if (i > 2) {
            let maxBtn = document.createElement('p')
            maxBtn.innerText = element
            maxBtn.className = element === max ? 'btn active' : 'btn'
            maxBtn.addEventListener('click',()=>{
                max=element
                btnUI()
            })
            max_value.append(maxBtn)
        } else {
            let stepBtn = document.createElement('p')
            stepBtn.innerText = element
            stepBtn.className = element === step ? 'btn active' : 'btn'
            stepBtn.addEventListener('click',()=>{
                step=element
                btnUI()
            })
            steps.append(stepBtn)
        }
    });    
}
btnUI()

let counter=store.getState()
h1.innerText=counter

increment.addEventListener("click", () => {
    store.dispatch({
        type: 'increment',
        step,
        max
    })

});
decrement.addEventListener("click", () => {
    store.dispatch({
        type: 'decrement',
        step,
        max
    })

});
reset.addEventListener("click", () => {
    store.dispatch({
        type: 'reset'
    })

});

store.subscribe(()=>{
    counter=store.getState()
    h1.innerText=counter
})

function reducer(state = 0, action) {
    switch (action.type) {
        case "increment":
            return state<action.max?state+action.step:state;

        case "decrement":
            return state>0?state - action.step<0?0:state - action.step:state;

        case "reset":
            return 0;

        default:
            return state;
    }
}



