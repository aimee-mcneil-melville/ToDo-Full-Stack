import React from 'react'
import sha from 'hash-string'

const Post = props => {
  const { title, date, commentCount, paragraphs } = props.post
  return (
    <div className='post'>
      <h2>{title}</h2>
      <div className='date'>{date}</div>
      {paragraphs.map(text => (
        <p key={sha(text)}>{text}</p>
      ))}
      <div className='comment-count'>{commentCount} comments</div>
    </div>
  )
}

export default Post
