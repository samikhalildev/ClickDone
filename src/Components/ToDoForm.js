import React from 'react'
import { Typography, TextField } from '@material-ui/core';

const ToDoForm = ({task, error, editMode, onTextChange, addTask}) => {

    let label = editMode ? 'Edit task' : 'Add a task'

    return (
        <div className="center top">
            <Typography color="primary" variant="h3">
                <span className="click">CLICK</span>
                <span className="emoji" aria-label="note" role="img">🔖</span>
                <span className="done">DONE</span>
            </Typography>
            
            <form autoComplete="off" className="addTaskForm" onSubmit={addTask}>
                <TextField error={error ? error : undefined} helperText={error ? error : undefined} label={label} autoFocus name="task" fullWidth={true} value={task} onChange={onTextChange}/>
            </form>
        </div>
    )
}

export default ToDoForm;
