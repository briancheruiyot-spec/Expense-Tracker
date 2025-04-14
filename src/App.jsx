import { useState, useEffect } from 'react'
import ExpenseTable from './ExpenseTable'
import AddExpenseForm from './AddExpenseForm'
import SearchBar from './SearchBar'
import './App.css'

function App() {
  const [expenses, setExpenses] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' })

  // Auto-sort by name when search term changes
  useEffect(() => {
    if (searchTerm) {
      setSortConfig({ key: 'name', direction: 'asc' })
    }
  }, [searchTerm])

  const addExpense = (newExpense) => {
    setExpenses([...expenses, { 
      ...newExpense, 
      id: Date.now(),
      amount: parseFloat(newExpense.amount)
    }])
  }

  const deleteExpense = (id) => {
    setExpenses(expenses.filter(expense => expense.id !== id))
  }

  const requestSort = (key) => {
    let direction = 'asc'
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc'
    }
    setSortConfig({ key, direction })
  }

  const sortedExpenses = () => {
    const sortableItems = [...expenses]
    if (sortConfig.key) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1
        }
        return 0
      })
    }
    return sortableItems
  }

  const filteredExpenses = sortedExpenses().filter(expense => 
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
        <ExpenseTable 
          expenses={filteredExpenses} 
          onDelete={deleteExpense}
          onSort={requestSort}
          sortConfig={sortConfig}
        />
      </div>
    </div>
  )
}

export default App