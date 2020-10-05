import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Fab } from "@material-ui/core";
import { Switch, Route, useLocation, useHistory } from 'react-router-dom'
import AddIcon from '@material-ui/icons/Add';
import AddTask from './AddTask';
import TasksList from './TasksList';



const App = () => {
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    title: {
      flexGrow: 1,
    },
    action: {
      backgroundColor: "transparent",
      boxShadow: "none"
    }
  }));

  const classes = useStyles();
  const location = useLocation();
  const history = useHistory();

  return (
    <div className={classes.root}>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            {isTasksListPage(location.pathname) ? "Tasks" : "Add Task"}
          </Typography>
          {isTasksListPage(location.pathname) &&
            <Fab color="primary" aria-label="add" disableRipple className={classes.action} onClick={() => { history.push('/Addtask') }}>
              <AddIcon variant='inherit' />
            </Fab>
          }
        </Toolbar>
      </AppBar>
      <Switch>
        <Route exact path={["/", "/tasksList"]}>
          <TasksList />
        </Route>
        <Route path="/Addtask">
          <AddTask />
        </Route>
      </Switch>
    </div>
  );
}

function isTasksListPage(path) {
  return ["/", "/tasksList"].includes(path)
}

export default App;