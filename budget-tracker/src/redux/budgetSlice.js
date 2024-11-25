import { createSlice } from "@reduxjs/toolkit";
import { useState } from "react";

const initialState = {
  budgetLimits: {},
  expenses: [],
  incomes: [],
};

const budgetSlice = createSlice({
  name: "budget",
  initialState,
  reducers: {
    setBudgetLimit(state, action) {
      state.budgetLimits[action.payload.category] = action.payload.limit;
    },
    addExpense(state, action) {
      state.expenses.push({
        description: action.payload.description,
        amount: action.payload.amount,
        date: action.payload.date,
        category: action.payload.category,
      });
    },
    addIncome(state, action) {
      state.incomes.push({
        description: action.payload.description,
        amount: action.payload.amount,
        date: action.payload.date,
      });
    },
  },
});

export const { setBudgetLimit, addExpense, addIncome } = budgetSlice.actions;
export default budgetSlice.reducer;
