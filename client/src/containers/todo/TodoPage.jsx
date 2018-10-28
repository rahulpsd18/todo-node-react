import React from 'react';
import { withStyles } from '@material-ui/core';
import { DragDropContext } from 'react-beautiful-dnd';
import { connect } from 'react-redux';
import { getTasks, updateTasks } from '../../actions';
import { TodoLane } from '../../components/TodoLane';
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
        items: getItems(4),
    };


    componentWillReceiveProps(props) {
        this.state = {
            items: props.tasks,
        };
    }

    componentWillMount() {
        this.props.getTasks(this.props.token);
    }

    onDragEnd = (result) => {
        if (!result.destination) {
            return;
        }

        const items = reorder(
            this.state.items,
            result.source.index,
            result.destination.index
        );
        console.log(this.props.token);
        this.props.updateTasks(items, this.props.token);

        this.setState({
            items,
        });
    }

    render() {
        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
                <TodoLane items={this.state.items} />
            </DragDropContext>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.loginReducer.user,
        token: state.loginReducer.token,
        tasks: state.tasksReducer.tasks,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getTasks: (token) => dispatch(getTasks(token)),
        updateTasks: (data, token) => dispatch(updateTasks(data, token)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withAuthentication(TodoPage));

// export default connect(mapStateToProps, mapDispatchToProps)(TodoPage);


const getItems = count =>
    Array.from({ length: count }, (v, k) => k).map(k => ({
        _id: `item-${k}`,
        createdAt: new Date(),
        title: `My task to be done ${k}`,
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'
    }));