<script setup>
defineProps({
  amount: Number,
  description: String,
  time: String
});
</script>

<template>
<div class="transaction-item">
  <p class="amount" :class="{red: amount < 0, green: amount > 0}">{{amount}}</p>
  <p>{{description}}</p>
  <p class="time">{{time.trim().replace("T", " ").substring(0, 16)}}</p>
</div>
</template>

<style scoped>
.transaction-item{
  width: 100%;
  height: 56px;
  min-height: 56px;
  max-height: 56px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  border-bottom: 0.1rem solid rgba(256, 256, 256, 0.06);
}

.transaction-item p{
  flex: 1;
  font-size: 0.75rem;
  font-weight: 500;
  font-family: Inter, sans-serif;
  line-height: 1.43;
  color: rgb(255, 255, 255);
  text-align: center;
}

.transaction-item p:first-child{
  text-align: left;
}

.transaction-item p:last-child{
   text-align: right;
 }

.transaction-item p.amount{
  max-width: 40px;
}

.transaction-item.red p{
    color: orangered;
}

.transaction-item.green p{
    color: greenyellow;
}

@media (min-width: 0px) {
  .transaction-item p.time{
    max-width: 64px;
  }
}

@media (min-width: 738px) {
  .transaction-item p.time{
    max-width: 96px;
  }
}
</style>