export function toDateFormated (
  datetime: number,
  locale: string
): string {
  if (typeof datetime === 'string') {
    datetime = Number(datetime)
  }

  const date = new Date(datetime)

  date.setDate(date.getDate() + 1)

  const formated = new Intl.DateTimeFormat(locale)
    .format(date)

  return formated
}

export function toInputDate (datetime: string): string {
  return new Date(+datetime).toISOString().substring(0, 10)
}

export function toTimestamp (date: string): number {
  return Date.parse(date)
}

export function toCurrencyFormated (
  value: number,
  locale: string,
  iso4217Code: string
): string {
  const formated = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: iso4217Code,
    minimumFractionDigits: 2
  }).format(value)

  return formated
}

export function toFractionNumber (
  value: number,
  locale: string,
  fraction?: number
) {
  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: fraction ?? 2
  }).format(value)
}
