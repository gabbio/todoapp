import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, List, Paper } from '@material-ui/core';
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

  useStyles() {
    return makeStyles((theme) => ({
      title: {
        flexGrow: 1,
      },
      action: {
        backgroundColor: "transparent",
        boxShadow: "none"
      }
    }));
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
    let tasks = this.state.tasks.filter(task => task.id != checkedTask.id);
    this.setState({ tasks: [checkedTask, ...tasks] });
  }

  render() {
    const classes = this.useStyles();
    return (
      <Paper>
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
      </Paper>
    );
  }
}

const isChecked = task => task.checked_at
const isNotChecked = task => !task.checked_at

export default TasksList;