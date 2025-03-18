<script setup>
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {ref} from "vue";

const activeBar = ref(false);

const sideBarHandler = () => {
  activeBar.value = false;
}
</script>

<template>
  <div class="sidebar" :class="{active: activeBar}">
    <div class="nav-box">
      <nav class="nav-list">
        <ul>
          <li>
            <a class="active">
              <font-awesome-icon :icon="['fas', 'house']"/>
              <span>Головна</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>

    <div class="shadow-box" @click="sideBarHandler"></div>
  </div>
</template>

<style scoped>
.sidebar {
  height: 100%;
  display: flex;
  position: relative;
}

.nav-box {
  height: 100%;
  width: 240px;
  background-color: rgb(23, 24, 33);
  color: rgb(135, 136, 140);
  position: absolute;
  left: -240px;
  transition: left .3s;
  z-index: 2;
}

.shadow-box {
  opacity: 1;
  transition: opacity 225ms cubic-bezier(0.4, 0, 0.2, 1);
  position: fixed;
  display: none;
  -moz-box-align: center;
  align-items: center;
  -moz-box-pack: center;
  justify-content: center;
  inset: 0px;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
}

.sidebar.active .nav-box{
  left: 0;
  transition: left .3s;
}

.sidebar.active .shadow-box{
  display: flex;
}

.nav-list {
  height: 100%;
  list-style: none;
  padding: 10px 0px;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 16px;
  -moz-box-pack: justify;
  justify-content: space-between;
}

.nav-list ul {
  height: 100%;
}

.nav-list ul li {
  -moz-box-pack: start;
  justify-content: flex-start;
  -moz-box-align: center;
  align-items: center;
  position: relative;
  text-decoration: none;
  width: 100%;
  box-sizing: border-box;
  text-align: left;
  display: block;
  padding-left: 20px;
  padding-right: 20px;
}

.nav-list ul li a {
  font: inherit;
  outline: 0px;
  border: 0px;
  margin: 0px;
  cursor: pointer;
  user-select: none;
  vertical-align: middle;
  appearance: none;
  color: rgb(135, 136, 140);
  display: flex;
  -moz-box-flex: 1;
  flex-grow: 1;
  position: relative;
  text-decoration: none;
  min-width: 0px;
  box-sizing: border-box;
  text-align: left;
  transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 6px;
  padding: 10px 16px;
  -moz-box-pack: center;
  -moz-box-align: center;
  align-items: center;
  gap: 5px;
  opacity: 0.5;
  background-color: rgb(23, 24, 33);
}

.nav-list ul li a.active {
  opacity: 1;
  background-color: rgb(169, 223, 216);
}

.nav-list ul li a.active > *{
  color: rgb(23, 24, 33);
}

@media (min-width: 0px) {
  .sidebar {
    width: 100%;
  }

  .shadow-box {
    flex: 1;
  }
}

@media (min-width: 738px) {
  .sidebar {
    width: 240px;
  }

  .shadow-box {
    width: 0;
  }
}
</style>