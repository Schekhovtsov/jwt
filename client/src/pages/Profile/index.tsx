import { useContext, useState } from "react";
import { AuthContext } from "../..";
import { withAuth } from "../../hoc/withAuth";
import { IUser } from "../../models/IUser";
import UserService from "../../services/UserService";

const Page = () => {
  const { store } = useContext(AuthContext);

  const handleLogout = () => {
    store.logout();
  };

  const [users, setUsers] = useState<IUser[]>([]);

  const handleGetUsers = async () => {
    try {
      const response = await UserService.fetchUsers();
      setUsers(response.data);
    } catch (e) {
      console.log(e);
    }
  };


  return (
    <div>
      <h1>Profile page</h1>
      <button onClick={handleLogout}>Logout</button>
      <button onClick={handleGetUsers}>Get users</button>
      {users && users.map((user) => <div key={user.email}>{user.email}</div>)}
    </div>
  );
};

export const ProfilePage = withAuth(Page);