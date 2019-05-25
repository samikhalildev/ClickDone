import React, { Component } from 'react';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import './style.css';
import { Grid } from '@material-ui/core';
import isEmpty from './Utils/isEmpty';
import getCurrentDate from './Utils/getCurrentDate';
import reFormatTitle from './Utils/reFormatTitle';

import Header from './Components/Templates/Header';
import ToDoForm from './Components/ToDo/ToDoForm';
import ToDoList from './Components/ToDo/ToDoList';

class App extends Component {

    constructor() {
        super();
        this.state = {
            tasks: [],
            task: '',
            editMode: false,
            error: ''
        }
    }

    onTextChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    addTask = event => {
        event.preventDefault();

        const { tasks, task } = this.state;

        if (isEmpty(task))
            this.setState({ error: 'Task field cannot be empty.' });

        else if (task.length < 5)
            this.setState({ error: 'Task must be atleast 5 characters.' });

        else {
            let title = reFormatTitle(task);
            let date = getCurrentDate();

            this.setState({ 
                tasks: [
                    {
                        id: 1,
                        title,
                        date,
                        isComplete: false
                    }, ...tasks
                ], 
                editMode: false,
                task: '',
                error: ''
            });
        }
    }

    editTask = index => {
        let selectedTask = this.state.tasks[index].title;
        this.setState({ 
            tasks: this.state.tasks.filter(task => task.title !== selectedTask), 
            task: selectedTask, 
            editMode: true 
        });
    } 

    toggleDone = index => event => {
        let { tasks } = this.state;
        tasks[index].isComplete = !tasks[index].isComplete;
        this.setState({ tasks });
    }

    deleteTask = index => {
        let selectedTask = this.state.tasks[index].title;
        this.setState({ tasks: this.state.tasks.filter(task => task.title !== selectedTask) })
    }

    deleteAll = () => {
        this.setState({ tasks: [] });
    }

    render() {

        const { tasks, isEditing } = this.state;

        return (
        <MuiThemeProvider>
            <Header/>
            <Grid container style={{ flexGrow: 1 }}>    
                <Grid item xs={12}>
                    <Grid container justify="center">

                        <ToDoForm 
                            task={this.state.task} 
                            error={this.state.error}
                            editMode={this.state.editMode}
                            onTextChange={this.onTextChange} 
                            addTask={this.addTask}
                        />

                        <ToDoList 
                            tasks={tasks} 
                            editTask={this.editTask} 
                            deleteTask={this.deleteTask}
                            deleteAll={this.deleteAll} 
                            toggleDone={this.toggleDone}
                        />
                    </Grid>
                </Grid>
            </Grid>
        </MuiThemeProvider>
    );
  }
}

export default App;