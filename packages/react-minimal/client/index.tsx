import { createRoot } from 'react-dom/client'

const data = { name: 'humans' }

function helloTemplate(props: { name: string }) {
  return <div>hello {props.name}</div>
}

const view = helloTemplate(data)

createRoot(document.getElementById('root') as HTMLElement).render(view)
