import React from 'react';
import ReactDOM from 'react-dom';
import EditRecipeStore from '../stores/EditRecipeStore';
import EditRecipeActions from '../actions/EditRecipeActions';

class EditRecipe extends React.Component {
    constructor(props) {
        super(props);
        this.state = EditRecipeStore.getState();
        this.state.recipeTitle = this.props.recipeTitle;
        this.onChange = this.onChange.bind(this);
        this.handleEdit.bind(this);
    }

    componentDidMount() {
        EditRecipeStore.listen(this.onChange);
    }

    componentWillUnmount() {
        EditRecipeStore.unlisten(this.onChange);
    }

    componentWillUpdate() {
        if(this.state.isEdited) {
            $('#editRecipeModal').modal('hide');
        }
    }

    onChange(state) {
        this.setState(state);
    }

    handleEdit(e) {
        e.preventDefault();

        let recipeId = e.currentTarget.getAttribute('data-recipe-id');
        var recipeTitle = this.state.recipeTitle.trim();

        if(!recipeTitle) {
            EditRecipeActions.invalidRecipe();
            ReactDOM.findDOMNode(this.refs.titleTextField).focus();
        }

        if(recipeTitle) {
            EditRecipeActions.editRecipe(recipeId, recipeTitle);
        }
    }

    render() {
        let button = <button type='submit' className='btn btn-primary' data-recipe-id={this.props.recipeId} onClick={(e) => this.handleEdit(e)}>Save</button>;

        return (
            <form onSubmit={this.handleEdit.bind(this)}>
                <div className={'form-group ' + this.state.recipeValidationState}>
                    <label className='control-label'>Recipe</label>
                    <input type='text' className='form-control' ref='titleTextField' value={this.state.recipeTitle}
                           onChange={EditRecipeActions.updateRecipe} autoFocus/>
                    <span className='help-block'>{this.state.helpBlock}</span>
                </div>
                {button}
            </form>
        );
    }
}

export default EditRecipe;
