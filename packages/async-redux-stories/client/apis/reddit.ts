import request from 'superagent'

export function fetchSubreddit(subreddit: string) {
  return request
    .get(`/api/v1/reddit/subreddit/${subreddit}`)
    .then((res) => res.body)
}
