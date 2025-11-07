import { createSlice } from '@reduxjs/toolkit'


const loadDataFromLocalStorage = () => {
    try {
        const data = localStorage.getItem('trying to save tasks')
        return data ? JSON.parse(data) : []
    } catch (error) {
        return []
    }
}

const saveDataToLocalStorage = (tasks) => {
    localStorage.setItem("trying to save tasks", JSON.stringify(tasks))
}

const taskSlice = createSlice({
    name: 'tasks',
    initialState: {
        tasks: loadDataFromLocalStorage(),
        filter: {
            status:'all',
            search: '',

        }
    },
    reducers:{
        //for each feature
        addTask: (state, action) => {
          state.tasks.push(action.payload);
          saveDataToLocalStorage(state.tasks)
        },
        deleteTask: (state, action) => {
            state.tasks = state.tasks.filter(task => task.id !== action.payload);
            saveDataToLocalStorage(state.tasks)
        },
        toogleTasksCompleted: (state,action) => {
            const task = state.tasks.find(t => t.id === action.payload);
            if (task) task.completed = !task.completed;
            saveDataToLocalStorage(state.tasks)
        },
        editTask: (state, action) => {
            const {id, nextText } = action.payload;
            const task = state.tasks.find(t => t.id === id);
            if (task) task.text = nextText;
            saveDataToLocalStorage(state.tasks)
        },
        setStatusFilter: (state, action) => {
            state.filter.status = action.payload;
        },
        setSearchFilter: (state, action) => {
            state.filter.search = action.payload;
        }
    }
})

export const { addTask, deleteTask, toogleTasksCompleted, editTask, setStatusFilter, setSearchFilter } = taskSlice.actions;
export default taskSlice.reducer;