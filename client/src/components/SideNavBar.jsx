require('../../../public/SideBar.css');
const {mainPageContext} = require('../helpers/context.jsx');
const type = require('../helpers/types.js');

class SideNavBar extends React.Component {
    constructor(props) {
        super(props);
        let icons = [
            {name: 'coffee', type: type.COFFEE},
            {name: 'iced-coffee', type: type.ICE_COFFEE},
            {name: 'tea', type: type.TEA},
            {name: 'lemonade', type: type.LEMONADE},
            {name: 'milkshake', type: type.MILKSHAKE},
            {name: 'sandwhich', type: type.SANDWHICH},
            {name: 'salad', type: type.SALAD},
            {name: 'boul', type: type.BOUL},
            {name: 'breakfast', type: type.BREAKFAST},
        ]
        
        this.picked = null;
        let SideBar = this;

        class NavBarEl extends React.Component  {
            constructor(props) {
                super(props);
                this.value = props.value.name;
                this.type = props.value.type;
                this.state = {isActive : false}
                this.ClickHandler = this.ClickHandler.bind(this);
            }

            ClickHandler() {
                if(!this.state.isActive) {
                    SideBar.depickPrevious();
                    SideBar.picked = this;
                    this.ChangeState();
                    this.ChangeItemsCategory();
                }   
            }

            ChangeItemsCategory() {
                let {changeCategory} = this.context;
                changeCategory(this.type);
            }

            ChangeState() {
                this.setState({isActive: !this.state.isActive});
            }

            render() {
                let class_name = this.state.isActive ? 'picked' : '';
                let img = this.state.isActive ? `icons/${this.value}_picked.png` : `icons/${this.value}.png`;
                
                return (
                        <div onClick={this.ClickHandler} className={class_name}>
                            <img className="disable-pick picture"
                            src={img} alt={this.value} />
                        </div>
                        )
            }
        }

        NavBarEl.contextType = mainPageContext;

        this.els = [];

        for(let icon of icons) {
            this.els.push(<NavBarEl value={icon} />)
        }
    }

    depickPrevious() {
        if(this.picked) {
            this.picked.ChangeState();
        }
    }

    render() {
        return (
            <div className="column side-bar disable-select">
                {this.els}
            </div> 
        )
    }

    
}

module.exports = SideNavBar;