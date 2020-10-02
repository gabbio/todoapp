import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, TextField, FormGroup, FormControl, Paper } from '@material-ui/core';
import axios from 'axios';
import { setCsrfToken } from '../utils/helpers'

class AddTask extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      description: props.description,
      avatar: props.avatar
    }
    this.addTaskPath = '/tasks'
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }


  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    this.createTask(this.state)
  }

  // Creat a new task from inputs' values
  async createTask(data) {
    setCsrfToken(document, axios);

    try {
      let response = await axios.post(this.addTaskPath, data);
      console.log(response.status === 201);

      if (response.status === 201) {
        this.setState({
          description: '',
          avatar: ''
        });
        window.location.pathname = '/tasksList';
      } else {
        console.log(response.data.error)
      }
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <Paper>
        <form onSubmit={this.handleSubmit}>
          <FormGroup variant="md">
            <FormControl margin="dense">
              <TextField id="description" label="Task Description" name="description" value={this.state.description} onChange={this.handleChange} />
            </FormControl>
            <FormControl margin="dense">
              <TextField id="avatar" label="Avatar URL" name="avatar" value={this.state.avatar} onChange={this.handleChange} />
            </FormControl>
            <Button type="submit" variant="contained" color="primary">
              Add Task
            </Button>
          </FormGroup>
        </form>
      </Paper>
    );
  }
}

AddTask.defaultProps = {
  description: '',
  avatar: ''
}

export default AddTask;