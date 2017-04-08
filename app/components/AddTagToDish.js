import React from 'react';

class AddTagToDish extends React.Component {
    constructor(props) {
        super(props);
        this.handleTagInputChange = this.handleTagInputChange.bind(this);
    }

    componentDidMount() {
        $('#addTagToDishModal').on('shown.bs.modal', function() {
            $(".form-group input").focus();
        });
    }

    handleTagInputChange(e) {
        this.props.onChange(e.target.value);
    }

    render() {
        let button = <button type='submit' className='btn btn-primary' data-dish-id={this.props.dishId} onClick={this.props.handleAddTag}>Save</button>;

        return (
            <form>
                <div className={'form-group ' + this.props.modalFormValidationState}>
                    <label className='control-label'>Tag</label>
                    <input type='text' className='form-control' ref='tagInput' name='tagToAdd' value={this.props.tagToAdd}
                           onChange={this.handleTagInputChange} autoFocus/>
                    <span className='help-block'>{this.props.helpBlock}</span>
                </div>
                {button}
            </form>
        );
    }
}

export default AddTagToDish;
