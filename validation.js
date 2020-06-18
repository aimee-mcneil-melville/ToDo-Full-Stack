export function validate (item, rules, existing) {
  const results = {...existing}

  for (const field in item) {
    const fieldValidators = rules[field] || []
    fieldValidators.forEach(rule => {
      if (!rule.fn(item[field])) {
        results[field] = rule.message
      } else {
        delete results[field]
      }
    })
  }

  return {
    details: results,
    isValid: !Object.keys(results).length
  }
}

export const rules = {
  isRequired: {
    fn: val => val && val.length,
    message: 'This field cannot be empty.'
  },
  isNotChartreuse: {
    fn: color => color !== 'chartreuse',
    message: 'Nobody likes chartreuse.'
  }
}
