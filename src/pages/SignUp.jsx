import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router';
import { signUp } from "../lib/auth";

export const SignUp = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [ConfirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError(null)

    if(ConfirmPassword !== password){

      setError('Password Do not match!');
      setLoading(false);
      return

    }

    try{

      await signUp(email, password, username)
      setSuccess(true)
      setTimeout(() => {
        navigate('/signIn')
      }, 3000)

    }catch (error){
      console.error(error.message);
      setError(error.message || 'Failed to create account. Please try again');
    }finally{
      setLoading(false)
    }

    setUsername('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');

  }

  if(success){
     return (
       <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
         <div className="max-w-md w-full text-center">
           <div className="bg-white rounded-lg shadow-md p-8">
             <div className="text-green-500 text-5xl mb-4">✓</div>
             <h2 className="text-2xl font-bold mb-2">Account Created!</h2>
             <p className="text-gray-600 mb-4">
               Your account has been created successfully. Please check your
               email for verification.
             </p>
             <p className="text-gray-500 text-sm">
               Redirecting to sign in page in a few seconds...
             </p>
           </div>
         </div>
       </div>
     );
  }

  return (
    <div className="flex items-center justify-center bg-gray-50 px-4 min-h-screen py-6">
      <form
        onSubmit={handleSubmit}
        className="max-w-md w-full sm:p-8 p-6 rounded-md bg-white flex flex-col space-y-4 shadow"
      >
        {/* Top */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold">Create an Account</h1>
          <p className="text-gray-600 mt-2">
            Join our community and start sharing your ideas
          </p>
        </div>

        {/* from info */}

        <div>
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">
              {error}
            </div>
          )}

          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-gray-700 text-sm font-semibold mb-2"
            >
              Username
            </label>

            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-400 focus:border-none rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500 "
              placeholder="johndoe"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-semibold mb-2"
            >
              Email
            </label>

            <input
              type="email"
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

          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block text-gray-700 text-sm font-semibold mb-2"
            >
              Confirm Password
            </label>

            <input
              type="password"
              className="w-full px-4 py-2 border border-gray-400 focus:border-none rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500 "
              placeholder="********"
              id="confirmPassword"
              value={ConfirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-700 text-white font-bold py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 transition duration-200 cursor-pointer disabled:cursor-not-allowed disabled:bg-orange-400"
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </div>
        <div className="text-center mt-6">
          <p className="text-gray-600 text-sm">
            Allready have an Account
            <Link
              to="/signIn"
              className="text-orange-600 hover:text-orange-800 font-semibold"
            >
              {" "}
              Sign in
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
