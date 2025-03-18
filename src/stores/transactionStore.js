import {defineStore} from "pinia";
import {authService} from "../service/authService.js";

const url = "http://localhost:8080/safes";

export const useTransactionStore = defineStore("transaction", {
    state: () => ({
        transactions: []
    }),

    actions: {
        async fetchTransactions(safeId) {
            try {
                const response = await authService.fetchWithAuth(url + "/" + safeId + "/transactions");
                this.transactions = await response.json();
            }catch (error){
                console.log(error);
            }
        },

        async createTransaction(safeId, amount, description){
            try {
                const response = await authService.fetchWithAuth(url + "/" + safeId + "/transactions", {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({amount: amount, description: description})
                });

                const transaction = await response.json();
                this.transactions = [...this.transactions, transaction];
            }catch (error) {
                console.log(error);
            }
        }
    }
});