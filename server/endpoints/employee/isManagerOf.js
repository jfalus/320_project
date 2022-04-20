const { getManager } = require("./manager");

//req is manager of e_id?
async function isManagerOf(req, e_id) {
  while (e_id != null) {
    const manager = await getManager(e_id);
    if (!manager) {
      return false;
    }
    if (manager.e_id == req) {
      return true;
    }
    e_id = manager;
  }
  return false;
}

module.exports = isManagerOf;
