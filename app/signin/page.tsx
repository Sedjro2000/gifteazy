'use client'
import { FC } from "react";
import Image from "next/image";
import { FaGoogle, FaGithub, FaFacebook } from "react-icons/fa";
import { useState } from "react";


const Auth: FC = () => {
    const [isSignUp ,setIsSignUp] = useState <boolean> (false);
    console.log("before",isSignUp)

    const toggleSignUp  = (): void => {
        
        setIsSignUp ( prev => !prev)
    }
console.log("after",isSignUp)
  
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#b92b27] via-[#1565C0] to-[#f12711] p-4">
      <div className="flex w-full max-w-6xl rounded-3xl bg-white bg-opacity-10 shadow-lg backdrop-blur-md lg:h-[70vh] lg:flex-row md:flex-col itmes-center ">
        {/* Left Section */}
        <div className="w-full p-8 lg:w-1/2">
          {/**Div du haut avant le form */}
          <div className="mb-8 text-white space-y-6">
            <h2 className="mb-2 text-3xl font-bold"> {isSignUp ? "Create an account" : "Welcome Back"} </h2>
            <p className="text-sm"> { isSignUp ? "Signup to get started":"Please enter your credentials"} </p>
          </div>
          <form className="space-y-8 flex flex-col justifiy-center p-8">
            <div>
              <label htmlFor="email" className="block text-sm text-white">
                Email
              </label>
              <input
                id="email"
                type="email"
                className="w-full rounded-lg border-none bg-black bg-opacity-40 px-4 py-2 text-white placeholder-gray-400 focus:outline-none"
                placeholder="Johndoe@gmail.com"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm text-white">
                Password
              </label>
              <input
                id="password"
                type="password"
                className="w-full rounded-lg border-none bg-black bg-opacity-40 px-4 py-2 text-white placeholder-gray-400 focus:outline-none"
                placeholder="********"
              />
            </div>
            {isSignUp && (
              <div>
                <label htmlFor="confirm-password" className="block text-sm text-white">
                  Confirm Password
                </label>
                <input
                  id="confirm-password"
                  type="password"
                  className="w-full rounded-lg border-none bg-black bg-opacity-40 px-4 py-2 text-white placeholder-gray-400 focus:outline-none"
                  placeholder="********"
                />
              </div>
            )}

{!isSignUp && (
              <div className="flex items-center justify-between text-sm text-white gap-2 md:gap-0">
                <div>
                  <input type="checkbox" id="keep-logged-in" />
                  <label htmlFor="keep-logged-in" className="ml-2">
                    Keep me logged in
                  </label>
                </div>
                <a href="#" className="text-white hover:underline">
                  Forgot Password
                </a>
              </div>
            )}
    
            <button
              type="submit"
              className="w-full rounded-lg bg-gradient-to-r from-[#f12711] to-[#f5af19] py-3 text-white hover:from-[#f5af19] hover:to-[#f12711]"
            >
              { isSignUp ? "Sign Up": "Sign In " }
            </button>
          </form>
          <div className="mt-8 flex justify-center space-x-6">
            <button className="text-3xl text-white hover:text-gray-300">
              <FaGoogle size={32} />
            </button>
            <button className="text-3xl text-white hover:text-gray-300">
              <FaGithub size={32} />
            </button>
            <button className="text-3xl text-white hover:text-gray-300">
              <FaFacebook size={32 } />
            </button>
          </div>
          <div className="mt-4 text-center">
            <p className="text-sm text-white">
              {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
              <button onClick={toggleSignUp} className="text-blue-500 hover:underline">
                {isSignUp ? "Sign in" : "Sign up"}
              </button>
            </p>
          </div>
        </div>
        {/* Right Section */}
        <div className="relative hidden w-1/2 p-8 lg:block opacity-80 shadow-lg rounded-3xl">
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent  rounded-3xl"></div>
          <Image
            src="/imagekdo.jpg"
            layout="fill"
            objectFit="cover"
            alt="Background Image"
            className="rounded-3xl"
          />
        </div>
      </div>
      </div>
    
  );
};

export default Auth;