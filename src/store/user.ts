import { defineStore } from "pinia";
import socket from "../plugin/io";
interface OnlineUser {
  id: string
  userName: string
  userStatus: string
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
      socket.emit('connected', { userName: this.userName });
    },
    updateUsers(users) {
      this.onlineUser = users.users;
    },
    addUsers(user) {
      this.onlineUser.push(user.user)
    }
  },
});
