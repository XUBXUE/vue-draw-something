<template>
  <div class="chat-board">
    <div class="chat-record">
      <ul class="message-wrapper">
        <li class="message-item" v-for="(msg, index) in messages" :key="index">
          <div>{{ msg.userId }}({{msg.time}}):</div>
          <div>{{ msg.content }}</div>
        </li>
      </ul>
    </div>
    <input class="chat-input" maxlength="20" :value="message" type="text" @keyup.enter="sendMessage" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { formatDate } from '../utils';
interface Message {
  content: string;
  userId: string;
  time: String;
}
let message = ref<string>();
const messages = ref<Message[]>([]);
function sendMessage(event: any) {
  let value = event!.target.value;
  messages.value.push({
    content: value,
    userId: 'xbx',
    time: formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss')
  });
  message.value = '';
}
</script>

<style lang="scss" scoped>
.chat-board {
  position: fixed;
  display: flex;
  flex-direction: column;
  bottom: 30px;
  left: 30px;
  width: 50vw;
  height: 40vh;
  padding: 10px 20px 20px;
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.1);
  z-index: 20;
  .chat-record {
    flex: 1;
    height: 0;
    margin: 10px 0;
    .message-wrapper {
      display: flex;
      flex-direction: column;
      height: 100%;
      font-size: 14px;
      overflow-y: auto;
      .message-item {
        margin-bottom: 5px;
        display: flex;
        align-items: center;
      }
    }
  }
  .chat-input {
    width: 100%;
    padding: 10px;
    margin-top: auto;
    border-radius: 10px;
    box-sizing: border-box;
    outline: none;
    border: 1px solid #ececec;
  }
}
</style>