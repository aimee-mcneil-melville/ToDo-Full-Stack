import { useParams, Link } from 'react-router-dom'
import countries from '../../data/countries.ts'

export default function Country() {
  const { code, id } = useParams()
  const country = countries.find((country) => country.code === code)

  if (!country) {
    return <p>No country found with code: {code}</p>
  }

  return (
    <section style={{ paddingLeft: '100px' }}>
      <h2>{country.name}</h2>
      <dl>
        <dt>
          Area (km<sup>2</sup>)
        </dt>
        <dd>{country.areaSqKms}</dd>
        <dt>Capital</dt>
        <dd>{country.capital}</dd>
        <dt>Currency code</dt>
        <dd>{country.currencyCode}</dd>
        <dt>Flag</dt>
        <dd>
          <span className={`fi fi-${country.code.toLocaleLowerCase()}`}></span>
        </dd>
        <dt>Population</dt>
        <dd>{country.population}</dd>
      </dl>
      {country.neighbours && (
        <>
          <h3>Neighbours</h3>
          <ul>
            {country.neighbours.split(',').map((code) => {
              const country = countries.find((country) => country.code === code)
              if (!country) return <li key={code}>{code}</li>
              return (
                <li key={code}>
                  <Link to={`/continent/${id}/${code}`}>{country.name}</Link>
                </li>
              )
            })}
          </ul>
        </>
      )}
    </section>
  )
}
