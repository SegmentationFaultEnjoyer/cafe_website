require('../../../public/TopBar.css');
const type = require('../helpers/types.js');
const {Link} = require('react-router-dom');

class TopBar extends React.Component {
    constructor(props) {
        super(props);
        let els = [
            'Головна',
            'Доставка',
            'Про нас'
        ]
        this.els = [];
        this.picked = null;
        let TopBar = this;

        class NavBarEl extends React.Component {
            constructor(props) {
                super(props);
                this.value = props.value;
                this.page = props.page_type;
                this.route = this.getRoute();

                this.state = {isActive : this.route === window.location.pathname};
                TopBar.picked = this.state.isActive ? this : TopBar.picked; 
                this.ClickHandler = this.ClickHandler.bind(this);
            }

            getRoute() {
                switch(this.page) {
                    case type.MAIN_PAGE:
                        return '/';
                    case type.DELIVERY_PAGE:
                        return '/delivery';
                    case type.ABOUT_PAGE:
                        return '/about';
                    default:
                        return '/not_found';
                }
            }

            ClickHandler() {
                if(!this.state.isActive) {
                    TopBar.depickPrevious();
                    TopBar.picked = this;
                    this.ChangeState();
                }   
            }

            ChangeState() {
                this.setState({isActive: !this.state.isActive});
            }

            render() {
                let class_name = this.state.isActive ? 'picked_top' : '';
                return (
                    <Link to={this.route} className={class_name}>
                        <div onClick={this.ClickHandler}>
                            <p>{this.value}</p>
                        </div>
                    </Link>
                    
                )
            }
        }

        for(let i = 0; i < els.length; i++) {
            this.els.push(<NavBarEl value={els[i]} page_type={i} key={i}/>)
        }
    }

    depickPrevious() {
        if(this.picked) {
            this.picked.ChangeState();
        }
    }

    render() {
        return (
            <div className="top-bar disable-select">{this.els}</div>
        )
    }
}



module.exports = TopBar;