<script setup>
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {authService} from "../service/authService.js";

const logout = () => {
  authService.logout();
}
</script>

<template>
<div class="top-bar">
  <button class="btn-logout" @click="logout">
    <font-awesome-icon class="icon" :icon="['fas', 'right-from-bracket']"/>
  </button>
</div>
</template>

<style scoped>
.top-bar{
  height: 40px;
  background-color: rgb(33, 34, 45);
  border-radius: 10px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.btn-logout{
  width: 36px;
  height: 36px;
  border: none;
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.icon{
  width: 26px;
  height: 26px;
  color: rgb(255, 255, 255);
}
</style>