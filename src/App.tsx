import { BrowserRouter } from 'react-router-dom';
import Router from './routes/Router';
function App() {
  return (
    <>
      <BrowserRouter>
        <div className='flex flex-col bg-[url("./assets/wallpapers/red.jpg")] w-screen h-screen bg-cover bg-no-repeat bg-center text-white'>
          <Router />
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
