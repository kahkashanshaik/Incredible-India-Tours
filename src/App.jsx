import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
function App({ children }) {
    const appConfig = useSelector((state) => state.appConfig);
    const dispatch = useDispatch();

    useEffect(() => {});
    return <div className={`${appConfig.sidebar && 'toggle-sidebar'} antialiased relative font-montserrat text-sm font-normal`}>{children}</div>;
}

export default App;
