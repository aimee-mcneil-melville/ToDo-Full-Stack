import request from 'superagent'

// TODO: using Insomnia, make an interface for the response!
export function fetchSubreddit(subreddit: string) {
  return request
    .get(`/api/v1/reddit/subreddit/${subreddit}`)
    .then((res) => res.body)
}
