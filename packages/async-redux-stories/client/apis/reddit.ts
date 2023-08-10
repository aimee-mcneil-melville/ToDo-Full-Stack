import request from 'superagent'

// TODO: using Insomnia, make an interface for the response!
export async function fetchSubreddit(subreddit: string) {
  const res = await request
    .get(`/api/v1/reddit/subreddit/${subreddit}`)
  return res.body
}
