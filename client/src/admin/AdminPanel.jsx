const React = require('react');
const AuthForm = require('./AuthForm.jsx');
const EditPage = require('./EditPage.jsx');

const Loader = require('../helpers/Loader.jsx');
const request = require('../helpers/SendRequest.js');

class AdminPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isLoading: true, isAuth: undefined};
    }

    async componentDidMount() {
        let response = await request('/auth');
        this.setState({isAuth: response.isAuth, isLoading: false});
    }

    render() {
        return (
            this.state.isLoading ? <Loader /> : 
            <>
            {this.state.isAuth ? <EditPage /> : <AuthForm auth={() => this.setState({isAuth: true})}/>}
            </>
        )
    }
}


module.exports = AdminPanel;