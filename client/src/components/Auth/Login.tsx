import {  useState } from "react";
import { useAuthContext } from "../../hooks/useAuth";
import ContinuewithGoogle from "./ContinuewithGoogle";
import { NavLink, useNavigate } from "react-router-dom";
import { usePost } from "../../context/apiContext";
import { AuthResponse } from "../../types/apiType";
// import { usePost } from "../../context/apiContext";
// import type {  AuthResponse } from "../../types/apiType";
export default function Login() {
  const [formdata, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const { isAuthenticated, setIsAuthenticated,setUser } = useAuthContext();
  const handleChange = async (e: {
    target: { name: string; value: string | number };
  }) => {
    const { name, value } = e.target;
    setFormData({
      ...formdata,
      [name]: value,
    });
  };
  const {
    
    loading,
    error,
    execute: login,
  } = usePost<AuthResponse>("/auth/login");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await login(formdata);
      setIsAuthenticated(true);
      setMessage(response.user);
      setUser(response?.data);

        navigate("/");

    } catch {
      console.error("Login failed");
    }
  };


  return (
    <div className="dark:bg-colorGradient2 ">
      {message && isAuthenticated ? (
        <div className="flex justify-center items-center dark:text-white min-h-screen lg:text-2xl md:text-xl text-lg font-bold">
          <h1>Welcome Back 👋 {message} !!</h1>
        </div>
      ) : (
        <div className=" min-h-screen flex  justify-center items-center py-8 ">
          <div className=" flex items-center justify-center p-11 flex-col border-2 border-gray-400 max-sm:border-none w-full max-w-md   rounded-lg ">
            <h1 className="text-2xl mb-3 dark:text-gray-300">
          
              Hello <b className="dark:text-white">Notework User </b>
            </h1>
            <span className="text-gray-700 text-base dark:text-gray-400">
          
              Login to your account and use notework at its full potential.{" "}
            </span>
            <form className="p-6 " onSubmit={handleSubmit}>
              <div className="flex flex-col gap-1.5 dark:text-white">
                <label
                  htmlFor="email address"
                  className="text-gray-600 dark:text-gray-300"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formdata.email}
                  className="w-100 mt-2 py-3 px-3 rounded-lg bg-white  border-gray-400 dark:text-white  font-semibold dark:placeholder-gray-400 placeholder-gray-500 border  dark:bg-colorGradient1 focus:ring-1 dark:focus:ring-gray-400 focus:ring-colorGradient2"
                  placeholder="you@example.com"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="flex flex-col py-4 gap-1.5 dark:text-white">
                <label
                  htmlFor=" password"
                  className="text-gray-600 dark:text-gray-300"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formdata.password}
                  placeholder="••••••••"
                  className="w-100 mt-2 py-3 px-3 rounded-lg bg-white border border-gray-400 dark:placeholder-gray-400 placeholder-gray-500 dark:text-white font-semibold dark:bg-colorGradient1"
                  onChange={handleChange}
                  required
                />
              </div>
          
           {error && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="flex">
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">
                    Login failed
                  </h3>
                  <div className="mt-2 text-sm text-red-700">
                    {error.message}
                  </div>
                </div>
              </div>
            </div>
          )}

              <button
                type="submit"
                className="bg-colorGradient2  text-white font-bold py-3 px-6 rounded-lg mt-3 hover:bg-black flex items-center justify-center dark:bg-colorGradient1 w-full"
                disabled={loading}
              >
               {loading ? "Loging In..." : "Login"} 
              </button>

              <NavLink to="/forgotPassword">
                <p className=" flex justify-center  mt-2 py-2 underline text-blue-600 dark:text-blue-400">
                  Forgot Password ?
                </p>{" "}
              </NavLink>
              <div className="relative mt-2">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-400" />
                </div>
                <div className="relative flex justify-center ">
                  <span className="px-2 bg-white dark:bg-colorGradient2 text-gray-500">
                    Or continue with
                  </span>
                </div>
              </div>
              <ContinuewithGoogle />
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
