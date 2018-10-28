import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { TodoLane } from '../../components/TodoLane';
import { TodoForm } from '../../components/TodoForm';
import { withAuthentication } from '../../withAuthentication';
import { getTasks, addTask, updateTask, updateTasks, deleteTasks } from '../../actions';

const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    result.forEach((res, index) => res.priority = index);

    return result;
};


class TodoPage extends React.Component {

    state = {
        items: ''
    };

    componentWillReceiveProps(props) {
        this.setState({
            items: props.tasks,
        });

        props.error && this.notify(props.error);
    }

    componentWillMount() {
        this.props.getTasks(this.props.token);
    }

    notify = (message) => toast.error(message, {
        position: toast.POSITION.TOP_RIGHT
    });

    onDragEnd = (result) => {
        if (!result.destination) {
            return;
        }

        const items = reorder(
            this.state.items,
            result.source.index,
            result.destination.index
        );

        this.props.updateTasks(items, this.props.token);

        this.setState({
            items,
        });
    }

    addTask = (data) => {
        console.log(data, this.props.token);
        this.props.addTask(data, this.props.token);
    }

    deleteTask = (tasks) => {
        this.props.deleteTasks(tasks);
        this.props.getTasks();
    }

    updateTask = (id, task) => {
        this.props.updateTask(id, task);
        this.props.getTasks();
    }

    render() {
        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
                <TodoLane onDelete={this.deleteTask} onEdit={this.updateTask} items={this.state.items} />
                <TodoForm onSubmit={this.addTask}/>
                <ToastContainer />
            </DragDropContext>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.loginReducer.user,
        token: state.loginReducer.token,
        tasks: state.tasksReducer.tasks,
        error: state.tasksReducer.error,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getTasks: () => dispatch(getTasks()),
        addTask: (data) => dispatch(addTask(data)),
        updateTask: (id, data) => dispatch(updateTask(id, data)),
        updateTasks: (data) => dispatch(updateTasks(data)),
        deleteTasks: (data) => dispatch(deleteTasks(data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withAuthentication(TodoPage));
