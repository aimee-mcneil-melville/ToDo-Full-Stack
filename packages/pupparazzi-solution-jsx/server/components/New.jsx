function New() {
  return (
    <>
      <h2 className="title">Add a new puppy</h2>

      <form className="form" action="/new" method="post">
        <label htmlFor="name" className="form-item">
          Name: <input type="text" name="name" />
        </label>

        <label htmlFor="breed" className="form-item">
          Breed: <input type="text" name="breed" />
        </label>

        <label htmlFor="owner" className="form-item">
          Owner:
          <input type="text" name="owner" />
        </label>

        <label htmlFor="image" className="form-item">
          Image URL: <input type="text" name="image" />
        </label>

        <input type="submit" value="Submit" />
      </form>
    </>
  )
}

export default New
