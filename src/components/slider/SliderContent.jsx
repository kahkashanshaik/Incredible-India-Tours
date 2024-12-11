const SliderContent = ({ title, className }) => {
    return (
        <div className={`slider-content ${className}`}>
            <h1>{title}</h1>
        </div>
    );
};

export default SliderContent;
