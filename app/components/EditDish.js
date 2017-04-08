import React from 'react';

class EditDish extends React.Component {
    constructor(props) {
        super(props);
        this.handleNameInputChange = this.handleNameInputChange.bind(this);
        this.handleReferenceInputChange = this.handleReferenceInputChange.bind(this);
    }

    handleNameInputChange(e) {
        this.props.onNameInputChange(e.target.value);
    }

    handleReferenceInputChange(e) {
        this.props.onReferenceInputChange(e.target.value);
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
                    <label className='control-label'>Recipe</label>
                    <input type='text' className='form-control' ref='referenceInputField' value={this.props.dishReference}
                           onChange={this.handleReferenceInputChange} />
                </div>
                {button}
            </form>
        );
    }
}

export default EditDish;
