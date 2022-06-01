const ReactRoot = ReactDOM.createRoot(document.getElementById("test"))

let Time = () => {
    return (
        <div>
            <h2>Текущее время {new Date().toLocaleTimeString()}.</h2>
        </div>
    )
}

function tick() {
    ReactRoot
        .render(<Time />);
  }

module.exports = tick;