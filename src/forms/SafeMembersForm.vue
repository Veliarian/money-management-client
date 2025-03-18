<script setup>
import {onMounted, ref} from "vue";
import {useSafeStore} from "../stores/safeStore.js";
import {useMemberStore} from "../stores/memberStore.js";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {useUserStore} from "../stores/userStore.js";

const props = defineProps({
  id: Number
});

const memberStore = useMemberStore();
const userStore = useUserStore();
const emit = defineEmits(["close"]);
const username = ref("");

onMounted(() => {
  memberStore.fetchMembers(props.id);
});

const addMember = () => {
  memberStore.addMember(props.id, username.value);
}

const removeMember = (member) => {
  memberStore.removeMemberFromSafe(props.id, member);
}

const closeForm = () => {
  emit("close");
}
</script>

<template>
  <div class="safe-settings-form" @click.self="closeForm">
    <div class="form-box">
      <form class="form" @submit.prevent="addMember">

        <h3 class="h3">Користувачі</h3>
        <div class="input-box">
          <label for="name">Ім'я користувача</label>
          <input type="text" id="name" v-model="username" required>
        </div>
        <button class="submit-btn" type="submit">Додати</button>

        <div class="members-list">
          <div class="member-item" v-for="(member, index) in memberStore.members" :id="index">
            <p>{{ member }}</p>
            <button v-if="member !== userStore.user.username"
                    @click="removeMember(member)">
              <font-awesome-icon :icon="['fas', 'trash']"/>
            </button>
          </div>
        </div>

      </form>
    </div>
  </div>
</template>

<style scoped>
.safe-settings-form {
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
}

.form-box {
  max-width: 640px;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  padding-left: 20px;
  padding-right: 20px;
  z-index: 2;
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

.members-list {
  width: 100%;
  max-height: 168px;
  border: 0.1rem solid rgb(135, 136, 140);
  border-radius: 8px;
}

.member-item {
  max-height: 56px;
  min-height: 56px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}

.member-item p {
  font-size: 1rem;
  font-weight: 500;
  font-family: Inter, sans-serif;
  line-height: 1.43;
  color: rgb(255, 255, 255);
}

.member-item button {
  display: inline-flex;
  -moz-box-align: center;
  align-items: center;
  -moz-box-pack: center;
  justify-content: center;
  position: relative;
  box-sizing: border-box;
  background-color: transparent;
  outline: 0px;
  border: 0px;
  margin: 0px;
  cursor: pointer;
  user-select: none;
  vertical-align: middle;
  appearance: none;
  text-decoration: none;
  min-width: 0px;
  text-align: center;
  flex: 0 0 auto;
  border-radius: 50%;
  overflow: visible;
  transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1);
  padding: 5px;
  font-size: 1.125rem;
  color: rgb(156, 0, 0);
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