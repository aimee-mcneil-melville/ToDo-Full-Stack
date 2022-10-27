interface IProps {
  name: string
}

function Wombat(props: IProps) {
  const wombat = props.name

  return <div>{wombat}</div>
}

export default Wombat
