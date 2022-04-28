import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import EntriesDisplay from './EntriesDisplay';
import AddUpdateForm from './AddUpdate';
import TopPanel from './TopPanel';
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';
import { useAuthContext } from '../context/auth/authState';
import storageService from '../utils/localStorageHelpers';
import { Container } from '@material-ui/core';

const Routess = () => {
  const [{ user }] = useAuthContext();
  const loggedUser = storageService.loadUser() || user;

  return (
    <Container disableGutters>
      <Routes>
        <Route exact path="/">
          {loggedUser ? (
            <>
              <TopPanel />
              <EntriesDisplay />
            </>
          ) : (
            <Navigate to="/login" />
          )}
        </Route>
        <Route exact path="/add_update">
          {loggedUser ? <AddUpdateForm /> : <Navigate to="/login" />}
        </Route>
        <Route exact path="/register">
          <RegisterForm />
        </Route>
        <Route exact path="/login">
          <LoginForm />
        </Route>
      </Routes>
    </Container>
  );
};

export default Routess;
