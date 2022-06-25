require('../../../public/pages/WelcomePage.css');

function WelcomePage({app}) {
    document.body.style.overflow = 'hidden';

    let page = React.createRef();

    const ClickHandler = () => {
        page.current.style.animationName = 'gone';
        page.current.style.animationDuration = '0.5s';
        app.current.style.animationName = 'show';
        app.current.style.animationDuration = '0.5s';

        setTimeout(() => {
            page.current.style.display = 'none';
            document.body.style.overflow = '';
            app.current.style.display = 'block';
        }, 500);
    }

    return (
        <div className='welcome' ref={page}>
            <img className='disable-pick' src="logo/WelcomePage.png" alt="ЦіКава" />
            <div className='flex-container column disable-select'>
                <img className='disable-interactions' src="logo/mainLogo.png" alt="logo" />
                <button className='instagram' onClick={ClickHandler}> 
                    <span>Перейти до меню</span>
                </button>
            </div>
        </div>
    )
}

module.exports = WelcomePage;