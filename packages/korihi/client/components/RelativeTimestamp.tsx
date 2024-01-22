interface Props {
  now: Date
  value: Date
}

const SECOND = 1000
const MINUTE = SECOND * 60
const HOUR = MINUTE * 60
const DAY = HOUR * 24
const WEEK = DAY * 7

export function TimeStamp({ now, value }: Props) {
  const rel = new Intl.RelativeTimeFormat('en-nz', { style: 'short' })
  const abs = new Intl.DateTimeFormat('en-nz', { dateStyle: 'short' })

  const nowMs = Number(now) + value.getTimezoneOffset() * 60000
  const diff = +value - nowMs

  let ts: string
  // if it's less than a minute, seconds
  if (Math.abs(diff) <= MINUTE) {
    ts = rel.format(Math.floor(diff / SECOND), 'seconds')
  } else if (Math.abs(diff) <= HOUR) {
    ts = rel.format(Math.floor(diff / MINUTE), 'minutes')
  } else if (Math.abs(diff) <= DAY) {
    ts = rel.format(Math.floor(diff / HOUR), 'hours')
  } else if (Math.abs(diff) <= WEEK) {
    ts = rel.format(Math.floor(diff / DAY), 'days')
  } else {
    ts = abs.format(value)
  }

  return <time dateTime={value.toISOString()}>{ts}</time>
}
