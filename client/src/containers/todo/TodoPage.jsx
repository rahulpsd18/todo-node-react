import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { connect } from 'react-redux';
import { getTasks, addTask, updateTasks } from '../../actions';
import { TodoLane } from '../../components/TodoLane';
import { TodoForm } from '../../components/TodoForm';
import { ToastContainer, toast } from 'react-toastify';
import { withStyles } from '@material-ui/core/styles';
import { withAuthentication } from '../../withAuthentication';

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

    render() {
        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
                <TodoLane items={this.state.items} />
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
        getTasks: (token) => dispatch(getTasks(token)),
        addTask: (data, token) => dispatch(addTask(data, token)),
        updateTasks: (data, token) => dispatch(updateTasks(data, token)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withAuthentication(TodoPage));
