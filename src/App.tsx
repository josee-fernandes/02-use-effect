import { useEffect, useState } from 'react'

function avisarAPI() {
  console.log('Lista salva!')
}

export function App() {
  const [list, setList] = useState<string[]>([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    avisarAPI()
  }, [list])

  useEffect(() => {
    fetch('https://api.github.com/users/josee-fernandes/repos')
      .then(response => response.json())
      .then(data => {
        setList(data.map((item: any) => item.full_name))
      })
  }, [])

  const filteredList = list.filter(item => item.includes(filter))

  function addToList() {
    setList(oldList => [...oldList, 'Novo item'])
  }

  return (
    <div>
      <input type="text" value={filter} onChange={event => setFilter(event.target.value)}/>

      <ul>
        {list.map(item => <li>{item}</li>)}
      </ul>
      <ul>
        {filteredList.map(item => <li>{item}</li>)}
      </ul>

      <button onClick={addToList}>Add to list</button>
    </div>
  )
}
