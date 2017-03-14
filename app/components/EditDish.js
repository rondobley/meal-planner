import React from 'react';

class EditDish extends React.Component {
    constructor(props) {
        super(props);
        this.handleNameInputChange = this.handleNameInputChange.bind(this);
    }

    handleNameInputChange(e) {
        this.props.onChange(e.target.value);
    }

    render() {
        let button = <button type='submit' className='btn btn-primary' data-dish-id={this.props.dishId} onClick={this.props.handleEdit}>Save</button>;

        return (
            <form>
                <div className={'form-group ' + this.props.modalFormValidationState}>
                    <label className='control-label'>Dish</label>
                    <input type='text' className='form-control' ref='nameInputField' value={this.props.dishName}
                           onChange={this.handleNameInputChange} autoFocus/>
                    <span className='help-block'>{this.props.helpBlock}</span>
                </div>
                {button}
            </form>
        );
    }
}

export default EditDish;
