import React, { Fragment } from 'react'
import { List, Button, Tabs, Tab } from '@material-ui/core';

import ToDoTracker from './ToDoTracker';
import ToDoItem from './ToDoItem';

const ToDoList = ({tasks, numOfCompletedTasks, selectedTab, onTabSelect, editTask, deleteTask, toggleDone, deleteAll, markAllTasks}) => {

    const allTasks = tasks.map((item, index) => {
        return (
            <ToDoItem 
                item={item}
                key={index}
                index={index}
                editTask={editTask} 
                deleteTask={deleteTask} 
                toggleDone={toggleDone}
            />
        )
    })

    const completedTasks = tasks.map((item, index) => {
        if (item.isComplete) {
            return (
                <ToDoItem 
                    item={item}
                    key={index}
                    index={index}
                    editTask={editTask} 
                    deleteTask={deleteTask} 
                    toggleDone={toggleDone}
                />
            )
        }
    })

    const unCompletedTasks = tasks.map((item, index) => {
        if (!item.isComplete) {
            return (
                <ToDoItem 
                    item={item}
                    key={index}
                    index={index}
                    editTask={editTask} 
                    deleteTask={deleteTask} 
                    toggleDone={toggleDone}
                />
            )
        }
    })

    return (
        <List className="list">
            {tasks.length ? (
                <Fragment>
                    <ToDoTracker tasks={tasks} numOfCompletedTasks={numOfCompletedTasks}/>
                    <Tabs 
                        value={selectedTab}
                        indicatorColor="primary"
                        onChange={(event, index) => onTabSelect(index)}
                        textColor="primary"
                        centered>

                        <Tab label="All"/>
                        <Tab label="To do"/>
                        <Tab label="Completed"/>
                    </Tabs>

                    { selectedTab === 0 ?
                        (
                            <Fragment>
                                { allTasks }
                                <div className="tasks-action-button">
                                    <Button onClick={deleteAll} variant="contained" size="large" color="primary">   
                                        Clear All
                                    </Button>
                                </div>
                            </Fragment>

                        ) : selectedTab === 1 ? (
                            <Fragment>
                                { unCompletedTasks }
                                <div className="tasks-action-button">
                                    <Button disabled={tasks.length - numOfCompletedTasks === 0 ? 'disabled' : false} onClick={() => markAllTasks(true)} variant="contained" size="large" color="primary">   
                                        Mark All as Completed
                                    </Button>
                                </div>
                            </Fragment>

                        ) : (
                            <Fragment>
                                { completedTasks }
                                <div className="tasks-action-button">
                                    <Button disabled={numOfCompletedTasks === 0 ? 'disabled' : false} onClick={() => markAllTasks(false)} variant="contained" size="large" color="primary">   
                                        Mark All as Uncompleted
                                    </Button>
                                </div>
                            </Fragment>
                        )
                    }
                </Fragment>
            ) : (
                <p> You don't have any tasks available. <span role="img" aria-label="note">🔖</span></p>
            )}
            
        </List>
    )
}

export default ToDoList;
