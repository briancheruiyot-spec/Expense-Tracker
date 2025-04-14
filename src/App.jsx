import { useState } from 'react'
import './App.css'

function ExpenseTracker() {
  // State for expenses (starts empty)
  const [expenses, setExpenses] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  // Add new expense
  const addExpense = (newExpense) => {
    setExpenses([...expenses, { 
      ...newExpense, 
      id: expenses.length + 1 
    }])
  }

  // Filter expenses based on search term
  const filteredExpenses = expenses.filter(expense => 
    expense.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    expense.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // ExpenseTable component
  const ExpenseTable = () => {
    return (
      <table className="expense-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {filteredExpenses.length > 0 ? (
            filteredExpenses.map(expense => (
              <tr key={expense.id}>
                <td>{expense.name}</td>
                <td>{expense.category}</td>
                <td>{expense.amount}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="empty-message">
                {expenses.length === 0 ? 'No expenses added yet' : 'No matching expenses found'}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    )
  }

  // AddExpenseForm component
  const AddExpenseForm = () => {
    const [formData, setFormData] = useState({
      name: '',
      category: '',
      amount: ''
    })

    const handleChange = (e) => {
      const { name, value } = e.target
      setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (e) => {
      e.preventDefault()
      addExpense({
        ...formData,
        amount: parseFloat(formData.amount)
      })
      setFormData({
        name: '',
        category: '',
        amount: ''
      })
    }

    return (
      <form onSubmit={handleSubmit} className="expense-form">
        <h2>Add Expense</h2>
        <div className="form-grid">
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Category:</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Amount:</label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              min="0"
              step="0.01"
              required
            />
          </div>
        </div>
        <button type="submit">Add Expense</button>
      </form>
    )
  }

  // SearchBar component
  const SearchBar = () => {
    return (
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by name or category..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    )
  }

  return (
    <div className="app">
      <h1>Expense Tracker</h1>
      <SearchBar />
      <AddExpenseForm />
      <ExpenseTable />
    </div>
  )
}

export default ExpenseTracker