import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { AiOutlineUser } from 'react-icons/ai';
import { FormEvent, useRef } from 'react';

function Login() {
  const { username, setUsername } = useAuth();
  const usernameRef = useRef<HTMLInputElement>(null);
  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    setUsername(usernameRef.current?.value || '');
  };
  return username ? (
    <Navigate to="/" />
  ) : (
    <>
      <div
        className="flex items-center justify-center flex-1 w-full h-full text-white backdrop-blur-md"
        id="blur_overlay"
      >
        <form onSubmit={handleLogin} className="flex flex-col items-center justify-center gap-3 p-4 text-center">
          <div className="text-[100px] p-4  rounded-full bg-[rgba(255,255,255,0.2)] overflow-hidden">
            <AiOutlineUser />
          </div>
          {username ? (
            <div className="font-bold">{username}</div>
          ) : (
            <input
              ref={usernameRef}
              type="text"
              placeholder="Username"
              name="username"
              id="username"
              required
              className="px-3 py-2 mt-6 font-bold text-white bg-transparent border-2 border-white rounded-lg outline-none"
            />
          )}
          <input
            type="password"
            placeholder="Password"
            name="password"
            id="password"
            required
            className="px-3 py-2 mt-2 font-bold text-black rounded-lg outline-red-900"
          />
          <input type="submit" hidden />
        </form>
      </div>
    </>
  );
}

export default Login;
