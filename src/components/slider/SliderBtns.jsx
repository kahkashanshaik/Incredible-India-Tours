import IconLeftArrow from '../Icon/IconLeftArrow';
import IconRightArrow from '../Icon/IconRightArrow';

const SliderBtns = ({ slidesCnt, currIndex, sliderBtnAction }) => {
    return (
        <div className="slider-btns solid">
            <button className="previous" disabled={currIndex <= 1} onClick={() => sliderBtnAction('previous')}>
                <IconLeftArrow />
            </button>
            <button className="next" disabled={currIndex >= slidesCnt} onClick={() => sliderBtnAction('next')}>
                <IconRightArrow />
            </button>
        </div>
    );
};

export default SliderBtns;
