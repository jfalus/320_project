function isValidGT(e_id, title, desc, date_due) {
  let valid = false
  if (
    e_id !== null &&
    title !== null &&
    desc !== null &&
    date_due !== null &&
    Number.isInteger(e_id)
  ) {
    valid = true
  }
  return valid
}

module.exports = isValidGT;