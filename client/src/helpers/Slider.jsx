const {Slide} = require('react-slideshow-image');

function Slider ({images}) {
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

module.exports = Slider;