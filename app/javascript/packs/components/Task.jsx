import React from 'react';
import { ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Avatar, Checkbox, Typography } from "@material-ui/core";
import axios from 'axios';
import { setCsrfToken, displayDate } from '../utils/helpers'

class Task extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      id: this.props.id,
      description: this.props.description,
      avatar: this.props.avatar,
      checked_at: this.props.checked_at,
    }
    this.updateTaskPath = `/tasks/${this.state.id}`
    this.handlechange = this.handlechange.bind(this)
  }

  handlechange(e) {
    this.markAsChecked();
  }

  // Mark the task as checked and update it in the database
  async markAsChecked() {
    setCsrfToken(document, axios);
    let checkedAt = Date();
    this.setState({ checked_at: checkedAt });

    try {
      let response = await axios.put(this.updateTaskPath, { checked_at: checkedAt });

      if (response.status === 204) {
        this.props.updateTasksList(this.state);
      } else {
        console.log(response.data.error);
      }
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <ListItem id={this.state.id} >
        <ListItemAvatar>
          <Avatar src={this.state.avatar} />
        </ListItemAvatar>
        <ListItemText
          primary="username"
          secondary={<Typography variant="body1" gutterBottom>{this.state.description}</Typography>} />
        {(this.state.checked_at) ? (
          <Typography>
            {displayDate(this.state.checked_at)}
          </Typography>
        ) : (
            <ListItemSecondaryAction>
              <Checkbox onChange={this.handlechange} />
            </ListItemSecondaryAction>
          )}

      </ListItem >
    );
  }
}

export default Task;