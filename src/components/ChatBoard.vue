<template>
  <div class="chat-board">
    <div class="chat-record">
      <ul class="message-wrapper">
        <li class="message-item" v-for="(msg, index) in messages" :key="index">
          <div class="user">{{ msg.userId }}({{msg.time}}):</div>
          <div class="content">{{ msg.content }}</div>
        </li>
      </ul>
    </div>
    <input ref="chatInput" class="draw-input mtA" :value="message" type="text" @keyup.enter.stop="sendMessage" />
  </div>
</template>

<script setup lang="ts">
import { nextTick, ref } from 'vue';
import { formatDate } from '../utils';
interface Message {
  content: string;
  userId: string;
  time: String;
}
let message = ref<string>();
const messages = ref<Message[]>([]);
const chatInput = ref();

function sendMessage(event: any) {
  let value = event.target.value;
  if (!value) return;
  messages.value.push({
    content: value,
    userId: 'xbx',
    time: formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss')
  });
  message.value = '';
}

async function focusInput() {
  await nextTick()
  chatInput.value.focus();
};

defineExpose({
  focusInput
});
</script>

<style lang="scss" scoped>
.chat-board {
  position: fixed;
  display: flex;
  flex-direction: column;
  bottom: 30px;
  left: 30px;
  width: 40vw;
  height: 40vh;
  padding: 10px 20px 20px;
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.3);
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
        .user {
          flex-shrink: 0;
        }
        .content {
          margin-left: 5px;
        }
      }
    }
  }
}
</style>