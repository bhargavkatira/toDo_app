import { Login } from "./Login";
export const ProtectRoute = ({ user, children }) => {
  if (user) {
    return children;
  } else {
    return <Login />;
  }
};
