<script setup>
import {useRouter} from "vue-router";
import {ref} from "vue";
import serverUrlService from "../service/urlService.js"

const router = useRouter();
const username = ref("");
const password = ref("");
const errorMessage = ref("");
const serverUrl = serverUrlService.getApplicationServerUrl();


const login = async () => {
  try {
    const response = await fetch(serverUrl + "/auth/sign-in", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({username: username.value, password: password.value})
    });

    if(!response.ok) {
      throw new Error("Неправльний логін або пароль!");
    }

    const data = await response.json();
    localStorage.setItem("token", data.token);
    router.push("/");
  } catch (error) {
    errorMessage.value = error.message;
  }
}
</script>

<template>
  <div class="login-view">
    <div class="login-box">
      <form class="login-form" @submit.prevent="login">
        <h3 class="h3">Вхід</h3>
        <h6 class="h6">Не маєте акаунта? <RouterLink class="sign-up-link" to="/sign-up">Реєстрація</RouterLink></h6>
        <div class="input-box">
          <label for="username">Логін</label>
          <input type="text" id="username" v-model="username" required>
        </div>
        <div class="input-box">
          <label for="password">Пароль</label>
          <input type="password" id="password" v-model="password" required>
        </div>
        <button class="login-btn" type="submit">Увійти</button>
        <p v-if="errorMessage" class="text-error">{{ errorMessage }}</p>
      </form>
    </div>
  </div>
</template>

<style scoped>
.login-view {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(23, 24, 33);
}

.login-box {
  max-width: 640px;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  padding-left: 20px;
  padding-right: 20px;
}

.login-form {
  color: rgb(135, 136, 140);
  transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 1px -1px, rgba(0, 0, 0, 0.14) 0px 1px 1px 0px, rgba(0, 0, 0, 0.12) 0px 1px 3px 0px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  background-color: rgb(33, 34, 45);
  border-radius: 10px;
  padding-top: 24px;
  padding-bottom: 24px;
}

.h3 {
  font-size: 2rem;
  font-weight: 600;
  font-family: Inter, sans-serif;
  line-height: 1.167;
  text-align: center;
  color: rgb(232, 232, 232);
}

.h6 {
  font-size: 1.25rem;
  font-family: Inter, sans-serif;
  line-height: 1.6;
  font-weight: 500;
  text-align: center;
  color: rgb(135, 136, 140);
}

.sign-up-link {
  font: inherit;
  color: rgb(169, 223, 216);
}

.input-box {
  display: inline-flex;
  flex-direction: column;
  position: relative;
  min-width: 0px;
  border: 0px;
  vertical-align: top;
  gap: 4px;
  border-radius: 8px;
}

.input-box label {
  color: rgb(232, 232, 232);
  font-family: Inter, sans-serif;
  line-height: 1.4375em;
  display: block;
  transform-origin: left top 0px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: calc(100% - 24px);
  left: 0px;
  top: 0px;
  transition: color 200ms cubic-bezier(0, 0, 0.2, 1), transform 200ms cubic-bezier(0, 0, 0.2, 1), max-width 200ms cubic-bezier(0, 0, 0.2, 1);
  z-index: 1;
  pointer-events: none;
  position: static;
  transform: none;
  font-size: 1rem;
  font-weight: 500;
}

.input-box input {
  height: 52px;
  width: 100%;
  background-color: rgb(29, 30, 38);
  font-size: 1rem;
  font-weight: 500;
  font-family: Inter, sans-serif;
  line-height: 1.4375em;
  color: rgb(210, 210, 210);
  box-sizing: border-box;
  cursor: text;
  -moz-box-align: center;
  align-items: center;
  position: relative;
  transition: background-color 200ms cubic-bezier(0, 0, 0.2, 1);
  border-radius: 8px;
  padding: 14.5px 12px;
  border: 0px;
  display: block;
}

.login-btn {
  display: inline-flex;
  -moz-box-align: center;
  align-items: center;
  -moz-box-pack: center;
  justify-content: center;
  position: relative;
  box-sizing: border-box;
  outline: 0px;
  border: 0px;
  cursor: pointer;
  user-select: none;
  vertical-align: middle;
  appearance: none;
  text-decoration: none;
  font-family: Inter, sans-serif;
  line-height: 1.75;
  min-width: 64px;
  transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1), border-color 250ms cubic-bezier(0.4, 0, 0.2, 1), color 250ms cubic-bezier(0.4, 0, 0.2, 1);
  color: rgba(0, 0, 0, 0.87);
  background-color: rgb(169, 223, 216);
  box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px, rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
  border-radius: 6px;
  text-transform: none;
  padding: 10px 16px;
  font-size: 1.25rem;
  font-weight: 500;
  margin-top: 20px;
}

@media (min-width: 0px) {
  .login-form {
    padding-left: 20px;
    padding-right: 20px;
  }
}

@media (min-width: 738px) {
  .login-form {
    padding-left: 30px;
    padding-right: 30px;
  }
}
</style>