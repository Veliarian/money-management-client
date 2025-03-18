<script setup>
import {ref} from "vue";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

const emmit = defineEmits(["select", "open-settings", "open-members"]);

defineProps({
  amount: {
    type: Number,
    default: 0
  },
  name: {
    type: String,
    default: "Назва"
  },
  type: {
    type: String,
    default: "Тип"
  },
  active: {
    type: Boolean,
    default: false
  }
});
</script>

<template>
  <div class="safe-card" :class="{active: active}" @click="emmit('select')">
    <div class="card-head">
      <button class="btn-share" @click="emmit('open-members')">
        <font-awesome-icon :icon="['fas', 'share-nodes']"/>
      </button>
      <button class="btn-settings" @click="emmit('open-settings')">
        <font-awesome-icon :icon="['fas', 'gear']"/>
      </button>
    </div>
    <h4 class="amount">
      <font-awesome-icon :icon="['fas', 'hryvnia-sign']"/>
      {{ amount }}
    </h4>
    <p class="name">{{ name }}</p>
    <p class="type">{{ type }}</p>
  </div>
</template>

<style scoped>
.safe-card {
  height: 182px;
  width: 100%;
  max-width: 345px;
  min-width: 182px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 20px;
  border-radius: 16px;
  background-color: rgb(23, 24, 33);
  border: 1px solid rgb(23, 24, 33);;
}

.safe-card.active {
  border: 1px solid rgb(32, 174, 243);
}

.card-head {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  color: rgb(135, 136, 140);
}

.btn-settings, .btn-share{
  color: inherit;
  background-color: transparent;
  border: none;
  margin-bottom: 25px;
  cursor: pointer;
  font-size: 1.3rem;
}

.btn-share{
  margin-right: 20px;
}

.amount {
  margin: 0px 0px 16px;
  font-size: 1.5rem;
  font-weight: 600;
  font-family: Inter, sans-serif;
  line-height: 1.235;
  color: rgb(255, 255, 255);
}

.name {
  margin: 0px 0px 8px;
  font-size: 1rem;
  font-weight: 500;
  font-family: Inter, sans-serif;
  line-height: 1.5;
  color: rgb(232, 232, 232);
}

.type {
  margin: 0px;
  font-size: 0.75rem;
  font-weight: 500;
  font-family: Inter, sans-serif;
  color: rgb(252, 184, 89);
  line-height: 1.25;
}
</style>