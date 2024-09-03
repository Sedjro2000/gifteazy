'use client'
import React from 'react';

interface LoginRegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginRegisterModal: React.FC<LoginRegisterModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="relative bg-white/30 backdrop-blur-md rounded-lg shadow-lg border border-white/20 w-full max-w-md p-6">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white hover:text-gray-300"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold text-center text-white mb-4">Login / Register</h2>
        {/* Login Form */}
        <form className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-white">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 block w-full px-3 py-2 border border-white/30 rounded-md shadow-sm bg-white/20 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-white">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 block w-full px-3 py-2 border border-white/30 rounded-md shadow-sm bg-white/20 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500/70 hover:bg-blue-600/80 text-white font-bold py-2 px-4 rounded-md"
          >
            Login
          </button>
        </form>
        {/* Register Link */}
        <div className="text-center mt-4">
          <p className="text-white">
            Don’t have an account?{' '}
            <a href="#" className="text-blue-300 hover:text-blue-500">
              Register here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginRegisterModal;
