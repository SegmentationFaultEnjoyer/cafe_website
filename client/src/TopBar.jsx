require('../../public/TopBar.css');
const {pageContext} = require('./helpers/context.jsx');

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
                this.state = {isActive : this.value == 'Головна'};
                //TopBar.picked = TopBar.picked ?? this; 
                TopBar.picked = TopBar.picked != null ? TopBar.picked : this; 
                this.page = props.page_type;

                this.ClickHandler = this.ClickHandler.bind(this);
            }

            ClickHandler() {
                if(!this.state.isActive) {
                    TopBar.depickPrevious();
                    TopBar.picked = this;
                    let {pageSwitcher} = this.context;

                    this.ChangeState();
                    pageSwitcher(this.page);
                }   
            }

            ChangeState() {
                this.setState({isActive: !this.state.isActive});
            }

            render() {
                let class_name = this.state.isActive ? 'picked_top' : '';
                return (
                    <div onClick={this.ClickHandler} className={class_name}>
                        <p>{this.value}</p>
                    </div>
                )
            }
        }
        NavBarEl.contextType = pageContext;

        for(let i = 0; i < els.length; i++) {
            this.els.push(<NavBarEl value={els[i]} page_type={i}/>)
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