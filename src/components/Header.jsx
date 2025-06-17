import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="flex justify-between items-center px-6 py-4 shadow bg-white">
      <div className="text-xl font-bold text-primary">
        <Link to="/">ReceiptPro</Link>
      </div>
      <nav className="flex gap-4">
        <Link to="/login" className="text-sm hover:underline">
          Sign In
        </Link>
        <Link to="/signup" className="text-sm hover:underline">
          Get Started
        </Link>
      </nav>
    </header>
  );
};

export default Header;
