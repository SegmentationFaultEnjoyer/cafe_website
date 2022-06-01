// function ClickButton(props) {    
//     function press(msg){
//         alert(msg)
//     }
//     return <button onClick={() => press(props.msg)}>{props.button_name}</button>;
// }

class ClickButton extends React.Component {  
    constructor(props) {
        super(props);
        this.press = this.press.bind(this);
        this.state = {name: props.button_name, message: 'on'};
    }
    press(){
        alert(this.state.message);
        let msg = this.state.message != 'off' ? 'off' : 'on';
        this.setState({message: msg});
    }
    render() {
        return <button onClick={this.press}>{this.state.name}</button>;
    }
}

// class ClickButton extends React.Component {  
//     press = (e) => {
//         alert("Hello React!")
//     }
//     render() {
//         return <button onClick={this.press}>Click</button>;
//     }
// }


function CreateButton(root, name, msg) {
    root.render(<ClickButton button_name={name}/>);
}

module.exports = CreateButton;