export function toDateFormated (datetime: number, locale = 'pt-BR'): string {
  if (typeof datetime === 'string') {
    datetime = Number(datetime)
  }

  const date = new Date(datetime)

  date.setDate(date.getDate() + 1)

  const formated = new Intl.DateTimeFormat(locale)
    .format(date)

  return formated
}

export function toTimestamp (date: string): number {
  return Date.parse(date)
}

export function toCurrencyFormated (
  value: number,
  locale = 'pt-BR',
  iso4217Code = 'BRL'
): string {
  const formated = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: iso4217Code,
    minimumFractionDigits: 2
  }).format(value)

  return formated
}
