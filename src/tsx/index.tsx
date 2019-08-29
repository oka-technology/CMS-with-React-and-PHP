/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import ReactDOM from 'react-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import '../index.html';
import '../.htaccess';
import '../api/loginProcess.php';
import '../api/checkWhetherLoggedIn.php';
import '../api/logoutProcess.php';

import LoggedIn from './components/LoggedIn/LoggedIn';
import Login from './components/Login';

import 'sanitize.css';
import 'sanitize.css/typography.css';
import 'sanitize.css/forms.css';
import './global.css';

type data = {
  loggedin: boolean,
  loginUser: string,
  authority: Authority,
}

const wrapper = css`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100%;
`;

const convertAuthorityToObject = (authority: number): Authority => {
  const authorityBinary: string = authority.toString(2);
  const admin: boolean = authorityBinary[2] === '1';
  const editor: boolean = authorityBinary[1] === '1';
  const viewer: boolean = authorityBinary[0] === '1';
  return{ admin, editor, viewer, }
}

const data: data = {
  loggedin: false,
  loginUser: '',
  authority: convertAuthorityToObject(0),
};

const main = async () => {
  await axios.post('./api/checkWhetherLoggedIn.php')
    .then((results) => {
      data.loggedin = results.data.loggedIn;
      data.loginUser = results.data.userID;
      data.authority = convertAuthorityToObject(Number(results.data.authority));
    })
    .catch((error) => {
      console.log(error);
    });

  const App = (): JSX.Element => {
    const [loggedIn, setLoggedIn] = useState<boolean>(data.loggedin);
    const [loginUser, setLoginUser] = useState<string>(data.loginUser);
    const [authority, setAuthority] = useState<Authority>(data.authority);

    const onSetLoggedIn = (bool: boolean): void => {
      setLoggedIn(bool);
    }
    const onSetLoginUser = (name: string): void => {
      setLoginUser(name);
    }
    const onSetAuthority = (authority: number): void => {
      setAuthority(convertAuthorityToObject(authority));
    }

    return(
      <div css={wrapper}>
        <BrowserRouter>
          {location.pathname === '/' ? <Redirect to='/home' /> : null}
          <Switch>
            <Route path='/home' render={ props => <LoggedIn 
              loggedIn={loggedIn} 
              loginUser={loginUser} 
              authority={authority} 
              onSetLoggedIn={onSetLoggedIn} 
              onSetLoginUser={onSetLoginUser} 
              onSetAuthority={onSetAuthority}
              match={props.match}
            />} />
            <Route exact path='/login' render={ props => <Login
              loggedIn={loggedIn} 
              onSetLoggedIn={onSetLoggedIn} 
              onSetLoginUser={onSetLoginUser} 
              onSetAuthority={onSetAuthority}
            />} />    
          </Switch>
        </BrowserRouter>
      </div>
    );
  }

  ReactDOM.render(<App />, document.querySelector('#App'));
}

main();
