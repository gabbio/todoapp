import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Fab } from "@material-ui/core";
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
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

  return (
    <div className={classes.root}>
      <Router>
        <AppBar position="sticky">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              {isTasksListPage(document.location.pathname) ? "Tasks" : "Add Task"}
            </Typography>
            {isTasksListPage(document.location.pathname) ?
              <Fab color="primary" aria-label="add" className={classes.action}>
                <Link to="/taskAdd">
                  <AddIcon color="primary" />
                </Link>
              </Fab> :
              null
            }
          </Toolbar>
        </AppBar>
        <Switch>
          <Route exact path={["/", "/tasksList"]}>
            <TasksList />
          </Route>
          <Route path="/taskAdd">
            <AddTask />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

function isTasksListPage(path) {
  return ["/", "/tasksList"].includes(path)
}

export default App;