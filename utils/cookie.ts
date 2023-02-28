export function getExpiresDate (day: number): Date {
  const date = new Date()
  const timestamp = day * 24 * 60 * 60 * 1000

  const expiresTime = date.setTime(date.getTime() + timestamp)
  const expiresDate = new Date(expiresTime)

  return expiresDate
}
