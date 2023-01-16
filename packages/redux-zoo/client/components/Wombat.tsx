interface Props {
  name: string
}

function Wombat(props: Props) {
  const wombat = props.name

  return <div>{wombat}</div>
}

export default Wombat
