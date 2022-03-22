import io from "socket.io-client";
const socket = io("http://127.0.0.1:3000", {
  path: "", // socket.io库默认服务端path为/socket.io
  transports: ["websocket", "xhr-polling", "jsonp-polling"],
});
export default socket;