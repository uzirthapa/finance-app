const state = {
    transactions: [],
    balance: [],
    avgSpending: 0,
    institutions: [],
    dateRange: {
        start: "",
        end: ""
    },
    currentDate: null,
    totalSpending: 0,
    icons: [
        { category: "Travel", icon: "mdi-earth", color: "#2196F3" },
        { category: "Food and Drink", icon: "mdi-food", color: "#FF9800" },
        { category: "Payment", icon: "mdi-credit-card-outline", color: "#4CAF50" },
        { category: "Shops", icon: "mdi-basket", color: "#C62828" },
        { category: "Transfer", icon: "mdi-cash-usd", color: "#FFD600" },
        { category: "Recreation", icon: "mdi-star", color: "#E91E63" }
    ]
}

export default state;