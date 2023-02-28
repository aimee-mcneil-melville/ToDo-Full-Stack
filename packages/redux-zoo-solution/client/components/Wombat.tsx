import EditWombat from './EditWombat'

export interface Props {
  name: string
}

function Wombat(props: Props) {
  const wombat = props.name

  return (
    <div>
      {wombat}
      <EditWombat name={wombat} />
    </div>
  )
}

export default Wombat
