import * as React from 'react';
import User from 'models/User';

const UserComponent = (user: User) => {
  return (
    <div>
      <div>
        <div>id:</div>
        <div>{user.id}</div>
      </div>
      <div>
        <div>name:</div>
        <div>{user.name}</div>
      </div>
      <div>
        <div>email:</div>
        <div>{user.email}</div>
      </div>
    </div>
  );
};

export default UserComponent;
