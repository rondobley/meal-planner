import React from 'react';

class EditRecipe extends React.Component {
    constructor(props) {
        super(props);
        this.handleTitleInputChange = this.handleTitleInputChange.bind(this);
    }

    handleTitleInputChange(e) {
        this.props.onChange(e.target.value);
    }

    render() {
        let button = <button type='submit' className='btn btn-primary' data-recipe-id={this.props.recipeId} onClick={this.props.handleEdit}>Save</button>;

        return (
            <form>
                <div className={'form-group ' + this.props.recipeValidationState}>
                    <label className='control-label'>Recipe</label>
                    <input type='text' className='form-control' ref='titleTextField' value={this.props.recipeTitle}
                           onChange={this.handleTitleInputChange} autoFocus/>
                    <span className='help-block'>{this.props.helpBlock}</span>
                </div>
                {button}
            </form>
        );
    }
}

export default EditRecipe;
