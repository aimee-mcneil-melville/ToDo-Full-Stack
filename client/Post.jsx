var React = require('react')

function Post (props) {
  const {title, date, commentCount} = props.post
  return (
    <div className='post'>
      <h2>{title}</h2>
      <div className='date'>{date}</div>
      {props.post.paragraphs.map((para, key) => {
        return (
          <p key={key}>{para}</p>
        )
      })}
      <div className='comment-count'>{commentCount} comments</div>
    </div>
  )
}

module.exports = Post

