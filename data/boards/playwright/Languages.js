return (() => {
  const res = board?.['Get Github Repositories']

  const table = {}

  res.forEach(item => {
    table[item.language] = (table[item.language] ?? 0) + 1
  })

  const result = Object.keys(table).map(k => ({
    name: k,
    value: table[k]
  }))

  return result;
})();