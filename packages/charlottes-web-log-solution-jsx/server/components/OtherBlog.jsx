function OtherBlog({ blogTitle, link }) {
  return (
    <li className="rounded border">
      <a href={link}>{blogTitle}</a>
    </li>
  )
}

export default OtherBlog
