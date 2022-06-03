const root = ReactDOM.createRoot(document.getElementById("app"))

class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {date: new Date()};
        this.unmount = this.unmount.bind(this);
    }

    unmount() {
        root.unmount();
    }

    componentDidMount() { //компонент появился на странице
        this.timerId = setInterval(() => this.tick(), 1000);
        console.log('compDidMount');
    }

    componentWillUnmount() { //компонент удалён
        clearInterval(this.timerId);
        console.log("componentWillUnmount()");
    }

    tick() {
        this.setState({date: new Date()});
    }

    render() {
        return (
            <div>
                <h2>Текущее время {this.state.date.toLocaleTimeString()}.</h2>
            </div>
        )
    }
}

module.exports = Clock;