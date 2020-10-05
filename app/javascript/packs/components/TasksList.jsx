import React from 'react';
import { Container, List } from '@material-ui/core';
import axios from 'axios';
import { setCsrfToken } from '../utils/helpers'
import Task from './Task';

class TasksList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: []
    }
    this.getTasksPath = '/tasks'
    this.updateTasksList = this.updateTasksList.bind(this);
  }

  componentDidMount() {
    this.getTasksList();
  }

  // Retrieve all the tasks
  async getTasksList() {
    setCsrfToken(document, axios);

    try {
      let response = await axios.get(this.getTasksPath)
      this.setState({ tasks: response.data })
    } catch (error) {
      console.log(error);
    }
  }

  // Update the list ito keep it ordered
  updateTasksList(checkedTask) {
    let tasks = this.state.tasks
    let task = tasks.find(task => task.id === checkedTask.id);
    tasks[tasks.indexOf(task)] = checkedTask
    this.setState({ tasks: tasks });
  }

  render() {
    // const classes = this.useStyles();
    return (
      <Container>
        <Container maxWidth="lg">
          <List>
            {this.state.tasks.filter(isChecked).map(task => (
              <Task key={task.id} {...task} />
            ))}
          </List>
        </Container>
        <Container maxWidth="lg">
          <List>
            {this.state.tasks.filter(isNotChecked).map(task => (
              <Task key={task.id} updateTasksList={this.updateTasksList} {...task} />
            ))}
          </List>
        </Container>
      </Container>
    );
  }
}

const isChecked = task => task.checked_at
const isNotChecked = task => !task.checked_at

export default TasksList;