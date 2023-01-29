import { useAppSelector } from '../hooks'

import Word from './Word'

function Words() {
  const words = useAppSelector((state) => state.words)

  return (
    <div>
      {words.map((word) => (
        <Word key={word.id} {...word} />
      ))}
    </div>
  )
}

export default Words
