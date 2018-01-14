module.exports = {
  get: function (key, defaultValue) {
    let value = localStorage.getItem(key)
    if (!value) {
      value = defaultValue
    }
    return value
  },
  set: function (key, value) {
    localStorage.setItem(key, value)
  }
}