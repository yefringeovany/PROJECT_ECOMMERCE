import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white shadow p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Mi App</h1>
      <div>
        <Link
          to="/login"
          className="text-blue-500 hover:text-blue-700 font-medium"
        >
          Login
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
