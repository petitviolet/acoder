import * as React from 'react';
import style from 'styled-components';
import * as Auth from './Auth';
import { Link as rLink } from 'react-router-dom';
import * as Flash from './Flash';

const Header = () => {
  const { loggedIn } = React.useContext(Auth.Context);

  return (
    <HeaderContainer>
      {/* left */}
      <HeaderLeft>
        <HeaderLinkComponent path={'/'} text={'Home'} />
      </HeaderLeft>
      <HeaderLeft>
        <HeaderLinkComponent path={'/me'} text={'MyPage'} />
      </HeaderLeft>

      {/* right */}
      {loggedIn ? (
        <>
          <HeaderRight>
            <LogoutButton />
          </HeaderRight>
          <HeaderRight>
            <HeaderLinkComponent path={'/snippets/new'} text={'Create snippet'} />
          </HeaderRight>
        </>
      ) : (
        <>
          <HeaderRight>
            <SignUpButton />
          </HeaderRight>
          <HeaderRight>
            <LoginButton />
          </HeaderRight>
        </>
      )}
    </HeaderContainer>
  );
};

const SignUpButton = () => {
  return <Link to={'/sign_up'}>Sign up</Link>;
};
const LoginButton = () => {
  return <Link to={'/login'}>Log in</Link>;
};

const LogoutButton = () => {
  const { authActions } = React.useContext(Auth.Context);
  const onClick = () => {
    authActions.logout();
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

const HeaderLinkComponent = (props: { path: string; text: string }) => <Link to={props.path}>{props.text}</Link>;

const Link = style(rLink)`
  text-decoration: none;
  &:focus, &:hover, &:visited, &:link, &:active {
      text-decoration: none;
  }
`;
const HeaderLink = style.div`
  display: block;
  color: black;
  text-align: center;
  padding: 14px 16px;
  font-size: 17px;
  cursor: pointer;
  
  &:hover {
    background-color: #ddd;
    color: black;
  }
  &.active {
    background-color: #2196F3;
    color: white;
  }
`;
const HeaderLeft = style(HeaderLink)`
  float: left;
`;

const HeaderRight = style(HeaderLink)`
  float: right;
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
