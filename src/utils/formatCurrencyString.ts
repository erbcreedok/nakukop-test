const formatter = new Intl.NumberFormat('en-EN', {
  minimumFractionDigits: 2,
})

function formatCurrencyString(price: number): string {
  return formatter.format(price).replace(/\D00$/, '')
}

export default formatCurrencyString
