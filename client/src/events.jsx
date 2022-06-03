const React = require('react');

// function ClickButton(props) {    
//     function press(msg){
//         alert(msg)
//     }
//     return <button onClick={() => press(props.msg)}>{props.button_name}</button>;
// }

// class ClickButton extends React.Component {  
//     constructor(props) {
//         super(props);
//         this.press = this.press.bind(this);
//         this.state = {name: props.button_name, counter: 0};
//     }
//     incCounter(prevState, props) {
//         return {
//             counter: prevState.counter + props.inc
//         }
//     }
//     press(){
//         this.setState(this.incCounter);
//         this.setState(this.incCounter);
//     }
//     render() {
//         return <div>
//              <button onClick={this.press}>{this.state.name}</button>
//              <p>Counter: {this.state.counter}</p>
//              <p>Inc: {this.props.inc}</p>
//         </div>
       
//     }
// }

// class ClickButton extends React.Component {  
//     press = (e) => {
//         alert("Hello React!")
//     }
//     render() {
//         return <button onClick={this.press}>Click</button>;
//     }
// }

function ClickButtonHook(props){
    const [count, setCount] = React.useState(0);
    const press = function(){
        setCount(count + props.inc);
    };
    return (<div>
            <button onClick={press}>Count</button>
            <div>Counter: {count}<br /> Increment: {props.inc}</div>
        </div>);
}


function CreateButton(root) {
    root.render(<ClickButtonHook inc={2}/>);
}

module.exports = CreateButton;