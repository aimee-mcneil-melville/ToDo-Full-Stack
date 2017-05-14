const React = require('react')

function OtherBlog (props) {
  const {blogTitle, link} = props.blog
  return (
    <li className='other-blog'>
      <a href={link}>{blogTitle}</a>
    </li>
  )
}

module.exports = OtherBlog

