const {Link} = require('react-router-dom');

function Footer() {
    return (
        <div className='footer'>
            <Link to='/dogovir-publichnoyi-oferty'><span>Договір публічної оферти</span></Link>
            <Link to='/policy'><span>Політика конфіденційності</span></Link>
            <div className='flex-container' style={{width: '33%', marginTop: 0}}>
                <span>Сайт розроблений: </span>
                <div className='flex-container' style={{width: '50%', marginTop: 0}}>
                    <a style={{all: 'unset'}} href="https://t.me/MarkVoishvillo" target='_blank'>
                        <i style={{fontSize: '27px'}} className="fa fa-telegram" ></i>
                    </a>
                    <a href="https://www.instagram.com/jesuschrist1337/" style={{all: 'unset'}} target='_blank'> 
                        <i style={{fontSize: '27px'}} className="fa fa-instagram"></i>
                    </a>
                    <a href="https://github.com/SegmentationFaultEnjoyer" style={{all: 'unset'}} target='_blank'>
                        <i style={{fontSize: '27px'}} className="fa fa-github" ></i>
                    </a>
                </div>
                
            </div>
        </div>
    )
}

module.exports = Footer;