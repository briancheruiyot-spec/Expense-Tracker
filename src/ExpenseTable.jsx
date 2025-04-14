const ExpenseTable = ({ expenses, onDelete, onSort, sortConfig }) => {
  const getSortIndicator = (key) => {
    if (sortConfig.key !== key) return null
    return sortConfig.direction === 'asc' ? '↑' : '↓'
  }

  return (
    <table className="expense-table">
      <thead>
        <tr>
          <th onClick={() => onSort('name')}>
            Name {getSortIndicator('name')}
          </th>
          <th onClick={() => onSort('category')}>
            Category {getSortIndicator('category')}
          </th>
          <th>
            Amount
          </th>
        </tr>
      </thead>
      <tbody>
        {expenses.length > 0 ? (
          expenses.map(expense => (
            <tr key={expense.id}>
              <td>{expense.name}</td>
              <td>{expense.category}</td>
              <td className="amount-cell">
                {expense.amount}
                <button 
                  onClick={() => onDelete(expense.id)}
                  className="delete-btn"
                  aria-label="Delete expense"
                >
                  ×
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="3" className="empty-message">
              {expenses.length === 0 ? 'No expenses added' : 'No matching expenses found'}
            </td>
          </tr>
        )}
      </tbody>
    </table>
  )
}

export default ExpenseTable