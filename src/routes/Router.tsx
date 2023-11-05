import { Route, Routes } from 'react-router-dom';
import Protected from '../components/Protected';
import Login from '../pages/Login';
import Home from '../pages/Home';

const Router = () => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<Protected />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </>
  );
};

export default Router;
