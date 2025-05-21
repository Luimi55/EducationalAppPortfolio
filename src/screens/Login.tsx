import React from "react";
import { useNavigate } from "react-router";
import { useGoogleLogin, TokenResponse } from "@react-oauth/google";
import { setCookie } from "typescript-cookie";
import CryptoJS from "crypto-js";
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
    <div className="flex h-screen text-[#6E85EF]">
      <div className="m-auto">
        <div className="flex flex-col items-center">
          <p className="text-2xl">Educational App</p>
          <p>De Violeta</p>
          <div className="py-8">
            <button
              className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
              onClick={() => login()}
            >
              Sign in with Google 🚀
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
