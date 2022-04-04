function isValidAT(e_id, title, desc, link, date_due) {
  let valid = false
  if (
    e_id !== null &&
    title !== null &&
    desc !== null &&
    link !== null &&
    date_due !== null &&
    Number.isInteger(e_id)
  ) {
    valid = true
  }
  return valid
}

module.exports = isValidAT;