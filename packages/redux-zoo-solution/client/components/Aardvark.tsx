interface Props {
  name: string
}

function Aardvark(props: Props) {
  const aardvark = props.name

  return <div>{aardvark}</div>
}

export default Aardvark
