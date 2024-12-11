import IconLeftArrow from '../Icon/IconLeftArrow';
import IconRightArrow from '../Icon/IconRightArrow';

const Pagination = ({ page, setPage, total }) => {
    return (
        <div className="pagination">
            <button onClick={() => setPage(page - 1)} disabled={page === 1}>
                <IconLeftArrow />
            </button>
            {Array.from({ length: total }, (_, index) => index + 1).map((item) => (
                <button key={item} onClick={() => setPage(item)} className={item === page ? 'page active' : ''}>
                    {item}
                </button>
            ))}
            <button onClick={() => setPage(page + 1)} disabled={page === total}>
                <IconRightArrow />
            </button>
        </div>
    );
};
export default Pagination;
