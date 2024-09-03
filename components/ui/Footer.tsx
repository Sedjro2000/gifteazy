import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="relative bg-blue-400/10 backdrop-blur-sm text-gray-800 py-8 px-4">
      <div className="max-w-screen-2xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div>
          <h3 className="text-2xl font-bold mb-4">About Us</h3>
          <p className="text-gray-600">
            We are a leading gift platform helping you choose the perfect gift for any occasion. Discover a wide range of gifts for your loved ones.
          </p>
        </div>

        <div>
          <h3 className="text-2xl font-bold mb-4">Quick Links</h3>
          <ul className="text-gray-600">
            <li className="mb-2">
              <a href="/" className="hover:underline">Home</a>
            </li>
            <li className="mb-2">
              <a href="/articles" className="hover:underline">Articles</a>
            </li>
            <li className="mb-2">
              <a href="/list" className="hover:underline">My Lists</a>
            </li>
            <li className="mb-2">
              <a href="/contact" className="hover:underline">Contact Us</a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-2xl font-bold mb-4">Contact</h3>
          <p className="text-gray-600">
            123 Gift Avenue, Cotonou, Bénin<br />
            Phone: +229 99999999<br />
            Email: contact@gift.com
          </p>
        </div>

        <div>
          <h3 className="text-2xl font-bold mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-600 hover:text-gray-800">
              <FaFacebookF size={24} />
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-800">
              <FaTwitter size={24} />
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-800">
              <FaInstagram size={24} />
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-800">
              <FaLinkedinIn size={24} />
            </a>
          </div>
        </div>
      </div>

      <div className="mt-8 border-t border-gray-300 pt-6 text-center text-gray-600">
        <p>&copy; 2024 GiftPlatform. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
