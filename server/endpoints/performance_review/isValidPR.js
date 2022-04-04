function isValidPR(e_id, title, assigned_to, date_due) {
  let valid = false
  if (
    e_id !== null &&
    title !== null &&
    assigned_to !== null &&
    date_due !== null &&
    Number.isInteger(e_id)
  ) {
    valid = true
  }
  return valid
}

module.exports = isValidPR;