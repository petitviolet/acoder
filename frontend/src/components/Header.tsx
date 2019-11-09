import * as React from 'react';
import style from 'styled-components';
import * as Auth from './Auth';
import { Link } from 'react-router-dom';
import * as Flash from './Flash';

const Header = () => {
  const { loggedIn } = React.useContext(Auth.Context);

  return (
    <HeaderContainer>
      <HeaderLink>Home</HeaderLink>
      <HeaderLink>About</HeaderLink>
      <HeaderSession>{loggedIn ? <LogoutButton /> : <LoginButton />}</HeaderSession>
    </HeaderContainer>
  );
};

const LoginButton = () => {
  return <Link to={'/login'}>Log in</Link>;
};

const LogoutButton = () => {
  const { authDispatch } = React.useContext(Auth.Context);
  const onClick = () => {
    authDispatch({
      type: Auth.ActionType.Logout,
    });
    Flash.success('Log out successfully');
  };

  return (
    <Link to={'/login'} onClick={onClick}>
      Log out
    </Link>
  );
};

export default Header;

const HeaderContainer = style.header`    
  overflow: hidden;
  background-color: #e9e9e9;
  margin-bottom: 0.5em;
`;

const HeaderLink = style.div`
  float: left;
  display: block;
  color: black;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
  
  &:hover {
    background-color: #ddd;
    color: black;
  }
  &.active {
    background-color: #2196F3;
    color: white;
  }
`;

const HeaderSession = style.div`
  float: right;
  padding: 6px;
  margin-top: 8px;
  margin-right: 16px;
  background: #ddd;
  font-size: 17px;
  border: none;
  cursor: pointer;
`;
