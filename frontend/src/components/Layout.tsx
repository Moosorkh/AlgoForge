import React from "react";
import { Link } from "react-router-dom";
import { FaCode, FaGithub } from "react-icons/fa";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-primary-700 text-white shadow-lg">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link
              to="/"
              className="flex items-center space-x-2 text-2xl font-bold hover:text-primary-200 transition"
            >
              <FaCode className="text-3xl" />
              <span>AlgoForge</span>
            </Link>
            <div className="flex items-center space-x-6">
              <Link
                to="/"
                className="hover:text-primary-200 transition font-medium"
              >
                Algorithms
              </Link>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary-200 transition"
              >
                <FaGithub className="text-2xl" />
              </a>
            </div>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-8">{children}</main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2025 AlgoForge. Interactive Algorithm Learning Platform.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
