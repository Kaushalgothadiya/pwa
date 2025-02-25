<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const username = ref('');
const password = ref('');
const loading = ref(false);
const errorMessage = ref('');
const router = useRouter();

// Login Function
const login = async () => {
  loading.value = true;
  errorMessage.value = '';

  try {
    try {
    const response = await axios.get("/api/method/pwa.api.api.get_csrf_token_local");
    var message=response.data
    var csrfToken=message.message
    if (response.data.error) {
      throw new Error(response.data.error);
    }
    localStorage.setItem('csrf_token', csrfToken);
    var newvar=JSON.stringify(response)
    console.log("newvar ------->>>>>",newvar)
  } catch (error) {
    errorMessage.value = "Failed to load ToDo: " + error.message;
  }

  console.log("-------------localstorage--------csrf",localStorage.getItem('csrf_token'))
    const response = await axios.post('/api/method/pwa.api.api.login', {
      login_id: username.value,
      password: password.value,
    },
    {
    headers: {
        'Content-Type': 'application/json',
        'X-Frappe-CSRF-Token': csrfToken, // Pass CSRF token
    },
    withCredentials: true, // Ensure session cookies are sent
    }
);

    // Extract API Key & Secret
    if (response.data.message) {
      const data=response.data
      console.log(response.data,"======response of api key -===========")
      const api_key=data.api_key
      const api_secret=data.api_secret

      // Store API Key & Secret in sessionStorage
      sessionStorage.setItem('apiKey', api_key);
      sessionStorage.setItem('apiSecret', api_secret);

      console.log("Login successful! Redirecting...");

      // Redirect to home page
      router.push('/home');
    } else {
      errorMessage.value = "Invalid response from server.";
    }
  } catch (error) {
    console.error("Login error:", error);
    errorMessage.value = error.response?.data?.message || "Login failed. Please try again.";
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="login-container">
    <h1>Login</h1>

    <div v-if="errorMessage" class="error-message">
      {{ errorMessage }}
    </div>

    <div class="input-group">
      <label>Username</label>
      <input v-model="username" type="text" placeholder="Enter Username" required />
    </div>

    <div class="input-group">
      <label>Password</label>
      <input v-model="password" type="password" placeholder="Enter Password" required />
    </div>

    <button @click="login" :disabled="loading">
      {{ loading ? 'Logging in...' : 'Login' }}
    </button>
  </div>
</template>

<style scoped>
.login-container {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  text-align: center;
  border: 1px solid #ddd;
  border-radius: 5px;
  background: #fff;
}

.input-group {
  margin-bottom: 15px;
  text-align: left;
}

label {
  display: block;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  width: 100%;
  padding: 10px;
  background: #007bff;
  color: white;
  border: none;
  cursor: pointer;
}

button:disabled {
  background: #aaa;
  cursor: not-allowed;
}

.error-message {
  color: red;
  margin-bottom: 10px;
}
</style>
