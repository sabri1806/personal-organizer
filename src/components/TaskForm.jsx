import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../redux/features/taskSlice";
import { nanoid } from 'nanoid'

const TaskForm = () => {

    const [text, setText] = useState('');

    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault();

        const trimmedText = text.trim();

        dispatch(addTask({
            id: nanoid(),
            text: trimmedText,
            completed: false,
        }))
        setText('')

    }

    return (
        <form onSubmit={handleSubmit} className="flex items-center gap-2 mb-4">
            <label htmlFor="task-input" className="sr-only">New Task</label>
            <input
                id="task-input"
                type="text"
                value={text}
                placeholder="Add new task"
                className="flex-1 p-2 border rounded-md"
                onChange={(e) => setText(e.target.value.trimStart())} 
               />

            <button
                type="submit"
                title="Press Enter to add task"
                className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:opacity-75"
                disabled={text.trim() === ''}>Add Task</button>
        </form>
    )
}
export default TaskForm