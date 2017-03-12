import React from 'react';
import DeleteRecipeStore from '../stores/DeleteRecipeStore';
import DeleteRecipeActions from '../actions/DeleteRecipeActions';

class DeleteRecipe extends React.Component {
    constructor(props) {
        super(props);
        this.state = DeleteRecipeStore.getState();
        this.onChange = this.onChange.bind(this);
        this.handleDelete.bind(this);
    }

    componentDidMount() {
        DeleteRecipeStore.listen(this.onChange);
    }

    componentWillUnmount() {
        DeleteRecipeStore.unlisten(this.onChange);
    }

    componentDidUpdate() {
        if(this.state.isDeleted) {
            window.location.href = "/recipes";
        }
    }

    onChange(state) {
        this.setState(state);
    }

    handleDelete(e) {
        e.preventDefault();
        let recipeId = e.currentTarget.getAttribute('data-recipe-id');
        let recipeTitle = e.currentTarget.getAttribute('data-recipe-title');
        DeleteRecipeActions.deleteRecipe(recipeId, recipeTitle);
    }

    render() {
        let button = <button type='submit' className='btn btn-danger' data-recipe-id={this.props.recipeId}
                             data-recipe-title={this.props.recipeTitle} onClick={(e) => this.handleDelete(e)}>Delete Recipe</button>;

        return (
            <form>
                <div className={'form-group ' + this.state.modalFormValidationState}>
                    <label className='control-label'>Delete {this.props.recipeTitle}?</label>
                    <span className='help-block'>{this.state.helpBlock}</span>
                </div>
                {button}
            </form>
        );
    }
}

export default DeleteRecipe;
