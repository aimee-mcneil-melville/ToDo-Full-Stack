interface Props {
  title: string
}

function Post({ title }: Props) {
  return <div>{title}</div>
}

export default Post
