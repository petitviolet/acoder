import * as React from 'react';
import User from '../models/User';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUser} from '@fortawesome/free-solid-svg-icons';
import * as bs from "react-bootstrap";
import style from 'styled-components';

const UserComponent = (user: User) => {
  return (
    <Container>
      <div>
        <UserIcon/>
        <UserName>{user.name}</UserName>
      </div>
    </Container>
  );
};

const Icon = () => <FontAwesomeIcon icon={faUser}/>;
const UserName = style.div`
  padding-left: 12px;
`;
const UserIcon = style(Icon)`
`;
const Container = style(bs.Container)`
  display: flex;
  padding: 10px;
  font-size: 32px;
  height: 2em;
  line-height: 16px;
  div {
    margin-left: 16px;
    display: inline-block; 
  }
`;

export default UserComponent;
