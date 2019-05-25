import React from 'react'
import { Typography, TextField } from '@material-ui/core';


import Button from '@material-ui/core/Button';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';
import { makeStyles } from '@material-ui/core/styles';

const ToDoForm = ({task, error, editMode, onTextChange, addTask}) => {

    let label = editMode ? 'Edit task' : 'Add a task'

    return (
        <div className="center top">
            <Typography color="primary" variant="h3"><span className="click">CLICK</span><span className="emoji">🔖</span> <span className="done">DONE </span></Typography>
            
            <form autocomplete="off" className="addTaskForm" noValidate onSubmit={addTask}>
                <TextField error={error} helperText={error ? error : ''} label={label} autoFocus name="task" fullWidth={true} value={task} onChange={onTextChange}/>
            </form>
        </div>
    )
}

export default ToDoForm;
