import { defineStore } from "pinia";
import socket from "../plugin/io";
interface OnlineUser {
  userName: string
}
export default defineStore({
  id: "user",
  state: () => ({
    userName: "",
    onlineUser: [] as OnlineUser[],
    rooms: [],
  }),
  actions: {
    setUserName(userName) {
      this.userName = userName;
      socket.emit('connected', { userName: this.userName, userState: 'online' });
    },
    updateUsers(users) {
      this.onlineUser = users.users;
    },
    addUsers(user) {
      this.onlineUser.push(user.user)
    }
  },
});
