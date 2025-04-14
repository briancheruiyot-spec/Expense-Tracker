import { useState } from 'react'
import ExpenseTable from './ExpenseTable'
import AddExpenseForm from './AddExpenseForm'
import SearchBar from './SearchBar'
import './App.css'

function App() {
  const [expenses, setExpenses] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  const addExpense = (newExpense) => {
    setExpenses([...expenses, { 
      ...newExpense, 
      id: expenses.length + 1,
      amount: parseFloat(newExpense.amount)
    }])
  }

  const filteredExpenses = expenses.filter(expense => 
    expense.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    expense.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="app">
      <div className="header-and-form">
        <h1>Expense Tracker</h1>
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <AddExpenseForm onAddExpense={addExpense} />
      </div>
      
      <div className="expense-table-container">
        <ExpenseTable expenses={filteredExpenses} />
      </div>
    </div>
  )
}

export default App