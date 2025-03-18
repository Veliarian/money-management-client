<script setup>
import {ref} from "vue";
import {useSafeStore} from "../stores/safeStore.js";

const safeStore = useSafeStore();
const name = ref("");

const emit = defineEmits(["close"]);

const createSafe = () => {
  safeStore.addSafe(name.value);
  closeForm();
}

const closeForm = () => {
  emit("close");
}
</script>

<template>
<div class="create-safe-form" @click.self="closeForm">
  <div class="form-box">
    <form class="form" @submit.prevent="createSafe">
      <h3 class="h3">Рахунок</h3>
      <div class="input-box">
        <label for="name">Назва</label>
        <input type="text" id="name" v-model="name" required>
      </div>
      <button class="submit-btn" type="submit">Створити</button>
    </form>
  </div>
</div>
</template>

<style scoped>
.create-safe-form{
  width: 100vw;
  height: 100vh;
  position: fixed;
  opacity: 1;
  transition: opacity 225ms cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  -moz-box-align: center;
  align-items: center;
  -moz-box-pack: center;
  justify-content: center;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
}

.form-box {
  max-width: 640px;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  padding-left: 20px;
  padding-right: 20px;
}

.form {
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

.submit-btn {
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
  .form {
    padding-left: 20px;
    padding-right: 20px;
  }
}

@media (min-width: 738px) {
  .form {
    padding-left: 30px;
    padding-right: 30px;
  }
}
</style>