import { Link } from 'react-router-dom';
import IconFacebook from '../Icon/IconFacebook';
import IconInstagram from '../Icon/IconInstagram';
import IconLinkedIn from '../Icon/IconLinkedIn';
import IconTwitter from '../Icon/IconTwitter';

const Footer = () => {
    return (
        <footer className="footer bg-slate-100">
            <div className="content-wrapper grid grid-cols-5 my-0 pt-10 pb-5">
                <div className="col-span-5 md:col-span-2 lg:col-span-1">
                    <h1>Support</h1>
                    <ul>
                        <li>
                            <Link>About us</Link>
                        </li>
                        <li>
                            <Link>Careers</Link>
                        </li>
                        <li>
                            <Link>Help</Link>
                        </li>
                    </ul>
                </div>
                <div className="col-span-5 md:col-span-2 lg:col-span-1">
                    <h1>Community</h1>
                    <ul>
                        <li>
                            <Link>Blog</Link>
                        </li>
                        <li>
                            <Link>Forum</Link>
                        </li>
                        <li>
                            <Link>Press</Link>
                        </li>
                    </ul>
                </div>
                <div className="col-span-5 md:col-span-2 lg:col-span-1">
                    <h1>Legal</h1>
                    <ul>
                        <li>
                            <Link>Terms of Service</Link>
                        </li>
                        <li>
                            <Link>Privacy Policy</Link>
                        </li>
                        <li>
                            <Link>Cookie Policy</Link>
                        </li>
                    </ul>
                </div>
                <div className="col-span-5 md:col-span-2 lg:col-span-2">
                    <h1>Newsletter</h1>
                    <p>Subscribe to our newsletter to get our latest news.</p>
                    <div className="flex gap-2 mt-4">
                        <input type="text" placeholder="Email address" className="p-2 w-full rounded-lg border-2 border-slate-200" />
                        <button className="bg-primary text-white p-2 rounded-lg">Subscribe</button>
                    </div>
                </div>
                <div className="hr-line col-span-5"></div>
                <div className="col-span-5 pt-5">
                    <div className="flex justify-between">
                        <p>© {new Date().getFullYear()} Tourista, Inc.</p>
                        <div className="flex gap-4">
                            <a href="#">
                                <IconTwitter />
                            </a>
                            <a href="#">
                                <IconInstagram />
                            </a>
                            <a href="#">
                                <IconLinkedIn />
                            </a>
                            <a href="#">
                                <IconFacebook />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
