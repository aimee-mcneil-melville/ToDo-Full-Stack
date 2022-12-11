interface Props {
  name: string
  breed: string
  superpower: string
}

const Dog = (props: Props) => {
  return (
    <div className="dog-wrapper">
      <div className="dog">
        <div className="dog-name-plate">
          <span className="dog-name">{props.name}</span>
          <span className="dog-breed">{props.breed}</span>
        </div>
        <span className="dog-superpower">{props.superpower}</span>
        <img
          src={`/images/${props.breed.toLowerCase()}.png`}
          alt={`a ${props.breed}`}
        />
      </div>
    </div>
  )
}

export default Dog
