import React from 'react'
import { CiTwitter } from 'react-icons/ci';
import { FaInstagram } from 'react-icons/fa';
import { FiGithub, FiTwitter } from 'react-icons/fi';
import { NavLink } from 'react-router';

export const Footer = () => {
  
  return (
    <footer>
      <div className="max-w-7xl mx-auto flex flex-col space-y-4 sm:space-y-6 items-center justify-center sm:p-8 lg:p-12 p-4">
        <div className="flex items-center space-x-4 flex-wrap">
          <NavLink
            to="/"
            className={({ isActive }) =>
              "hover:text-gray-600 text-sm text-gray-700"
            }
          >
            Home
          </NavLink>

          <NavLink
            to="articles"
            className={({ isActive }) =>
              "hover:text-gray-600 text-sm text-gray-700"
            }
          >
            Articels
          </NavLink>

          <NavLink
            to="articles"
            className={({ isActive }) =>
              "hover:text-gray-600 text-sm text-gray-700"
            }
          >
            Tags
          </NavLink>

          <NavLink
            to="articles"
            className={({ isActive }) =>
              "hover:text-gray-600 text-sm text-gray-700"
            }
          >
            About Us
          </NavLink>

          <NavLink
            to="articles"
            className={({ isActive }) =>
              "hover:text-gray-600 text-sm text-gray-700"
            }
          >
            Contact
          </NavLink>
        </div>

        <div className="flex items-center space-x-4">
          <FiTwitter className="text-gray-500 text-md hover:text-gray-700 cursor-pointer" />
          <FaInstagram className="text-gray-500 text-md hover:text-gray-700 cursor-pointer" />
          <FiGithub className="text-gray-500 text-md hover:text-gray-700 cursor-pointer" />
        </div>
        <div className='text-center text-sm text-gray-400'>&copy;{new Date().getFullYear()} Bloggify. All rights reserved.</div>
      </div>
    </footer>
  );
}
