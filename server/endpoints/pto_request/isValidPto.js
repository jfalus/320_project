function isValidPto(e_id, title, desc, start_date, end_date, date_due) {
  let valid = false
  if (
    e_id !== null &&
    title !== null &&
    desc !== null &&
    start_date !== null &&
    end_date !== null &&
    date_due !== null &&
    Number.isInteger(e_id)
  ) {
    valid = true
  }
  return valid
}

module.exports = isValidPto;