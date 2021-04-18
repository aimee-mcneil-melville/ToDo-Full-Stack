exports.seed = function (knex, Promise) {
  return knex('follower_list').insert([
    { id: 1, user_id: 10001, following_id: 10002 },
    { id: 2, user_id: 10001, following_id: 10003 },
    { id: 3, user_id: 10001, following_id: 10004 },
    { id: 4, user_id: 10001, following_id: 10005 },
    { id: 5, user_id: 10002, following_id: 10003 },
    { id: 6, user_id: 10002, following_id: 10004 },
    { id: 7, user_id: 10002, following_id: 10001 }
  ])
}
