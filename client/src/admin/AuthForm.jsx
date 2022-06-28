require('../../../public/admin/login.css');

const request = require('../helpers/SendRequest.js');

class AuthForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            login: "", 
            password: "",
            _loginInput: this.loginInput,
            _passwordInput: this.passwordInput
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);

        let authInfo = {
            login: formData.get('login'),
            password: formData.get('password'),
        }
        if(authInfo.login == '' || authInfo.password == '') return;

        console.log(authInfo);
        //auth fetch
        let {isAuth} = await request('/login', 'POST', authInfo);
        if(isAuth)
            this.props.auth();
        else {
            alert("Невірний логін чи пароль!");
        }
    }

    loginInput = [
        <input className='input' type="text" name='login' placeholder=" " onFocus={this.CleanErrors}/>,
        <div className="cut cut-short"></div>,
        <label htmlFor="name" className="placeholder">Логін</label>
    ]

    passwordInput = [
        <input className='input' type="password" name="password" placeholder=" " onFocus={this.CleanErrors}/>,
        <div className="cut"></div>,
        <label htmlFor="phoneNumber" className="placeholder">Пароль</label>
    ]

    render() {
        return (
            <div className="flex-container column auth-container">
                <h1 className='title'>Панель адміністратора</h1>
                    <form onSubmit={this.handleSubmit} className="form">
                        <div className='input-container'>
                            {this.state._loginInput}
                        </div>
                        <div className='input-container'>
                            {this.state._passwordInput}
                        </div>
                        <div className='input-container'>
                            <button type='submit' className='brown checkout-btn'>Увійти</button>
                        </div>  
                    </form>
            </div>
        )
    }
}


module.exports = AuthForm;