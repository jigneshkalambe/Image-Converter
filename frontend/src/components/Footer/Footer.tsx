import { Button } from "../ui/button";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="border-t py-6 md:py-0">
            <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
                <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">© {new Date().getFullYear()} ImageConverter. All rights reserved.</p>
                <div className="flex items-center gap-1">
                    <Button variant="link" size="sm" asChild>
                        <Link to="/about" className="text-sm font-medium text-muted-foreground">
                            About Us
                        </Link>
                    </Button>
                    <Button variant="link" size="sm" asChild>
                        <Link to="/privacy" className="text-sm font-medium text-muted-foreground">
                            Privacy
                        </Link>
                    </Button>
                    <Button variant="link" size="sm" asChild>
                        <Link to="/terms" className="text-sm font-medium text-muted-foreground">
                            Terms
                        </Link>
                    </Button>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
