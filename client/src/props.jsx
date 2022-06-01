let Name = (props) => {
    return (
        <div>
              <p>Имя: {props.name}</p>
              <p>Возраст: {props.age}</p>
        </div>
    );
}

Name.defaultProps = {name : 'Test', age: 12};

function name_show(root, info) {
    root.render(<Name name={info.name} age={info.age} />)    
}

export default name_show;