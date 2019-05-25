import React from 'react'

const Tracker = ({tasks, numOfCompletedTasks}) => {
    return (
        tasks.length - numOfCompletedTasks === 0 
        ?   <p> Well done you have completed all tasks <span role="img" aria-label="done">✅</span> </p> 
        :   <p> You have {numOfCompletedTasks === 1 ? `${numOfCompletedTasks} completed task` : `${numOfCompletedTasks} completed tasks`} and {tasks.length - numOfCompletedTasks} remaining {tasks.length - numOfCompletedTasks === 1 ? 'task' : 'tasks' }.
            </p>
    )
}

export default Tracker;