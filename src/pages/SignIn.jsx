import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { signIn } from "../lib/auth";

export const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true)
    setError(null)

    try{

      await signIn(email, password);
      navigate('/')

    }catch (error) {
      console.error(error);
      setError(error.message)
    }finally{
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center bg-gray-50 px-4 min-h-screen py-6">
      <form className="max-w-md w-full sm:p-8 p-6 rounded-md bg-white flex flex-col space-y-4 shadow" onSubmit={handleSubmit}>
        {/* Top */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold">Welcome Back</h1>
          <p className="text-gray-600 mt-2">Sign in to access your account</p>
        </div>

        {/* from info */}

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">
            {error}
          </div>
        )}

        <div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-semibold mb-2"
            >
              Email
            </label>

            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-400 focus:border-none rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500 "
              placeholder="your@email.com"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-semibold mb-2"
            >
              Password
            </label>

            <input
              type="password"
              className="w-full px-4 py-2 border border-gray-400 focus:border-none rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500 "
              placeholder="********"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
            <p className="text-xs text-gray-500 mt-1">
              Must be atleast 6 characters
            </p>
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-700 text-white font-bold py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 transition duration-200 cursor-pointer disabled:cursor-not-allowed disabled:bg-orange-400"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </div>
        <div className="text-center mt-6">
          <p className="text-gray-600 text-sm">
            Allready have an Account
            <Link
              to="/signUp"
              className="text-orange-600 hover:text-orange-800 font-semibold"
            >
              {" "}
              Create Account
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};
