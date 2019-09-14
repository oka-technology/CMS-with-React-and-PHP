/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { useEffect, Fragment } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Header from './Header';
import Footer from './Footer';
import SideBar from './SideBar/SideBar';
import Users from './Main/Users/Users';
import NewUserRegistration from './Main/NewUserRegistration/NewUserRegistration';
import ContentList from './Main/ContentList/ContentList';

const insideWrapper = css`
  display: flex;
  flex: 1;
`;

const mainStyle = css`
  flex-grow: 1;
  margin: 0 auto 0 0;
  max-width: 100rem;
  padding: 0 2rem 2rem;
`;

type LoggedInProps = {
  loggedIn: boolean;
  loginUser: string;
  permission: Permission;
  onSetLoggedIn: (bool: boolean) => void;
  onSetLoginUser: (name: string) => void;
  onSetPermission: (permission: number) => void;
  urlOfTopPage: string;
};

const LoggedIn = ({
  loggedIn,
  loginUser,
  permission,
  onSetPermission,
  onSetLoggedIn,
  onSetLoginUser,
  urlOfTopPage,
}: LoggedInProps): JSX.Element => {
  useEffect(() => {
    if (loggedIn) {
      document.title = 'ログイン成功';
    }
  }, [loggedIn]);

  return (
    <Fragment>
      <Header
        loginUser={loginUser}
        permission={permission}
        onSetLoggedIn={onSetLoggedIn}
        onSetLoginUser={onSetLoginUser}
        onSetPermission={onSetPermission}
      />
      <div css={insideWrapper}>
        <SideBar permission={permission} urlOfTopPage={urlOfTopPage} />
        <main css={mainStyle}>
          <Switch>
            <Route
              path={`${urlOfTopPage}/users`}
              render={() => <Users urlOfTopPage={urlOfTopPage} permission={permission} />}
            />
            <Route
              path={`${urlOfTopPage}/newUserRegistration`}
              render={() => <NewUserRegistration urlOfTopPage={urlOfTopPage} permission={permission} />}
            />
            <Route
              path={`${urlOfTopPage}/contentList`}
              render={() => <ContentList urlOfTopPage={urlOfTopPage} permission={permission} />}
            />
            <Redirect to="/home" />
          </Switch>
        </main>
      </div>
      <Footer />
      {loggedIn ? null : <Redirect to="/login" />}
    </Fragment>
  );
};

export default LoggedIn;
