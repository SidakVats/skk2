import React, { useState } from 'react';
import axios from 'axios';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/login', { email, password });
      localStorage.setItem('token', response.data.token);
      // Redirect to dashboard or set user state
    } catch (error) {
      console.error('Error logging in', error);
    }
  };

  return (
    <div className="bg-white px-10 py-14 rounded-3xl border-2 border-gray-200 mx-2">
      <h1 className="text-5xl font-semibold">Welcome Back</h1>
      <p className="font-medium text-lg text-gray-500 mt-4">
        Welcome back! Please enter your details.
      </p>
      <div className="mt-8">
        <div>
          <label htmlFor="email" className="text-lg font-medium">Email</label>
          <input
            type="text"
            className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
            id="email"
            placeholder="Enter Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="text-lg mt-2 font-medium">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
            id="password"
            placeholder="Enter Your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mt-8 flex justify-between items-center">
          <div>
            <input type="checkbox" id="remember" />
            <label htmlFor="remember" className="ml-2 font-medium text-base">
              Remember Me
            </label>
          </div>
          <button className="font-medium text-base text-violet-500">
            Forget Password
          </button>
        </div>
        <div className="flex items-center justify-between my-8">
          <hr className="border-1 border-gray-400 w-full" />
          <span className="px-2 text-gray-500">Note</span>
          <hr className="border-1 border-gray-400 w-full" />
        </div>
        <div>
          <span>
            By Logging In, <p>you agree to <span className="text-violet-500 cursor-pointer">portal.thehouseofskk.com</span> Privacy Policy and Terms Of Use</p>
          </span>
        </div>
        <div className="mt-8 flex flex-col gap-y-4">
          <button
            className="bg-violet-500 text-white text-lg font-bold py-3 rounded-xl active:scale-[0.98] transition-all active:duration-100 hover:scale-[1.01] ease-in-out"
            onClick={handleLogin}
          >
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
