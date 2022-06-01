function test() {
    const rootNode = document.getElementById("test");    
    const root = ReactDOM.createRoot(rootNode);

    root.render(
        <h1>Hello React</h1>  // элемент, который мы хотим создать
    );
}

export default test;