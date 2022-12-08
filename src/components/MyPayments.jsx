import React from 'react'

function MyPayments() {
  return (
    <div className="inside inside-container">
        <div className="sub-title">
          Your payments
        </div>
      <div>You don't have any payment methods yet</div>
      <button className="form-button my-10">Add Payment</button>
    </div>
  )
}

export default MyPayments