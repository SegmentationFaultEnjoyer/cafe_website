require('../../../public/navbars/SideBar.css');

const React = require('react');
const { useDispatch } = require('react-redux');

const types = require('../helpers/types.js');
const { setLabel } = require('../redux/slices/sortSlice.js');
const { ChangeItemsCategory } = require('../redux/slices/gridSlice.js');

class SideNavBar extends React.Component {
    constructor(props) {
        super(props);
        let icons = [
            {name: 'popular', type: types.POPULAR},
            {name: 'sandwhich', type: types.SANDWHICH},
            {name: 'salad', type: types.SALAD},
            {name: 'breakfast', type: types.BREAKFAST},
            {name: 'boul', type: types.BOUL},
            {name: 'lemonade', type: types.DRINKS},
            {name: 'dessert', type: types.DESSERTS},
            {name: 'coffee', type: types.COFFEE}
        ]
        
        this.unpick = null;
        let SideBar = this;

        function NavBarEl(props) {
            const value = props.value.name;
            const type = props.value.type;

            const [isActive, setIsActive] = React.useState(type == types.POPULAR);
            const dispatch = useDispatch();

            SideBar.unpick = isActive ? ChangeState : SideBar.unpick;

            let class_name = isActive ? 'picked' : '';
            let img = isActive ? `icons/${value}_picked.png` : `icons/${value}.png`;
            
            const ClickHandler = () => {
                if(!isActive) {
                    SideBar.depickPrevious();

                    dispatch(setLabel('▼ Сортування за популярністю'));
                    dispatch(ChangeItemsCategory(type));
                    
                    ChangeState();
                    window.scrollTo({
                        top: 0,
                        left: 0,
                        behavior: 'smooth'
                    });
                }   
            }

            function ChangeState() { setIsActive(!isActive);}

            return (
                <div onClick={ClickHandler} className={class_name}>
                    <img className="disable-pick picture"
                    src={img} alt={value} />
                </div>
                    )
        }

        this.els = [];

        for(let icon of icons) {
            this.els.push(<NavBarEl value={icon} key={icon.name}/>)
        }
    }

    depickPrevious() {
        if(this.unpick) {
            this.unpick();
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