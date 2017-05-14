var React = require('react')

function Post (props) {
  const {title, date, commentCount} = props.post
  return (
    <div className='post'>
      <h2>{title}</h2>
      <div>{date}</div>
      {props.post.paragraphs.map(para => {
        return (
          <p>{para}</p>
        )
      })}
      <div>{commentCount}</div>
    </div>
  )
}

module.exports = Post

