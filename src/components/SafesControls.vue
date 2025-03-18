<script setup>
import SafeCard from "./SafeCard.vue";
import {onBeforeMount, ref} from "vue";
import CreateSafeForm from "../forms/CreateSafeForm.vue";
import {useSafeStore} from "../stores/safeStore.js";
import SafeSettingsForm from "../forms/SafeSettingsForm.vue";
import SafeMembersForm from "../forms/SafeMembersForm.vue";
import {useTransactionStore} from "../stores/transactionStore.js";
import TransactionItem from "./TransactionItem.vue";
import CreateTransactionForm from "../forms/CreateTransactionForm.vue";

const safeStore = useSafeStore();
const transactionStore = useTransactionStore();

const isShowCreateSafeForm = ref(false);
const isShowSafeSettingsForm = ref(false);
const isShowSafeMembersForm = ref(false);
const isShowCreateTransactionForm = ref(false);
const selectedSafeId = ref(null);
const selectedSafe = ref(null);

onBeforeMount(() => {
  safeStore.fetchSafes();
});

const showCreateSafeForm = () => {
  isShowCreateSafeForm.value = !isShowCreateSafeForm.value;
}

const showSafeSettingsForm = (safeId) => {
  selectSafe(safeId);
  isShowSafeSettingsForm.value = !isShowSafeSettingsForm.value;
}

const showSafeMembersForm = () => {
  isShowSafeMembersForm.value = !isShowSafeMembersForm.value;
}

const showCreateTransactionForm = () => {
  isShowCreateTransactionForm.value = !isShowCreateTransactionForm.value;
}

const selectSafe = (safeId) => {
  selectedSafeId.value = safeId;
  const index = safeStore.safes.findIndex(s => s.id === safeId);
  selectedSafe.value = safeStore.safes[index];

  loadTransactions(safeId);
}

const loadTransactions = (safeId) => {
  transactionStore.fetchTransactions(safeId);

  console.log(transactionStore.transactions)
}
</script>

<template>
  <div class="safes-control">
    <div class="safes-box">
      <div class="head">
        <h4>Рахунки</h4>
        <button class="btn-add-safe" @click="showCreateSafeForm">+</button>
      </div>
      <div class="safes-list">
        <SafeCard v-for="safe in safeStore.safes"
                  @select="selectSafe(safe.id)"
                  @open-settings="showSafeSettingsForm(safe.id)"
                  @open-members="showSafeMembersForm"
                  :active="selectedSafeId === safe.id"
                  :type="safe.members.length > 1 ? 'Груповий' : 'Власний'"
                  :amount="safe.amount"
                  :name="safe.name"
                  :id="safe.id"
        />
      </div>
    </div>
    <div class="transactions-box">
      <div class="head">
        <h4>Витрати</h4>
        <button class="btn-add-transaction" v-if="selectedSafe" @click="showCreateTransactionForm">+</button>
      </div>
      <div class="transactions-list">
        <div class="list-head">
          <div class="head-item amount">Сума</div>
          <div class="head-item description">Опис</div>
          <div class="head-item time">Час</div>
        </div>
        <div class="transition-items">
          <TransactionItem v-for="transaction in transactionStore.transactions"
                           :id="transaction.id"
                           :amount="transaction.amount"
                           :description="transaction.description"
                           :time="transaction.time"/>
        </div>
      </div>
    </div>

    <CreateSafeForm
        v-if="isShowCreateSafeForm"
        @close="showCreateSafeForm"
    />
    <SafeSettingsForm
        v-if="isShowSafeSettingsForm && selectedSafe"
        :name="selectedSafe.name"
        :id="selectedSafe.id"
        @close="showSafeSettingsForm(selectedSafe.id)"
    />
    <SafeMembersForm
        v-if="isShowSafeMembersForm && selectedSafe"
        :id="selectedSafe.id"
        @close="showSafeMembersForm"
    />
    <CreateTransactionForm
        v-if="isShowCreateTransactionForm"
        @close="showCreateTransactionForm"
        :safe-id="selectedSafe.id"
    />
  </div>
</template>

<style scoped>
.safes-control {
  width: 100%;
  height: calc(100% - 60px);
  max-height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.safes-box {
  background-color: rgb(33, 34, 45);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.transactions-box {
  background-color: rgb(33, 34, 45);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.head {
  width: 100%;
  min-height: 26px;
  display: flex;
  justify-content: space-between;
  text-align: left;
  margin-bottom: 10px;
  font-size: 1.5rem;
  font-weight: 600;
  font-family: Inter, sans-serif;
  line-height: 1.235;
  color: rgb(255, 255, 255);
}

.btn-add-safe {
  background-color: transparent;
  border: none;
  font-size: 1.7rem;
  font-weight: inherit;
  font-family: inherit;
  line-height: inherit;
  color: inherit;
  cursor: pointer;
}

.btn-add-transaction {
  background-color: transparent;
  border: none;
  font-size: 1.7rem;
  font-weight: inherit;
  font-family: inherit;
  line-height: inherit;
  color: inherit;
  cursor: pointer;
}

.safes-list {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  gap: 20px;
  overflow: auto;
  scrollbar-width: none;
}

.transactions-list {
  width: 100%;
}

.list-head {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 0.1rem solid rgb(135, 136, 140);
}

.head-item {
  height: 56px;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: rgb(135, 136, 140);
  font-size: 1rem;
  font-weight: 600;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.head-item:first-child {
  justify-content: flex-start;
}

.head-item:last-child {
  justify-content: flex-end;
}

.head-item.amount {
  max-width: 40px;
}

.head-item.time {
  max-width: 40px;
}

.transactions-list {
  height: 100%;
}

.transition-items {
  width: 100%;
  height: 100%;
  overflow: scroll;
  scrollbar-width: none;
}

@media (min-width: 0px) {
  .safes-box {
    min-height: 257px;
  }

  .safes-box, .transactions-box {
    padding: 16px;
  }
}

@media (min-width: 738px) {
  .safes-box {
    min-height: 289px;
  }

  .safes-box, .transactions-box {
    padding: 32px;
  }
}
</style>