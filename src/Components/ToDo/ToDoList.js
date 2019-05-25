import React, { Fragment } from 'react'
import ToDoItem from './ToDoItem';
import { List, Button } from '@material-ui/core';

const TaskList = ({tasks, editTask, deleteTask, toggleDone, deleteAll}) => {
    let numOfCompletedTasks = 0;
    let numOfRemainingTasks = 0;

    const tasksToDisplay = tasks.map((item, index) => {
        numOfCompletedTasks += item.isComplete ? 1 : 0
        return (
            <ToDoItem 
                item={item}
                index={index}
                editTask={editTask} 
                deleteTask={deleteTask} 
                toggleDone={toggleDone}
            />
        )
    })

    return (
        <List className="list">
            {tasks.length ? (
                <Fragment>
                    {
                        tasks.length - numOfCompletedTasks == 0 
                        ?   <p> Well done you have completed all tasks. ✅ </p> 
                        :   <p> You have {
                                numOfCompletedTasks == 1 ? `${numOfCompletedTasks} completed task` : `${numOfCompletedTasks} completed tasks`} and {tasks.length - numOfCompletedTasks} remaining {tasks.length - numOfCompletedTasks == 1 ? 'task' : 'tasks' }.
                            </p>
                    }
                    {tasksToDisplay}
                    <div className="clear-all">
                        <Button onClick={deleteAll} variant="contained" size="large" color="primary">   
                            Clear All
                        </Button>
                    </div>

                </Fragment>
            ) : (
                <p> You don't have any tasks available. 🔖</p>
            )}
            
        </List>
    )
}

export default TaskList;
