import ReactDOM from 'react-dom';
import './index.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';

import App from './App';
import LoginRegister from './routes/login_register';

ReactDOM.render(
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='login' element={<LoginRegister buttonContent='Login' apiRoute='/users/token' linkTo='register' />} />
        <Route path='register' element={<LoginRegister buttonContent='Register' apiRoute='/users/create' linkTo='login' />} />
      </Routes>
    </BrowserRouter>,
  document.getElementById('root')
);