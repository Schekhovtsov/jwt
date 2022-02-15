import { useContext, useState } from "react";
import { AuthContext } from "../..";
import { IUser } from "../../models/IUser";
import UserService from "../../services/UserService";

export const ProfilePage = () => {
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

  alert('profile page');

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
      <button onClick={handleGetUsers}>Get users</button>
      {users && users.map((user) => <div key={user.id}>{user.email}</div>)}
    </div>
  );
};
