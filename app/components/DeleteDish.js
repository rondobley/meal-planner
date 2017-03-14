import React from 'react';
import DeleteDishStore from '../stores/DeleteDishStore';
import DeleteDishActions from '../actions/DeleteDishActions';

class DeleteDish extends React.Component {
    constructor(props) {
        super(props);
        this.state = DeleteDishStore.getState();
        this.onChange = this.onChange.bind(this);
        this.handleDelete.bind(this);
    }

    componentDidMount() {
        DeleteDishStore.listen(this.onChange);
    }

    componentWillUnmount() {
        DeleteDishStore.unlisten(this.onChange);
    }

    componentDidUpdate() {
        if(this.state.isDeleted) {
            window.location.href = "/dishes";
        }
    }

    onChange(state) {
        this.setState(state);
    }

    handleDelete(e) {
        e.preventDefault();
        let dishId = e.currentTarget.getAttribute('data-dish-id');
        let dishName = e.currentTarget.getAttribute('data-dish-name');
        DeleteDishActions.deleteDish(dishId, dishName);
    }

    render() {
        let button = <button type='submit' className='btn btn-danger' data-dish-id={this.props.dishId}
                             data-dish-name={this.props.dishname} onClick={(e) => this.handleDelete(e)}>Delete Dish</button>;

        return (
            <form>
                <div className={'form-group ' + this.state.modalFormValidationState}>
                    <label className='control-label'>Delete {this.props.dishName}?</label>
                    <span className='help-block'>{this.state.helpBlock}</span>
                </div>
                {button}
            </form>
        );
    }
}

export default DeleteDish;
