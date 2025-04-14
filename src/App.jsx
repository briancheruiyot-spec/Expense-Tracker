import { useState } from 'react'
import ExpenseTable from './ExpenseTable'
import AddExpenseForm from './AddExpenseForm'
import SearchBar from './SearchBar'
import './App.css'

function App () {



  return (
  <div className="app">
    <h1>Expense Tracker</h1>
    <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
    <AddExpenseForm onAddExpense={addExpense} />
    <ExpenseTable expenses={filteredExpenses} />
  </div>
)
}

export default App