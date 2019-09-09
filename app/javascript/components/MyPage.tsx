import * as React from "react";
import * as Auth from "./Auth";

const MyPageComponent = () => {
  const { authState } = React.useContext(Auth.Context);
  const user = authState.currentUser;

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

export default MyPageComponent;
