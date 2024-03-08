
import backendAPI from '../utils/backendAPI.js'

function TestComponent() {

  const test = async () => {
    backendAPI.get("find-all").then((usuarios) => {
      console.log(usuarios)
    })
  }

  return (
    <>
      <h1>TestComponent</h1>
      <button onClick={test}>test</button>
    </>
  )
}

export default TestComponent