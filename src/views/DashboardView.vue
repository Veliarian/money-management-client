<script setup>
import SafesControls from "../components/SafesControls.vue";
import {useUserStore} from "../stores/userStore.js";
import {onMounted} from "vue";
import TopBar from "../components/TopBar.vue";

const userStore = useUserStore();

onMounted(() => {
  userStore.fetchUser();
});
</script>

<template>
  <div class="dashboard-view">
    <!--    Side Bar   -->
    <div class="dashboard-content">
      <TopBar/>
      <SafesControls/>
    </div>
  </div>
</template>

<style scoped>
.dashboard-view {
  width: 100%;
  height: 100%;
  background-color: rgb(23, 24, 33);
  display: flex;
}

.dashboard-content{
  width: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>