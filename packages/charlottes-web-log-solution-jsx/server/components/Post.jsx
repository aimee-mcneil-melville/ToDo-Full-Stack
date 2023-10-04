function Post({ title, date, commentCount, paragraphs }) {
  return (
    <div className="bg-sky-50">
      <h2>{title}</h2>
      <div>{date}</div>
      <ul>
        {paragraphs.map((text, index) => (
          <li key={index} className="border">
            <p>{text}</p>
          </li>
        ))}
      </ul>
      <div>{commentCount} comments</div>
    </div>
  )
}

export default Post
