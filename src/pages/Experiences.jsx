const Experiences = () => {
    const reviews = [
        {
            name: 'Emily Johnson',
            position: 'Travel Blogger',
            tourName: 'Grand Canyon Adventure',
            comments: 'The Grand Canyon tour was absolutely breathtaking! The guides were knowledgeable, and the experience was unforgettable.',
            image: '/images/logo.png',
        },
        {
            name: 'Liam Smith',
            position: 'Photographer',
            tourName: 'Paris City Tour',
            comments: 'Paris is magical! The tour was well-organized, and I captured some of the most beautiful moments of my life.',
            image: '/images/logo.png',
        },
        {
            name: 'Sophia Davis',
            position: 'Adventurer',
            tourName: 'Safari in Kenya',
            comments: 'A thrilling safari experience! Seeing the wildlife up close was a dream come true. Highly recommended!',
            image: '/images/logo.png',
        },
        {
            name: 'Noah Wilson',
            position: 'Solo Traveler',
            tourName: 'Iceland Northern Lights',
            comments: 'Witnessing the Northern Lights was a surreal experience. Everything about this tour was perfect!',
            image: '/images/logo.png',
        },
        {
            name: 'Olivia Martinez',
            position: 'Food Enthusiast',
            tourName: 'Italy Culinary Tour',
            comments: 'The Italian Culinary Tour was a feast for the senses! The food, wine, and culture were incredible.',
            image: '/images/logo.png',
        },
        {
            name: 'Ethan Brown',
            position: 'Adventure Seeker',
            tourName: 'Amazon Rainforest Expedition',
            comments: 'An adventure of a lifetime! The Amazon Rainforest tour was thrilling and educational.',
            image: '/images/logo.png',
        },
        {
            name: 'Ava Thompson',
            position: 'Honeymooner',
            tourName: 'Maldives Romantic Getaway',
            comments: 'The Maldives getaway was beyond our expectations. Stunning beaches and luxurious stays!',
            image: '/images/logo.png',
        },
        {
            name: 'James White',
            position: 'Nature Enthusiast',
            tourName: 'New Zealand Adventure',
            comments: 'New Zealand is a paradise for nature lovers. The tour was perfectly planned and awe-inspiring.',
            image: '/images/logo.png',
        },
        {
            name: 'Mia Taylor',
            position: 'Family Traveler',
            tourName: 'Disneyland California',
            comments: 'Our family had the best time at Disneyland! The kids loved every second, and so did we.',
            image: '/images/logo.png',
        },
        {
            name: 'Alexander Lee',
            position: 'History Buff',
            tourName: 'Egypt Pyramids Tour',
            comments: 'Exploring the Pyramids of Giza was like stepping back in time. This tour was a dream come true for a history lover like me.',
            image: '/images/logo.png',
        },
    ];
    return (
        <div className="container">
            <div className="content-wrapper flex flex-col">
                <h1 className="text-4xl text-black font-bold text-center mt-5 mb-16">Experiences</h1>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {reviews.map((review, index) => {
                        return (
                            <div key={`review-${index}`} className="col-span-1 flex flex-col justify-center items-center shadow-2xl rounded-lg mb-6 p-5 gap-2">
                                <img src={review.image} className="shadow-3xl rounded-full -mt-12 border-2 border-primary w-16 h-16 mb-5" />
                                <div className="text-center">
                                    <p className="font-bold">{review.name}</p>
                                    <p>{review.position}</p>
                                    <p>{review.tourName}</p>
                                </div>
                                <p className="text-center">{review.comments}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Experiences;
