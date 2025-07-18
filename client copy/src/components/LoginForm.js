import React, { useState } from 'react';
import { loginUser } from '../api/auth';
import { saveToken } from '../utils/token';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser({ email, password });
      saveToken(res.token);
      toast.success('Login successful');
      navigate('/home');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md bg-gray-900 p-8 rounded-xl shadow-md text-white">
      <h2 className="text-2xl font-bold text-center text-green-500 mb-6">Login</h2>

      <div className="relative z-0 w-full mb-6 group">
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-400 appearance-none focus:outline-none focus:ring-0 focus:border-green-500 peer"
          placeholder=" "
          required
        />
        <label
          htmlFor="email"
          className="absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-green-500"
        >
          Email address
        </label>
      </div>

      <div className="relative z-0 w-full mb-4 group">
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-400 appearance-none focus:outline-none focus:ring-0 focus:border-green-500 peer"
          placeholder=" "
          required
        />
        <label
          htmlFor="password"
          className="absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-green-500"
        >
          Password
        </label>
      </div>

      <div className="text-right mb-6">
        <button
          type="button"
          onClick={() => toast.info('Forgot password feature coming soon')}
          className="text-sm text-green-400 hover:underline"
        >
          Forgot password?
        </button>
      </div>

      <button
        type="submit"
        className="w-full bg-green-600 hover:bg-green-700 transition text-white py-2.5 rounded-lg font-semibold text-sm"
      >
        Login
      </button>
    </form>
  );
}
