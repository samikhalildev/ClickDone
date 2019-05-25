import React from 'react'
import { withStyles, ListItem, IconButton, ListItemIcon, ListItemSecondaryAction, ListItemText, Paper, FormControl, FormControlLabel, Checkbox, TextField, Button, Fab, Icon, Dialog, DialogActions, DialogContent, DialogTitle, Tooltip, Typography } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { green } from '@material-ui/core/colors';

const TaskList = (props) => {

    const { item, index } = props;

    const GreenCheckbox = withStyles({
        root: {
          color: green[400],
          '&$checked': {
            color: green[600],
          },
        },
        checked: {},
      })(props => <Checkbox color="default" {...props} />);
 
    return (
        <Paper className={ item.isComplete ? 'complete paper' : 'paper'}>
            <ListItem key={index}>
                <ListItemIcon>
                    <GreenCheckbox
                        edge="start"
                        checked={item.isComplete}
                        onChange={props.toggleDone(index)}
                        disableRipple
                    />
                </ListItemIcon>
                
                <ListItemText
                    primary={item.title}
                    secondary={item.date}
                />

                <div className="icons">
                    <Tooltip title="Edit">
                        <Fab onClick={() => props.editTask(index)} size="small" color="primary" aria-label="Edit">
                            <Icon>edit_icon</Icon>
                        </Fab>
                    </Tooltip>
                </div>
                
                <div className="icons">
                    <Tooltip title="Delete">
                        <Fab onClick={() => props.deleteTask(index)} size="small" color="secondary" aria-label="Delete">
                            <DeleteIcon />
                        </Fab>
                    </Tooltip>
                </div>
            </ListItem>
        </Paper>
    )
}

export default TaskList;
