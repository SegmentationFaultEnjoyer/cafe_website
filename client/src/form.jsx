class UserForm extends React.Component {
    constructor(props) {
      super(props);
      
      this.state = {name: "", age: 0};
 
      this.onNameChange = this.onNameChange.bind(this);
      this.onAgeChange = this.onAgeChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);

      this.nameField = React.createRef();
    }
      validateAge(age){
          return age >= 0;
      }
      validateName(name){
          return name.length > 2;
      }
      onAgeChange(e) {
          let val = e.target.value;
          let valid = this.validateAge(val);
          this.setState({age: val, ageValid: valid});
          e.target.style.borderColor = valid ? "lime":"red";
      }
      onNameChange(e) {
          let val = e.target.value;
          let valid = this.validateName(val);
          this.setState({name: val, nameValid: valid});
          e.target.style.borderColor = valid ? "lime":"red";
      }
 
      handleSubmit(e) {
          e.preventDefault();
          console.log(this.nameField);
          if(this.state.nameValid && this.state.ageValid){
              alert(`Имя: ${this.nameField.current.value} Возраст: ${this.state.age}`);
          }
      }
 
      render() {
          return (
              <form onSubmit={this.handleSubmit} className="form">
                  <p>
                      <label>Имя:</label><br />
                      <input type="text" defaultValue='Bob' ref={this.nameField}
                          onChange={this.onNameChange} />
                  </p>
                  <p>
                      <label>Возраст:</label><br />
                      <input type="number" value={this.state.age} 
                          onChange={this.onAgeChange} />
                  </p>
                  <input type="submit" value="Отправить" />
              </form>
          );
      }
  }

module.exports = function show_form (root) {
    root.render(<UserForm />);
}