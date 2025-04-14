import { useState } from 'react'

const AddExpenseForm = ({ onAddExpense }) => {
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
    onAddExpense(formData)
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

export default AddExpenseForm