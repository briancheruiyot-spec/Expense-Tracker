const ExpenseTable = ({ expenses }) => {
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
        {expenses.length > 0 ? (
          expenses.map(expense => (
            <tr key={expense.id}>
              <td>{expense.name}</td>
              <td>{expense.category}</td>
              <td>{expense.amount}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="3" className="empty-message">
              {expenses.length === 0 ? 'Please Add Expenses' : 'No matching expenses found'}
            </td>
          </tr>
        )}
      </tbody>
    </table>
  )
}

export default ExpenseTable