import useAuth from "@/hooks/useAuth";
import { loginUser } from "@/methods/auth";
import { useRouter } from "next/router";
import React, { useState, ChangeEvent } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const { refetch } = useAuth();

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async () => {
    if (!validateEmail(email)) {
      console.log("Invalid email");
      return;
    }

    const result = await loginUser(email, password).then(() => {
      window.location.reload();
      router.push("/Finance");
    });
    // Perform login logic here
    console.log("result:", result);
    console.log("Password:", password);
  };

  const validateEmail = (email: string) => {
    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <div className="w-screen h-screen bg-[#F6F6F6] flex items-center justify-center">
      <div className="max-w-sm mx-auto">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 font-medium mb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            className="border-gray-300 border rounded px-4 py-2 w-full"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 font-medium mb-2"
          >
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className="border-gray-300 border rounded px-4 py-2 w-full"
              value={password}
              onChange={handlePasswordChange}
            />
            <button
              className="absolute top-1/2 right-3 transform -translate-y-1/2 bg-transparent text-gray-500 focus:outline-none"
              onClick={handleTogglePasswordVisibility}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>
        <button
          className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
