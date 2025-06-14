import React from "react";
import { useNavigate } from "react-router";
import { useGoogleLogin, TokenResponse } from "@react-oauth/google";
import { setCookie } from "typescript-cookie";
import CryptoJS from "crypto-js";
import LoginImage from '../assets/LoginImage.png'
type Props = {};

const Login = (props: Props) => {
  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: (loginRes: TokenResponse) => {
      const encryptedAccesToken = CryptoJS.AES.encrypt(
        loginRes.access_token,
        import.meta.env.VITE_AUTH_SECRET_ENCRYPT
      );
      const expireDate = new Date(Date.now() + loginRes.expires_in * 1000);
      setCookie(
        import.meta.env.VITE_AUTH_COOKIE,
        encryptedAccesToken.toString(),
        { expires: expireDate }
      );
      navigate("/");
    },
    //TODO
    onError: (error) => console.log("Login Failed:", error),
    scope:
      "https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/drive.appdata https://www.googleapis.com/auth/drive.file",
  });

  return (
    <div className="grid grid-cols-3 grid-rows-1 h-screen">
      <div className="flex flex-col items-center p-10 col-span-3 sm:col-span-1">
          <p className="text-4xl text-[#2a5fa3] font-medium">Educational App</p>
          <div className="flex-grow flex flex-col items-center justify-center">
            <p className="text-2xl mb-8">Sign in to your account</p>
            <button
              //className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
              className="text-black bg-gray-100  hover:bg-gray-200 py-2 px-4 rounded-xl font-semibold text-center inline-flex items-center gap-1 cursor-pointer"
              onClick={() => login()}
            >
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 48 48">
              <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
              </svg>
              Sign in with Google 
            </button>
          </div>

          <p>By
            <a className="text-blue-600  cursor-pointer" target="blank" href="https://www.linkedin.com/in/luis-miguel-rosa-332626201/"> Luis Rosa </a>
            &
            <a className="text-blue-600 cursor-pointer" target="blank" href="https://www.linkedin.com/in/sim%C3%B3n-david-garc%C3%ADa-almonte-906826211/"> Simon Garcia</a>
          </p>
      </div>
      <div className="invisible sm:visible sm:col-span-2">
          <img className="w-full h-full object-cover" src={LoginImage} alt="" />
      </div>
    </div>
  );
};

export default Login;
