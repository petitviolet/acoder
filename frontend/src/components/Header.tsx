import * as React from 'react';
import style from 'styled-components';
import * as Auth from './Auth';

const Header = () => {
  const {
    authState: { currentUser, token },
    loggedIn,
  } = React.useContext(Auth.Context);

  return (
    <HeaderContainer>
      <HeaderLink>Home</HeaderLink>
      <HeaderLink>About</HeaderLink>
      <HeaderSession>{loggedIn ? 'Log out' : 'Log in'}</HeaderSession>
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = style.header`    
  overflow: hidden;
  background-color: #e9e9e9;
  margin-bottom: 0.5em;
`;

const HeaderLink = style.a`
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
