import React, { Component, Fragment } from 'react';
import '../style.css';

// Material UI
import { Grid, AppBar, Toolbar } from '@material-ui/core';

// Helper functions
import isEmpty from '../Helpers/isEmpty';
import getCurrentDate from '../Helpers/getCurrentDate';
import reFormatTitle from '../Helpers/reFormatTitle';

// Components
import ToDoForm from './ToDoForm';
import ToDoList from './ToDoList';

/*
    App is a top level component that contains the state for the entire application,
    as well as functions that modify the state which are passed to child components as props.
*/
class App extends Component {

    constructor() {
        super();
        this.state = {
            tasks: [],
            task: '',
            editMode: false,
            error: '',  // may contain an error message
            selectedTab: 0,  // 0 = All, 1 = To do, 2 = Complete
            numOfCompletedTasks: 0
        }
    }

    // Check if there are tasks saved in localstorage and add them to state otherwise create a sample list.
    componentWillMount() {
        
        if (!isEmpty(localStorage.tasks)) {
            this.setState({ tasks: JSON.parse(localStorage.tasks) }, () => this.getCompletedTasks());

        } else {
            this.setState({
                tasks: [
                    {
                        title: 'Work on DSA assignment',
                        date: 'Sat, 25 May 2019 at 11:37 pm 🌚',
                        isComplete: false
                    },
                    {
                        title: 'Finish up TinderFood app',
                        date: 'Fri, 24 May 2019 at 3:25 pm 🌞',
                        isComplete: false
                    },
                    {
                        title: 'Write report for PMP',
                        date: 'Wed, 22 May 2019 at 7:00 pm 🌚',
                        isComplete: false
                    },
                    {
                        title: 'Implement ISD features',
                        date: 'Sun, 19 May 2019 at 10:00 am 🌞',
                        isComplete: true
                    }
                ]
            }, () => this.getCompletedTasks())
        }
    }

    onTextChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    /*
        This function takes a task as input, validates it, reformats it and gets the current date.
        Each task in the array is an object containing 3 properties: title, date and isComplete.
    */
    addTask = event => {
        event.preventDefault();

        const { tasks, task } = this.state;
        
        if (isEmpty(task))
            this.setState({ error: 'Task field cannot be empty.' });

        else if (task.length < 5)
            this.setState({ error: 'Task must be atleast 5 characters.' });

            // check if task is already available
        else if (tasks.filter(t => t.title.toLowerCase() === task.trim().toLowerCase()).length)
            this.setState({ error: `${task} is already in your list!` });
            
        else {
            let title = reFormatTitle(task);
            let date = getCurrentDate();

            let newTask = {
                title,
                date,
                isComplete: false
            };

            this.setState({ 
                tasks: [newTask, ...tasks], 
                editMode: false,
                task: '',
                error: ''
            }, () => this.saveTasksToLocalStorage());
        }
    }

    // This function takes a tab index as a parameter and updates the state.
    onTabSelect = (tab) => {
        this.setState({ selectedTab: tab });
    }

    editTask = index => {
        let selectedTask = this.state.tasks[index].title;
        this.setState({ 
            tasks: this.state.tasks.filter(task => task.title !== selectedTask), 
            task: selectedTask, 
            editMode: true 
        }, () => this.saveTasksToLocalStorage());
    } 

    toggleDone = index => event => {
        let { tasks } = this.state;
        tasks[index].isComplete = !tasks[index].isComplete;
        this.setState({ tasks }, () => {
            this.getCompletedTasks();
            this.saveTasksToLocalStorage();
        });
    }

    deleteTask = index => {
        let selectedTask = this.state.tasks[index].title;
        this.setState({ tasks: this.state.tasks.filter(task => task.title !== selectedTask) }, () => {
            this.getCompletedTasks();
            this.saveTasksToLocalStorage();
        })
    }

    // Empty the tasks array
    deleteAll = () => {
        this.setState({ tasks: [] , numOfCompletedTasks: 0 });
        localStorage.removeItem('tasks');
    }

    // This function marks ALL tasks as either complete or uncomplete (depending on what val is).
    markAllTasks = val => {
        let tasks = this.state.tasks.map(item => {
            item.isComplete = val;
            return item;
        });

        this.setState({ tasks }, () => {
            this.getCompletedTasks();
            this.saveTasksToLocalStorage();
        })
    }

    getCompletedTasks = () => {
        this.setState({ 
            numOfCompletedTasks: this.state.tasks.filter(task => task.isComplete).length
        });
    }
    
    saveTasksToLocalStorage = () => {
        localStorage.setItem('tasks', JSON.stringify(this.state.tasks));
    }

    render() {

        const { tasks, task, error, editMode, selectedTab, numOfCompletedTasks } = this.state;

        return (
        <Fragment>
            <AppBar>
                <Toolbar/>
            </AppBar>

            <Grid container className="appContainer">    
                <Grid item xs={12}>
                    <Grid container justify="center">
                        <ToDoForm 
                            task={task} 
                            error={error}
                            editMode={editMode}
                            onTextChange={this.onTextChange} 
                            addTask={this.addTask}
                        />

                        <ToDoList 
                            tasks={tasks} 
                            numOfCompletedTasks={numOfCompletedTasks}
                            selectedTab={selectedTab}
                            onTabSelect={this.onTabSelect}
                            editTask={this.editTask} 
                            deleteTask={this.deleteTask}
                            deleteAll={this.deleteAll} 
                            toggleDone={this.toggleDone}
                            markAllTasks={this.markAllTasks}
                        />
                    </Grid>
                </Grid>
            </Grid>
        </Fragment>
    );
  }
}

export default App;