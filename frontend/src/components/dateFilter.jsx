import React from 'react'

const dateFilter = () => {
  return (
    <div>
        <input
  style={{ width: "300px"}}
  type="number"
  placeholder="YYYY"
  min="1900"
  max="2099"
  step="1"
/>
    </div>
  )
}

export default dateFilter