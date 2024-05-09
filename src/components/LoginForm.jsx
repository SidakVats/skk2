import React from "react";

const LoginForm = () => {
  return (
    <div className="bg-white px-10 py-20 rounded-3xl border-2 border-gray-200 mx-2">
      <h1 className="text-5xl font-semibold">Welcome Back</h1>
      <p className="font-medium text-lg text-gray-500 mt-4">
        Welcome back! Please enter your details.
      </p>
      <div className="mt-8">
        <div>
          <label htmlFor="email" className="text-lg font-medium">
            Email
          </label>
          <input
            type="text"
            className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
            id="email"
            placeholder="Enter Your Email"
          />
        </div>
        <div className="text-lg mt-2 font-medium">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
            id="password"
            placeholder="Enter Your Password"
          />
        </div>
        <div className="mt-8 flex justify-between items-center">
          <div>
            <input type="checkbox" id="remember"/>
            <label htmlFor="remember" className="ml-2 font-medium text-base">
              Remember Me
            </label>
          </div>
          <button className="font-medium text-base text-violet-500">
            Forget Password
          </button>
        </div>
        <div className="mt-8 flex flex-col gap-y-4">
          <button className="bg-violet-500 text-white text-lg font-bold py-3 rounded-xl active:scale-[0.98] transition-all active:duration-100 hover:scale-[1.01] ease-in-out ">
            Sign in
          </button>
          {/* <button className="py-3 rounded-xl active:scale-[0.98] transition-all active:duration-100 hover:scale-[1.01] ease-in-out border-2 border-gray-200">
            Sign in with Google
          </button> */}
        </div>
        <div className="mt-8 flex justify-between items-center">
          <p className="font-medium text-base">Don't have an account?</p>
          <button onClick={() => (window.location.href = "/signup")}   className="text-white text-base font-medium ml-2 bg-violet-500 p-2 rounded-xl active:scale-[0.98] transition-all active:duration-100 hover:scale-[1.01] ease-in-out ">
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
