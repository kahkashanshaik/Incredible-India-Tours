import { useEffect, useState } from 'react';
import SliderBtns from './SliderBtns';
import SliderContent from './SliderContent';
const Slider = ({ sliderImgs, marginTop = 'lg:mt-16', sliderHeight = 'lg:h-[500px]' }) => {
    const [currIndex, setCurrIndex] = useState(1);

    function sliderChangeHandler(action) {
        if (action === 'next') {
            setCurrIndex((prevIndex) => prevIndex + 1);
            return;
        }
        setCurrIndex((prevIndex) => prevIndex - 1);
    }
    return (
        <div className={`slider-container ${marginTop} ${sliderHeight}`}>
            {/* slider buttons */}
            <SliderBtns slidesCnt={sliderImgs.length} currIndex={currIndex} sliderBtnAction={sliderChangeHandler} />
            {sliderImgs.map((img, index) => {
                return (
                    <div key={index} className={`slide ${currIndex !== index + 1 ? 'hidden' : undefined}`}>
                        <div className="overlay"></div>
                        <SliderContent title={img.title} />
                        {/* slider images */}
                        <img src={img.src} className="object-cover" />
                    </div>
                );
            })}
        </div>
    );
};

export default Slider;
