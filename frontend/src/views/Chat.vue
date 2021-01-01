<template>
  <div class="chat">
    <h1>chat</h1>

    <form id="messageForm" @submit.prevent="sendRecord">
      <input id="inputMsg" autocomplete="off" v-model="inputMsg" />
      <button>Send</button>
    </form>

    <ul>
      <li v-for="(record, index) in records" :key="index">
        {{ record.msg }} @{{ record.username }} / {{ record.createdAt }}
      </li>
    </ul>
  </div>
</template>

<script>
import io from "socket.io-client";

const PORT = process.env.VUE_APP_BE_PORT || 9000;

export default {
  name: "Chat",
  data() {
    return {
      socket: io(`localhost:${PORT}`),
      inputMsg: "",
      username: "",
      records: []
    };
  },
  mounted() {
    this.socket.on("message", record => {
      console.log(`received: ${record.msg}`);
      this.records.push(record);
    });
  },
  created() {
    this.username =
      "user#" +
      Math.random()
        .toString(32)
        .substring(2);
    this.socket.emit("user in", { username: this.username });
  },
  methods: {
    sendRecord() {
      if (!this.inputMsg) {
        return;
      }
      const record = {
        msg: this.inputMsg,
        username: this.username
      };

      this.socket.emit("message", record);
      console.log(`submit: ${record.msg}`);
      this.inputMsg = "";
      return;
    }
  }
};
</script>

<style scoped>
li {
  list-style-type: none;
}
</style>
