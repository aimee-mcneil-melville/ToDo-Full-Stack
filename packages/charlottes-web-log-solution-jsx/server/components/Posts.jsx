import Post from './Post.jsx'

function Posts({ postsData }) {
  return (
    <ul>
      {postsData.map((post) => (
        <li key={post.id}>
          <Post {...post} />
        </li>
      ))}
    </ul>
  )
}

export default Posts
