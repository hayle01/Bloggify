import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { FiUser } from "react-icons/fi";
import { Link, NavLink } from "react-router";
import { useAuth } from "../Context/AuthContext";

export const Header = () => {
  const [isMenuOpen, setisMenuOpen] = useState(false);
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const { isLoggedIn, profile, Logout } = useAuth();

  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* left */}
          <div className="flex">
            {/* logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-2xl font-bold text-orange-600">
                Bloggify
              </Link>
            </div>

            <nav className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "inline-flex items-center px-1 pt-1 text-sm  text-gray-900 border-b-2 border-orange-500"
                    : "inline-flex items-center px-1 pt-1 text-sm  text-gray-900"
                }
              >
                Home
              </NavLink>

              <NavLink
                to="articles"
                className={({ isActive }) =>
                  isActive
                    ? "inline-flex items-center px-1 pt-1 text-sm  text-gray-900 border-b-2 border-orange-500"
                    : "inline-flex items-center px-1 pt-1 text-sm  text-gray-900"
                }
              >
                Articels
              </NavLink>

              {isLoggedIn && (
                <>
                  <NavLink
                    to="editor"
                    className={({ isActive }) =>
                      isActive
                        ? "inline-flex items-center px-1 pt-1 text-sm  text-gray-900 border-b-2 border-orange-500"
                        : "inline-flex items-center px-1 pt-1 text-sm  text-gray-900"
                    }
                  >
                    Write
                  </NavLink>

                  <NavLink
                    to="manage-articles"
                    className={({ isActive }) =>
                      isActive
                        ? "inline-flex items-center px-1 pt-1 text-sm  text-gray-900 border-b-2 border-orange-500"
                        : "inline-flex items-center px-1 pt-1 text-sm  text-gray-900"
                    }
                  >
                    My Articels
                  </NavLink>
                </>
              )}
            </nav>
          </div>

          {/* right */}
          <div className="flex items-center justify-between space-x-4">
            {isLoggedIn ? (
              <div className="flex items-center space-x-2">
                <div className="text-sm text-gray-700">
                  <span>
                    Hello, {profile?.username}
                  </span>
                </div>

                <div className="relative">
                  <button
                    onMouseEnter={() => setIsDropDownOpen(true)}
                    onClick={() => setIsDropDownOpen(!isDropDownOpen)}
                    className="w-8 h-8 rounded-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                  >
                    {profile ? (
                      <img src={profile.avator_url} className="w-8 h-8 object-cover border border-gray-200 rounded-full" />
                    ) : (
                      <FiUser className="w-8 h-8" />
                    )}
                  </button>

                  {isDropDownOpen && (
                    <div
                      className="absolute right-0 mt-1 w-48 rounded shadow z-10 bg-white border border-gray-200 hidden sm:flex flex-col"
                      onMouseLeave={() => setIsDropDownOpen(false)}
                    >
                      <Link
                        to="profile"
                        className="text-sm px-4 py-2 text-gray-700 hover:bg-gray-50 border-b border-gray-100"
                      >
                        Your Profile
                      </Link>
                      <Link
                        to="/manage-articles"
                        className="text-sm px-4 py-2 text-gray-700 hover:bg-gray-50 border-b border-gray-100"
                      >
                        Manage Articles
                      </Link>
                      <button onClick={Logout} className="text-sm text-left cursor-pointer px-4 py-2 text-gray-700 hover:bg-gray-50 ">
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="signIn"
                  className="hidden  sm:inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm  rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                >
                  SignIn
                </Link>

                <Link
                  to="signUp"
                  className="hidden sm:inline-flex items-center justify-center px-4 py-2 border text-sm  rounded-md text-orange-600 bg-white border-orange-600 hover:bg-orange-50 focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-orange-500"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* humberger menu */}
            <div className="sm:hidden flex items-center justify-center">
              <button
                className="bg-gray-100 py-1 px-2 border border-gray-300 rounded-md text-gray-400"
                onClick={() => setisMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? (
                  <FaXmark className="w-6 h-6 block" />
                ) : (
                  <FaBars className="w-6 h-6 block" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* mobile menu */}
        <div className="sm:hidden">
          {isMenuOpen && (
            <div className="bg-white transition-all duration-200 ease-in">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "block px-4 py-3 hover:bg-gray-50 border-b border-b-gray-100 text-sm font-medium text-gray-900 border-l-2 border-orange-500"
                    : "block px-4 py-3 hover:bg-gray-50 border-b border-b-gray-100 text-sm  text-gray-900"
                }
              >
                Home
              </NavLink>

              <NavLink
                to="articles"
                className={({ isActive }) =>
                  isActive
                    ? "block px-4 py-3 hover:bg-gray-50 border-b border-b-gray-100 text-sm  text-gray-900 border-l-2 border-orange-500"
                    : "block px-4 py-3 hover:bg-gray-50 border-b border-b-gray-100 text-sm  text-gray-900"
                }
              >
                Articels
              </NavLink>

              {isLoggedIn && (
                <>
                  <NavLink
                    to="write"
                    className={({ isActive }) =>
                      isActive
                        ? "block px-4 py-3 hover:bg-gray-50 border-b border-b-gray-100 text-sm  text-gray-900 border-l-2 border-orange-500"
                        : "block px-4 py-3 hover:bg-gray-50 border-b border-b-gray-100 text-sm  text-gray-900"
                    }
                  >
                    Write
                  </NavLink>

                  <NavLink
                    to="myarticles"
                    className={({ isActive }) =>
                      isActive
                        ? "block px-4 py-3 hover:bg-gray-50 border-b border-b-gray-100 text-sm  text-gray-900 border-l-2 border-orange-500"
                        : "block px-4 py-3 hover:bg-gray-50 border-b border-b-gray-100 text-sm  text-gray-900"
                    }
                  >
                    My Articels
                  </NavLink>

                  <NavLink
                    to="/profile"
                    className={({ isActive }) =>
                      isActive
                        ? "block px-4 py-3 hover:bg-gray-50 border-b border-b-gray-100 text-sm  text-gray-900 border-l-2 border-orange-500"
                        : "block px-4 py-3 hover:bg-gray-50 border-b border-b-gray-100 text-sm  text-gray-900"
                    }
                  >
                    Your Profile
                  </NavLink>

                  <NavLink
                    to="manage-articels"
                    className={({ isActive }) =>
                      isActive
                        ? "block px-4 py-3 hover:bg-gray-50 border-b border-b-gray-100 text-sm  text-gray-900 border-l-2 border-orange-500"
                        : "block px-4 py-3 hover:bg-gray-50 border-b border-b-gray-100 text-sm  text-gray-900"
                    }
                  >
                    Manage Articles
                  </NavLink>
                  <button onClick={Logout} className="block w-full text-start cursor-pointer active:border-l-2 active:border-l-orange-600 px-4 py-3 hover:bg-gray-50 border-b border-b-gray-100 text-sm  text-gray-900">
                    Sign Out
                  </button>
                </>
              )}

              {!isLoggedIn && (
                <>
                  <NavLink
                    to="signIn"
                    className={({ isActive }) =>
                      isActive
                        ? "block px-4 py-3 hover:bg-gray-50 border-b border-b-gray-100 text-sm  text-gray-900 border-l-2 border-orange-500"
                        : "block px-4 py-3 hover:bg-gray-50 border-b border-b-gray-100 text-sm  text-gray-900"
                    }
                  >
                    Sign In
                  </NavLink>

                  <NavLink
                    to="signUp"
                    className={({ isActive }) =>
                      isActive
                        ? "block px-4 py-3 hover:bg-gray-50 border-b border-b-gray-100 text-sm  text-gray-900 border-l-2 border-orange-500"
                        : "block px-4 py-3 hover:bg-gray-50 border-b border-b-gray-100 text-sm  text-gray-900"
                    }
                  >
                    Sign Up
                  </NavLink>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
