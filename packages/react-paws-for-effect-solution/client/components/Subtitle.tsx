interface Props {
  text: string
}

const Subtitle = (props: Props) => {
  return <h2>{props.text}</h2>
}

export default Subtitle
