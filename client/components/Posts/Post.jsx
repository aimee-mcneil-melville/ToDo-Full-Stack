import React from 'react'
import moment from 'moment'

export default function Post ({ post }) {
  const createTime = moment(post.createdOn, 'DD/MM/YYYY').fromNow()

  return (
    <>
      <li><h2>By {post.firstName} {post.lastName}:</h2></li>
      <li>{post.content}</li>
      <li>{createTime}</li>
    </>
  )
}
