import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { store } from './store/store';

import { MainPage, BookPage, Terms } from './pages';
import { Layout } from './layouts/layout/layout';
import { LayoutMainPage } from './layouts';
import { LoaderWindow } from './components/popups/loader/loader';

import './index.scss';
import { AuthPage } from './pages/auth';
import { FormWrapper } from './components/widgets/forms/wrapper/form-wrapper';
import { LoginForm } from './components/widgets/forms/login/login-form';
import { RegisterForm } from './components/widgets/forms/register/register-form';
import { ForgotFormFirst } from './components/widgets/forms/forgot/form-first';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <Provider store={store}>
      <HashRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route element={<LayoutMainPage />}>
              <Route path='/' element={<Navigate to='books/all' />} />
              <Route path='/books/:category' element={<MainPage />} />
              <Route path='/terms' element={<Terms type='terms' />} />
              <Route path='/contract' element={<Terms type='contract' />} />
            </Route>
            <Route path='/books/:category/:booksId' element={<BookPage />} />
          </Route>
          <Route path='/' element={<AuthPage />}>
            <Route path='/' element={<FormWrapper />}>
              <Route path='/auth' element={<LoginForm />} />
              <Route path='/registration' element={<RegisterForm />} />
              <Route path='/forgot-pass' element={<ForgotFormFirst />} />
            </Route>
          </Route>
        </Routes>
      </HashRouter>
      <LoaderWindow />
    </Provider>
  </StrictMode>
);
