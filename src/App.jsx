import './App.css'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'

function App() {
  

  return (
    <div className='max-w-xl mx-auto p-4'>
     <h1 className='text-2xl font-bold mb-4 pt-16'>Personal organizer</h1>
    <TaskForm/>
    <TaskList/>
    </div>
  )
}

export default App
