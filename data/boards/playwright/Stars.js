return (() => {
  const res = board?.['Get Github Repositories']

  const table = {}

  const result = res.map(item => ({
    name: item.name,
    value: item.stars
  }))

  return result;
})();