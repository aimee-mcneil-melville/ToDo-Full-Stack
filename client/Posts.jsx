var React = require('react')

var Post = require('./Post')

function Posts (props) {
  return (
    <div className='posts'>
      {props.posts.map(post => {
        return <Post post={post} />
      })}
    </div>
  )
}

module.exports = Posts

