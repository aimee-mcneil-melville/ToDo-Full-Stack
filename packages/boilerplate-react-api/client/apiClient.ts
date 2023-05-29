import request from 'superagent'

export function getGreeting(): Promise<string> {
  return request.get('/api/v1/greeting').then((res) => res.body.greeting)
}
