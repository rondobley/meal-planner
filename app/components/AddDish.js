import React from 'react';
import ReactDOM from 'react-dom';
import AddDishStore from '../stores/AddDishStore';
import AddDishActions from '../actions/AddDishActions';

class AddDish extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.state.dishName = '';
        this.state.helpBlock = '';
        this.state.modalFormValidationState = '';
        this.state.isAdded = false;
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        AddDishStore.listen(this.onChange);
    }

    componentWillUnmount() {
        AddDishStore.unlisten(this.onChange);
    }

    componentWillUpdate() {
        if(this.state.isAdded) {
            $('#addDishModal').modal('hide');
        }
    }

    onChange(state) {
        this.setState(state);
    }

    handleSubmit(e) {
        e.preventDefault();

        var dishName = this.state.dishName.trim();

        if(!dishName) {
            AddDishActions.invalidDishName();
            ReactDOM.findDOMNode(this.refs.dishNameField).focus();
        } else {
            AddDishActions.addDish(dishName);
        }
    }

    render() {
        let button  = <button type='submit' className='btn btn-primary'>Add Dish</button>;

        return (
            <form onSubmit={this.handleSubmit.bind(this)}>
                <div className={'form-group ' + this.state.modalFormValidationState}>
                    <label className='control-label'>Dish Name</label>
                    <input type='text' className='form-control' ref='dishNameField' value={this.state.dishName}
                           onChange={AddDishActions.updateDishNameField} autoFocus/>
                    <span className='help-block'>{this.state.helpBlock}</span>
                </div>
                {button}
            </form>
        );
    }
}

export default AddDish;
