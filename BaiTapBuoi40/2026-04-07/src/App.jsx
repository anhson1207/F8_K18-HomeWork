import {useState} from "react";


const App = () => {
  // let num = 100000000

  console.log('re-render')
  const [num, setNum] = useState(1000)

  const students = [
    { id: 1, name: 'Nguyen Van A'},
    { id: 2, name: 'Nguyen Van B'},
    { id: 3, name: 'Nguyen Van C1'},
    { id: 6, name: 'Nguyen Van D'},
    { id: 5, name: 'Nguyen Van E'},
  ]

  const name = 'f8'

  const onClickBtn = () => {
    setNum(num + 1)
    console.log('num', num)
  }

  return (
    <>
      <ul>
        {
          students.map((student, index) => {
            return <li key={index}>{student.name}</li>
          })
        }
      </ul>
      <hr/>
      <h1>hihihihi</h1>
      <h2>hihihihi</h2>
      <h3>num: {num}</h3>
      <h3>name: {name}</h3>
      <button onClick={onClickBtn}>click me</button>
    </>
  )
}

export default App
