require('../../../public/SideBar.css');

class SideNavBar extends React.Component {
    constructor(props) {
        super(props);
        let icons = [
            'coffee',
            'iced-coffee',
            'tea',
            'lemonade',
            'milkshake',
            'sandwhich',
            'salad',
            'boul',
            'breakfast'
        ]
        
        this.picked = null;
        let SideBar = this;

        class NavBarEl extends React.Component  {
            constructor(props) {
                super(props);
                this.value = props.value;
                this.state = {isActive : false}
                this.ClickHandler = this.ClickHandler.bind(this);
            }

            ClickHandler() {
                if(!this.state.isActive) {
                    SideBar.depickPrevious();
                    SideBar.picked = this;
                    this.ChangeState();
                }   
            }

            ChangeState() {
                this.setState({isActive: !this.state.isActive});
            }

            render() {
                let class_name = this.state.isActive ? 'picked' : '';
                let img = this.state.isActive ? `icons/${this.value}_picked.png` : `icons/${this.value}.png`;
                
                return (<div onClick={this.ClickHandler} className={class_name}>
                            <img className="picture disable-pick"
                            src={img} alt={this.value} />
                        </div>)
            }
        }

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