import { useNavigate } from 'react-router-dom';
import IconAltArrowLeft from '../Icon/IconAltArrowLeft';
const BackButton = () => {
    const navigate = useNavigate();
    return (
        <button className="flex justify-between items-center" onClick={() => navigate(-1)}>
            <IconAltArrowLeft size="15" />
            Back
        </button>
    );
};

export default BackButton;
