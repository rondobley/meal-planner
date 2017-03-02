import React from 'react';
import { Link } from 'react-router';
import RecipeStore from '../stores/RecipeStore';
import RecipeActions from '../actions/RecipeActions';
import Modal from './Modal';

class Recipe extends React.Component {
    constructor(props) {
        super(props);
        this.state = RecipeStore.getState();
        this.onChange = this.onChange.bind(this);
        this.handleShowModal.bind(this);
    }

    componentDidMount() {
        RecipeStore.listen(this.onChange);
        RecipeActions.getRecipe(this.props.params.title);
    }

    componentWillUnmount() {
        RecipeStore.unlisten(this.onChange);
    }

    onChange(state) {
        this.setState(state);
    }

    handleHideModal() {
        RecipeActions.hideModal();
    }

    handleShowModal(e) {
        let form = e.currentTarget.getAttribute('data-form');
        let recipeId = null;
        let recipeTitle = null;
        if(typeof e.currentTarget.getAttribute('data-recipe-id') != 'undefined') {
            recipeId = e.currentTarget.getAttribute('data-recipe-id');
        }
        if(typeof e.currentTarget.getAttribute('data-recipe-title') != 'undefined') {
            recipeTitle = e.currentTarget.getAttribute('data-recipe-title');
        }
        let params = {form: form, recipeId: recipeId, recipeTitle: recipeTitle};
        RecipeActions.showModal(params);
    }

    render() {
        let addTagButton = null;
        let editRecipeButton= null;
        let deleteRecipeButton = null;
        let modal = null;

        var tags = this.state.tags.map((tag) => {
            return (
                <li key={tag._tag}>{tag.tag}</li>
            );
        });

        if(this.state.loaded) {
            addTagButton = <button type='button' className='btn btn-primary btn-xs' data-form='addTagToRecipe' onClick={(e) => this.handleShowModal(e)}>
                    Add Tag <span className='glyphicon glyphicon-plus'></span></button>;

            editRecipeButton =<button type='button' className='btn btn-primary btn-xs' data-form='editRecipe' onClick={(e) => this.handleShowModal(e)}>
                Edit Recipe <span className='glyphicon glyphicon-pencil'></span></button>;

            deleteRecipeButton = <button type='button' className='btn btn-danger btn-xs' data-form='deleteRecipe' onClick={(e) => this.handleShowModal(e)}>
                Delete Recipe <span className='glyphicon glyphicon-trash'></span></button>;
        }

        if(this.state.showModal) {
            switch(this.state.showModal) {
                case 'editRecipe':
                    modal = <Modal title="Edit Recipe" form="editRecipe" recipeId={this.state._id}
                                   recipeTitle={this.state.title}  handleHideModal={this.handleHideModal} />;
                    break;
                case 'deleteRecipe':
                    modal = <Modal title="Delete Recipe" form="deleteRecipe" recipeId={this.state._id}
                                   recipeTitle={this.state.title} handleHideModal={this.handleHideModal} />;
                    break;
                case 'addTagToRecipe':
                    modal = <Modal title="Add Tag" form="addTagToRecipe" recipeId={this.state._id}
                                   recipeTitle={this.state.title} handleHideModal={this.handleHideModal} />;
                    break;
            }
        }

        return (
            <div className='container'>
                <div className='row'>
                    <div className='col-sm-12 recipe-container'>
                        <p><Link to="/recipes">Recipes</Link> -> Recipe</p>
                        <h1>{this.state.title}</h1>
                        <ul>
                            {tags}
                        </ul>
                        {addTagButton}{editRecipeButton}{deleteRecipeButton}
                    </div>
                </div>
                <div className='row'>
                    <div className='col-sm-12'>
                        {modal}
                    </div>
                </div>
            </div>
        );
    }
}

export default Recipe;
