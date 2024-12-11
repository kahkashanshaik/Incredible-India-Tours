const IconSearch = ({ className, fill = false, duotone = true }) => {
    return (
        <>
            {fill ? (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.1428 17.1429L14.2856 14.2858" stroke="white" strokeWidth="1.71429" strokeMiterlimit="10" strokeLinecap="square" />
                    <path
                        d="M8.57146 14.2857C11.7274 14.2857 14.2857 11.7274 14.2857 8.57146C14.2857 5.41555 11.7274 2.85718 8.57146 2.85718C5.41555 2.85718 2.85718 5.41555 2.85718 8.57146C2.85718 11.7274 5.41555 14.2857 8.57146 14.2857Z"
                        stroke="white"
                        strokeWidth="1.71429"
                        strokeMiterlimit="10"
                        strokeLinecap="square"
                    />
                    <path
                        d="M5.71436 8.57138C5.71436 7.81361 6.01537 7.08689 6.55119 6.55107C7.08701 6.01525 7.81374 5.71423 8.5715 5.71423"
                        stroke="white"
                        strokeWidth="1.71429"
                        strokeMiterlimit="10"
                    />
                </svg>
            ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
                    <circle cx="11.5" cy="11.5" r="9.5" stroke="currentColor" strokeWidth="1.5" opacity={duotone ? '0.5' : '1'} />
                    <path d="M18.5 18.5L22 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
            )}
        </>
    );
};

export default IconSearch;
