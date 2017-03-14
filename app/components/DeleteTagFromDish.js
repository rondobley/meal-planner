import React from 'react';

class DeleteTagFromDish extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let button = <button type='submit' className='btn btn-danger' data-dish-id={this.props.dishId}
                             data-tag-value={this.props.tagToDelete} onClick={this.props.handleDeleteTag}>Delete Tag</button>;

        return (
            <form>
                <div className={'form-group ' + this.props.modalFormValidationState}>
                    <label className='control-label'>Delete {this.props.tagToDelete}?</label>
                    <span className='help-block'>{this.props.helpBlock}</span>
                </div>
                {button}
            </form>
        );
    }
}

export default DeleteTagFromDish;
