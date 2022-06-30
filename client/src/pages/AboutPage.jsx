require('../../../public/pages/AboutPage.css');
require('../../../public/buttons/InstagramButton.css');
require('react-slideshow-image/dist/styles.css');

const {Slide} = require('react-slideshow-image');

let images = ['location/zaklad_0.webp', 'location/zaklad_1.webp', 'location/zaklad_2.webp', 'location/zaklad_3.webp']

function AboutPage() {
    return (
        <div className='about-page-container'>

            <div className='flex-container disable-select'>
                <p>
                <b>ціКава</b> - невеличка мережа концептуальних кав'ярень, з власним кондитерстким цехом. 
                Для страв використовуємо авторські соуси і м'ясо яке маринують та запікають наші кухарі. 
                Практикуємо індивідуальний підхід до побажань гостей та обожнюємо коли до нас приходять 
                з домашніми тваринками.
                </p>
                <div className='flex-container column'>
                    <img className='disable-pick' src='logo/logo.png' alt='logo'></img>
                    <a href="https://www.instagram.com/tsikava.foodandcoffee/?igshid=1v2qniff5qujl" target='blank'>
                        <button className='instagram'> 
                            <span>Наш інстаграм</span>
                            <i className="fa fa-instagram"></i>
                        </button>
                    </a>
                </div>
                
            </div>

            {/* <div className='slider'>
                <figure>
                {new Array(4).fill('').map((_, i) => <img src={`location/zaklad_${i}.webp`} alt={`photo${i}`}></img>)}
                </figure>
            </div> */}
            <Slider />
            

            <div className='adress'>
                <div className='flex-container column'>
                    <i className="fa fa-map-marker"></i>
                    <p>вул.Кубійовича 2 <br/> тел. 098-123-91-69</p>
                </div>
                <div className='flex-container column'>
                    <i className="fa fa-map-marker"></i>
                    <p>вул.Хорватська 15 <br/> тел. 067-575-61-68</p>
                </div>
                <div className='flex-container column'>
                    <i className="fa fa-map-marker"></i>
                    <p>вул.Костя Левицького 47 <br/> тел. 096-119-54-41</p>
                </div>
                <div className='flex-container column'>
                    <i className="fa fa-map-marker"></i>
                    <p>вул.Промислова 27 (територія заводу Маяк) <br/> тел. 068-526-56-16</p>
                </div>
            </div>
        </div>
       
    )
}

function Slider () {
    return (
        <div className="slide-container" style={{marginTop: '20px'}}>
          <Slide indicators={true} transitionDuration={500}>
           {images.map((slideImage, index)=> (
              <div className="each-slide-effect" key={index}>
                <div style={{'backgroundImage': `url(${slideImage})`}}>
                </div>
              </div>
            ))} 
          </Slide>
        </div>
      )
}

module.exports = AboutPage;