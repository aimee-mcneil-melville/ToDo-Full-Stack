function Edit({ puppyDetails }) {
  const { id, name, breed, owner, image } = puppyDetails
  return (
    <form className="form" action={`/edit/${id}`} method="post">
      <img className="img-circle" src={image} alt={name} />
      <label htmlFor="name" className="form-item">
        Name:
        <input type="text" name="name" defaultValue={name} />
      </label>

      <label htmlFor="breed" className="form-item">
        Breed:
        <input type="text" name="breed" defaultValue={breed} />
      </label>

      <label htmlFor="owner" className="form-item">
        Owner:
        <input type="text" name="owner" defaultValue={owner} />
      </label>

      <input type="hidden" name="image" defaultValue={image} />

      <input type="submit" name="" defaultValue="Submit" />
    </form>
  )
}

export default Edit
