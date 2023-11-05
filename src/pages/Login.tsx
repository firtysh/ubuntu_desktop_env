import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { AiOutlineUser } from 'react-icons/ai';
import { FormEvent } from 'react';

function Login() {
  const { username, setUsername } = useAuth();
  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    setUsername('Suman');
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
          <div className="">Suman Mandal</div>
          <input
            type="password"
            placeholder="Password"
            name="password"
            id=""
            className="px-3 py-2 mt-6 font-bold text-black rounded-lg outline-red-900"
          />
        </form>
      </div>
    </>
  );
}

export default Login;
