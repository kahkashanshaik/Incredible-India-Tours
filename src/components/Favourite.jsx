import { useDispatch, useSelector } from 'react-redux';
import { addFavItem, removeFavItem } from '../app/favSlice';
import IconHeartFill from './Icon/IconHeartFill';
import IconHeart from './Icon/IconHeart';
import { useAddFavouriteMutation, useGetFavouritesQuery, useRemoveFavouriteMutation } from '../features/account/accountApi';
import { useEffect } from 'react';

const Favourite = ({ slug }) => {
    const { favItems } = useSelector((state) => state.favConfig);
    const { user, token } = useSelector((state) => state.authConfig);
    const dispatch = useDispatch();
    const { data } = useGetFavouritesQuery(undefined, { skip: !user && !token });
    const [addFavPkg] = useAddFavouriteMutation();
    const [removeFavPkg] = useRemoveFavouriteMutation();
    // Marke as favourite
    function actionAddFavPkg(slug) {
        addFavPkg({ package_slug: slug });
        dispatch(addFavItem(slug));
    }
    // Un mark favourite
    function actionRemoveFavPck(slug) {
        removeFavPkg({ package_slug: slug });
        dispatch(removeFavItem(slug));
    }
    useEffect(() => {
        if (data && user && token) {
            data.metaData.map((item) => dispatch(addFavItem(item)));
        }
    }, [data]);
    return (
        <>
            {favItems.includes(slug) ? (
                <button onClick={() => actionRemoveFavPck(slug)}>
                    <IconHeartFill color="#29C3E5" />
                </button>
            ) : (
                <button onClick={() => actionAddFavPkg(slug)}>
                    <IconHeart />
                </button>
            )}
        </>
    );
};
export default Favourite;
