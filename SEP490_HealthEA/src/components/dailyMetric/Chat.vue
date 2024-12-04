<template>
    <div class="chat-container">
        <!-- Chat Header -->
        <div class="chat-header">
            <h3>Chat với AI</h3>
        </div>

        <!-- Chat Messages Area -->
        <div class="chat-messages" ref="messagesContainer">
            <div 
                class="message" 
                v-for="(message, index) in messages" 
                :key="index"
                :class="{'ai-message': message.senderType === 'AI', 'user-message': message.senderType === 'USER'}"
            >
                <div class="message-content">
                    <p v-html="formatMessage(message.message)"></p>
                </div>
            </div>
        </div>

        <!-- Chat Input and Send Button -->
        <div class="chat-input-area">
            <input v-model="messageInput" placeholder="Nhập câu hỏi của bạn" @keydown.enter="sendMessage" />
            <button @click="sendMessage">Gửi</button>
        </div>
    </div>
</template>


<script>
import { useUserStore } from "@/stores/user";
import axios from 'axios'

export default {
  data() {
    return {
      messageInput: "",
      messages: "", 
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    formatMessage(message) {
      return message.replace(/\n/g, '<br />'); // Thay thế '\n' thành <br />
    },
    async sendMessage() {
        const userStore = useUserStore();
        console.log('Token:', userStore.token);

        console.log(this.messageInput)

        try{
            const response = await axios.post(`${import.meta.env.VITE_API_URL_JAVA}/identity/chat/getAiResponse`, this.messageInput,
                {
                    headers: {
                        'Content-Type': 'application/json; charset=UTF-8',
                        Authorization: `Bearer ${userStore.token}`
                    }
                }
            )

            this.messages = response.data.result;
            console.log(this.messages);
            this.messageInput = "";
            this.getData();
        }catch(error){
            console.log(error)
        }
    },
    async getData(){
        const userStore = useUserStore();
        console.log('Token:', userStore.token);

        try{
            const response = await axios.get(`${import.meta.env.VITE_API_URL_JAVA}/identity/chat`,
                {
                    headers: {
                        Authorization: `Bearer ${userStore.token}`
                    }
                }
            )

            this.messages = response.data.result
            console.log(this.messages)
        }catch(error){
            console.log(error)
        }

    }
  },
};
</script>


<style scoped>
.chat-container {
    display: flex;
    flex-direction: column;
    max-width: 600px;
    margin: 0 auto;
    padding: 10px;
    background-color: #f9f9f9;
    border-radius: 8px;
}

.chat-header {
    text-align: center;
    font-size: 1.5rem;
    margin-bottom: 10px;
}

.chat-messages {
    flex-grow: 1;
    overflow-y: auto;
    margin-bottom: 10px;
    padding: 10px;
}

.message {
    display: flex;
    margin: 5px 0;
}

.message-content {
    padding: 10px;
    border-radius: 10px;
    max-width: 70%;
    word-wrap: break-word;
}

.ai-message {
    justify-content: flex-start;
}

.ai-message .message-content {
    background-color: #e0f7fa;
    color: #00796b;
}

.user-message {
    justify-content: flex-end;
}

.user-message .message-content {
    background-color: #c8e6c9;
    color: #388e3c;
}

.chat-input-area {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    background-color: #fff;
    border-top: 1px solid #ccc;
}

.chat-input-area input {
    width: 80%;
    padding: 8px;
    border-radius: 4px;
    border: 1px solid #ccc;
}

.chat-input-area button {
    padding: 8px 16px;
    background-color: #388e3c;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

</style>