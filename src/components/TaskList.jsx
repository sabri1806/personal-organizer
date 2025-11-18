import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toogleTasksComplete, editTask, deleteTask, setSearchFilter, setStatusFilter } from "../redux/features/taskSlice";
import { getSuggestedTask } from "../utils/aiSuggestions";

const TaskList = () => {

    const { tasks, filter } = useSelector((state) => state.tasks);
    const dispatch = useDispatch();
    const [editId, setEditId] = useState(null);
    const [editText, setEditText] = useState('');
    const [newTaskSuggest, setNewTaskSuggest] = useState("");

    const matchesStatus = (task) => {
        return filter.status === "completed"
            ? task.completed
            : filter.status === "pending"
                ? !task.completed
                : true;
    }
    const matchesSearch = (task) => {
        return task.text.toLowerCase().includes(filter.search.toLowerCase());
    }

    const filteredTasks = tasks.filter(
        task => matchesStatus(task) && matchesSearch(task)
    );

    const handleEdit = (id, text) => {
        setEditId(id);
        setEditText(text);
    }

    const handleSave = (id) => {
        if (editText.trim()) {
            dispatch(editTask({ id, nextText: editText.trim() }))
            console.log('guarde: ', tasks)
            setEditId(null)
            setEditText('')
        }
    }

    const handleTaskSuggest = async () => {
        try {
            const suggestion = await getSuggestedTask();
            setNewTaskSuggest(suggestion);
        } catch (error) {
            console.error("Error getting suggestion:", error);
        }
    }

    return (
        <div>
            {/* search & filter task*/}
            <input
                type="text"
                placeholder="Search task"
                value={filter.search}
                onChange={(e) => dispatch(setSearchFilter(e.target.value))}
                className="w-full p-2 border rounded mb-4" />

            {/* filter task*/}
            <div className="flex gap-4 mb-4">
                {
                    ['all', 'completed', 'pending'].map(status => (
                        <button
                            key={status}
                            onClick={() => {dispatch(setStatusFilter(status))}}
                            className={`px-5 py-2 rounded border ${filter.status === status ? 'bg-blue-500 text-white' :
                                'bg-white'}`}>{status.charAt(0).toUpperCase() + status.slice(1)}
                        </button>
                    ))
                }
            </div>

            {/* AI suggest UI */}
            <div className="flex flex-col gap-3 mb-4">
                <button
                    onClick={handleTaskSuggest}
                    className=" w-full bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
                >
                    🤖 Suggest a task using AI
                </button>
                <input
                    type="text"
                    placeholder="AI suggested task"
                    value={newTaskSuggest}
                    onChange={(e) => setNewTaskSuggest(e.target.value)}
                    className="border p-2 rounded w-full"
                />
            </div>

            {/*display tasks */}
            <ul className="space-y-2">
                {filteredTasks.length === 0 && <p>No tasks found</p>}
                {
                    filteredTasks.map(task => (
                        <li key={task.id} className="flex items-center justify-between p-3 border rounded">
                            <div className="flex items-center gap-2">
                                <input type="checkbox"
                                    checked={task.completed}
                                    onChange={(e) => dispatch(toogleTasksComplete(task.id))}
                                    className="border rounded px-2"
                                />
                                {
                                    editId === task.id ? (
                                        <input type="text" value={editText} onChange={(e) => setEditText(e.target.value)} className="border rounded px-2" />
                                    ) : (<span className={task.completed ? 'line-through text-gray-500' : ''}>{task.text}</span>)
                                }
                            </div>
                            <div className="flex gap-2">
                                {
                                    editId === task.id ? (
                                        <button
                                            onClick={() => handleSave(task.id)}
                                            className="text-gray-600 hover:underline cursor-pointer">Save</button>
                                    ) : (
                                        <button
                                            onClick={() => handleEdit(task.id, task.text)}
                                            className="text-blue-600 hover:underline cursor-pointer">Edit</button>
                                    )
                                }
                                <button onClick={() => dispatch(deleteTask(task.id))} className="text-red-500 hover:underline cursor-pointer">Delete</button>
                            </div>

                        </li>

                    ))
                }
            </ul>
        </div>
    )

}
export default TaskList;