import React from 'react';
import { Card, CardHeader, CardContent, Typography, withStyles } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { Draggable } from 'react-beautiful-dnd';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Button from '@material-ui/core/Button';
import AlertDialog from './AlertDialog';
import Popover from './Popover';
import TodoForm from './TodoForm';

const styles = ({
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


class TodoCard extends React.Component {

    state = {
        delete: false,
        edit: false,
    }

    handleDelete = () => {
        this.props.onDelete([this.props.item._id]);
        this.handleClose();
    }

    handleEdit = (data) => {
        this.props.onEdit(this.props.item._id, data);
        this.handleClose();
    }

    handleClose = () => {
        this.setState({ delete: false, edit: false });
    }

    render() {
        const { item, index, classes } = this.props;

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
                        <Card className={classes.card} style={{ background: snapshot.isDragging ? '#f3f3f6' : item.isActive ? 'white' : 'lightgrey' }}>
                            <CardHeader
                                action={
                                    <Popover>
                                        <List component="nav">
                                            <ListItem button onClick={() => this.setState({ edit: true })}>
                                                <ListItemIcon>
                                                    <EditIcon />
                                                </ListItemIcon>
                                                <ListItemText primary="Edit" />
                                            </ListItem>
                                            <ListItem button onClick={() => this.setState({ delete: true })}>
                                                <ListItemIcon>
                                                    <DeleteIcon />
                                                </ListItemIcon>
                                                <ListItemText primary="Delete" />
                                            </ListItem>
                                        </List>
                                    </Popover>
                                }
                                title={item.title}
                                titleTypographyProps={{ style: { fontSize: '1em' } }}
                                subheaderTypographyProps={{ style: { fontSize: '0.8em' } }}
                                subheader={`${new Date(item.createdAt).toDateString()} - Priority ${item.priority}`}
                            />
                            <CardContent>
                                <Typography component="p">
                                    {item.description}
                                </Typography>
                            </CardContent>
                        </Card>

                        <AlertDialog open={this.state.delete}>
                            <AlertDialog.Title>Are you sure?</AlertDialog.Title>
                            <AlertDialog.Content>This action is irreversible and can't be undone.</AlertDialog.Content>
                            <AlertDialog.Actions>
                                <Button onClick={this.handleClose} color="primary">
                                    Cancel
                                </Button>
                                <Button onClick={this.handleDelete} color="primary" autoFocus>
                                    Delete
                                </Button>
                            </AlertDialog.Actions>
                        </AlertDialog>

                        <TodoForm onSubmit={this.handleEdit} open={this.state.edit} isEditMode={true} {...item}/>
                    </div>
                )}
            </Draggable>
        );
    }
}

export default withStyles(styles)(TodoCard);
