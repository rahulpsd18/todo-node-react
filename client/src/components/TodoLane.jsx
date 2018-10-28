import React from 'react';
import { Paper, Grid, withStyles } from '@material-ui/core';
import { Droppable } from 'react-beautiful-dnd';
import { TodoCard } from './TodoCard';

const styles = theme => ({
  root: {
    flexGrow: 1,
    position: 'relative',
  },
  lane: {
    flexGrow: 1,
    maxWidth: 500,
    padding: theme.spacing.unit * 4,
  },
});

const TodoLaneImpl = (props) => {
  const { classes } = props;

  return (
    <Droppable droppableId="droppable">
      {(provided) => (
        <div ref={provided.innerRef} className={classes.root}>
          <Grid container spacing={8} alignContent="center"
            alignItems="center" justify="center">
            <Paper className={classes.lane}>
              {
                props.items.length > 0
                  ? props.items.map((item, index) => (
                    <Grid item xs={12} index={item._id} key={item._id}>
                      <TodoCard item={item} index={index} />
                    </Grid>
                  ))
                  : null
              }
              {provided.placeholder}
            </Paper>
          </Grid>
        </div>
      )}
    </Droppable>
  );
}

export const TodoLane = withStyles(styles)(TodoLaneImpl);
