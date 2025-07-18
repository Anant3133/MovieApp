import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';
import GridMotion from '../components/GridMotion';
import toast, { Toaster } from 'react-hot-toast';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  const items = [
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6pBxSx1r4W9XLgTGTiudQEeDZ7FWQyRr3iw&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIjFuRXX6Q2CP9BRXJfZRHiaQ5c6ZHkuEMEg&s',
    'https://images-cdn.ubuy.co.in/667de4bda62b91033f67f6e3-john-wick-2-movie-poster-entertainment.jpg',
    'https://www.shutterstock.com/image-photo/beautiful-aladdin-jasmine-character-ride-600nw-2586508807.jpg',
    'https://variety.com/wp-content/uploads/2016/06/cars.jpg?w=1000&h=563&crop=1',
    'Item 6',
    'Item 7',
    'Item 8',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvmTzCpdZgdlJULCVTo6gO_0f-i_FYHkmJXA&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBzyOk2tvONWOi9Y5G79BWpQSze2mkKNK9Aw&s',
    'https://platform.vox.com/wp-content/uploads/sites/2/chorus/uploads/chorus_asset/file/15636673/tfa_poster_wide_header-1536x864-324397389357.0.0.1487920003.jpg?quality=90&strip=all&crop=0,3.4613147178592,100,93.077370564282',
    'https://d1nslcd7m2225b.cloudfront.net/Pictures/1024x536/6/1/2/1119612_Despicable_Me.jpg',
    'https://img10.hotstar.com/image/upload/f_auto,q_auto/sources/r1/cms/prod/8881/808881-i',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAo6fPcaI6CCZMOGyCpu2V9tfD83yifkWk2Q&s',
    'https://static01.nyt.com/images/2007/06/28/arts/29rat600.1.jpg',
    'https://cdn.britannica.com/69/160969-050-F18C2AAC/Daniel-Craig-James-Bond-Casino-Royale.jpg',
    'https://i.ytimg.com/vi/nGrW-OR2uDk/sddefault.jpg',
    'https://resizing.flixster.com/_wLjLskr8hkNBaN0dRJDmNUfsCM=/620x336/v2/https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p13499680_v_h9_ak.jpg',
    'https://m.media-amazon.com/images/S/pv-target-images/e0f80d97c1b474e5e6f9f7c5461c38019f2d7e1dfb7fa0e398a3f3e438801b45.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR00D9jj2h8IsRWubo2e8jhd-0CcNGjXUZ1WQ&s',
    'Item 21',
    'Item 22',
    'Item 23',
    'Item 24',
    'https://miro.medium.com/v2/resize:fit:1200/1*wLCHEekWiQAj-Q-Fg_8zcg.jpeg',
    'https://www.hollywoodreporter.com/wp-content/uploads/2020/06/tmnt2007_01-h_2020.jpg?w=1296&h=730&crop=1',
    'https://i.ytimg.com/vi/d-PcWs2pGv4/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBiv7sfctRpyOrfOwGtzlOmsgXL7A',
    'Item 28',
    'Item 29',
    'Item 30',
  ];

  const handleForgotPassword = () => {
    toast('Password reset coming soon!', {
      icon: '🔒',
      style: {
        background: '#1F2937',
        color: '#fff',
      },
    });
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      <Toaster position="top-right" reverseOrder={false} />
      <GridMotion items={items} />
      <div className="absolute inset-0 bg-black bg-opacity-70 backdrop-blur-sm z-10" />
      <div className="absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2 w-full max-w-md px-4">
        <div className="bg-gray-900 rounded-xl shadow-2xl p-8 animate-fadeIn">
          <div className="flex justify-center mb-6 space-x-8 text-lg font-semibold">
            <button
              className={`pb-2 transition-all ${
                isLogin ? 'border-b-4 border-green-500 text-green-400' : 'text-gray-400'
              }`}
              onClick={() => setIsLogin(true)}
            >
              Login
            </button>
            <button
              className={`pb-2 transition-all ${
                !isLogin ? 'border-b-4 border-green-500 text-green-400' : 'text-gray-400'
              }`}
              onClick={() => setIsLogin(false)}
            >
              Sign Up
            </button>
          </div>
          {isLogin ? (
            <>
              <LoginForm onSuccess={() => toast.success('Login Successful!')} />
            </>
          ) : (
            <>
              <SignupForm onSuccess={() => toast.success('Signup Successful!')} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
