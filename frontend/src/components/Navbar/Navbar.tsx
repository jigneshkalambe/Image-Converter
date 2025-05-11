import { Button } from "../ui/button";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <header className="sticky top-0 z-40 border-b bg-background">
            <div className="container flex h-16 items-center justify-between py-4">
                <div className="flex items-center gap-2 font-bold">
                    <span className="text-xl">ImageConverter</span>
                </div>
                <nav className="flex items-center space-x-1">
                    <Button variant="ghost" asChild>
                        <Link to="/" className="text-sm font-medium">
                            Home
                        </Link>
                    </Button>
                    <Button variant="ghost" asChild>
                        <Link to="/about" className="text-sm font-medium text-muted-foreground">
                            About Us
                        </Link>
                    </Button>
                    <Button variant="ghost" asChild>
                        <Link to="/privacy" className="text-sm font-medium text-muted-foreground">
                            Privacy Policy
                        </Link>
                    </Button>
                    <Button variant="ghost" asChild>
                        <Link to="/terms" className="text-sm font-medium text-muted-foreground">
                            Terms
                        </Link>
                    </Button>
                </nav>
            </div>
        </header>
    );
};

export default Navbar;
