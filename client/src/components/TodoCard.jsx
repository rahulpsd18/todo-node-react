import React from 'react';
import { Card, CardHeader, CardContent, Typography, IconButton, withStyles } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Draggable } from 'react-beautiful-dnd';

const styles = theme => ({
    card: {
        minWidth: 400,
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});


const TodoCardImpl = (props) => {
    const { item, index, classes } = props;

    return (
        <Draggable key={item._id} draggableId={item._id} index={index}>
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{
                        userSelect: 'none',
                        margin: `0 0 8px 0`, ...provided.draggableProps.style
                    }}
                >
                    <Card className={classes.card} style={{background: snapshot.isDragging ? '#f3f3f6' : 'white'}}>
                        <CardHeader
                            action={
                                <IconButton>
                                    <MoreVertIcon />
                                </IconButton>
                            }
                            title={item.title}
                            titleTypographyProps={{ style: { fontSize: '1em' } }}
                            subheaderTypographyProps={{ style: { fontSize: '0.8em' } }}
                            subheader={new Date(item.createdAt).toDateString()}
                        />
                        <CardContent>
                            <Typography component="p">
                                {item.description}
                            </Typography>
                        </CardContent>
                    </Card>
                </div>
            )}
        </Draggable>
    );
}

export const TodoCard = withStyles(styles)(TodoCardImpl);

// {background: snapshot.isDragging ? 'lightgreen' : '#f3f3f6'}