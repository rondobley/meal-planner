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
        this.handleEdit = this.handleEdit.bind(this);
        this.updateTitleInput = this.updateTitleInput.bind(this);
        this.updateTagToAddInput = this.updateTagToAddInput.bind(this);
        this.deleteTagClick = this.deleteTagClick.bind(this);
    }

    componentDidMount() {
        RecipeStore.listen(this.onChange);
        RecipeActions.getRecipe(this.props.params.title);
    }

    componentWillUnmount() {
        RecipeStore.unlisten(this.onChange);
    }

    componentDidUpdate() {
        if(this.state.isEdited) {
            $('.modal').modal('hide');
        }
    }

    onChange(state) {
        this.setState(state);
    }

    handleHideModal() {
        RecipeActions.hideModal();
    }

    handleShowModal(e) {
        let form = e.currentTarget.getAttribute('data-form');
        let params = {form: form};
        RecipeActions.showModal(params);
    }

    handleEdit(e) {
        e.preventDefault();
        let recipeId = e.currentTarget.getAttribute('data-recipe-id');
        let recipeTitle = this.state.title.trim();
        let recipeTags = this.state.tags;

        if(recipeTitle == '') {
            this.setState({ modalFormValidationState:'has-error', helpBlock: 'You must enter a recipe.' });
        }

        if(recipeTitle) {
            RecipeActions.editRecipe({ recipeId: recipeId, recipeTitle: recipeTitle, recipeTags: recipeTags, history: this.props.history });
        }
    }

    handleAddTag(e) {
        e.preventDefault();
        let recipeId = e.currentTarget.getAttribute('data-recipe-id');
        let recipeTitle = this.state.title.trim();
        let tagToAdd = this.state.tagToAdd.trim();
        let recipeTags = this.state.tags;

        if(recipeTags.indexOf(tagToAdd) > -1) {
            this.setState({modalFormValidationState: 'has-error', helpBlock: 'Tag already exists.'});
        } else if(tagToAdd == '') {
            this.setState({ modalFormValidationState:'has-error', helpBlock: 'You must enter a tag.' });
        } else {
            recipeTags.push(tagToAdd);
            RecipeActions.editRecipe({ recipeId: recipeId, recipeTitle: recipeTitle, recipeTags: recipeTags, history: this.props.history });
        }
    }

    handleDeleteTag(e) {
        e.preventDefault();
        let recipeId = e.currentTarget.getAttribute('data-recipe-id');
        let recipeTitle = this.state.title.trim();
        let tagToDelete = this.state.tagToDelete;
        let recipeTags = this.state.tags;
        recipeTags.splice(recipeTags.indexOf(tagToDelete), 1);

        RecipeActions.editRecipe({ recipeId: recipeId, recipeTitle: recipeTitle, recipeTags: recipeTags, history: this.props.history });
    }

    updateTitleInput(title) {
        this.setState({ title: title });
    }

    updateTagToAddInput(tag) {
        this.setState({ tagToAdd: tag });
    }

    deleteTagClick(e) {
        e.preventDefault();
        let tagToDelete = e.currentTarget.getAttribute('data-tag-to-delete');
        this.setState({tagToDelete: tagToDelete});
        this.handleShowModal(e);
    }

    render() {
        let addTagButton = null;
        let editRecipeButton= null;
        let deleteRecipeButton = null;
        let modal = null;
        let tags = [];

        if(this.state.tags) {
            tags = this.state.tags.map((tag, index) => {
                return (
                <span className="label label-info" key={index} data-form='deleteTagFromRecipe' data-tag-to-delete={tag} onClick={(e) => this.deleteTagClick(e)}>
                    {tag} <span className='glyphicon glyphicon-trash'></span></span>
                );
            });
        }

        if(this.state.loaded) {
            addTagButton = <button type='button'
                                   className='btn btn-primary btn-xs'
                                   data-form='addTagToRecipe' onClick={(e) => this.handleShowModal(e)}
                            >Add Tag <span className='glyphicon glyphicon-plus'></span></button>;

            editRecipeButton = <button type='button'
                                      className='btn btn-primary btn-xs'
                                      data-form='editRecipe'
                                      onClick={(e) => this.handleShowModal(e)}
                                >Edit Recipe <span className='glyphicon glyphicon-pencil'></span></button>;

            deleteRecipeButton = <button type='button' className='btn btn-danger btn-xs' data-form='deleteRecipe' onClick={(e) => this.handleShowModal(e)}>
                Delete Recipe <span className='glyphicon glyphicon-trash'></span></button>;
        }

        if(this.state.showModal) {
            switch(this.state.showModal) {
                case 'editRecipe':
                    modal = <Modal title="Edit Recipe"
                                   form="editRecipe"
                                   handleHideModal={this.handleHideModal}
                                   recipeId={this.state._id}
                                   recipeTitle={this.state.title}
                                   modalFormValidationState={this.state.modalFormValidationState}
                                   helpBlock={this.state.helpBlock}
                                   handleEdit={(e) => this.handleEdit(e)}
                                   onChange={this.updateTitleInput}
                            />;
                    break;
                case 'deleteRecipe':
                    modal = <Modal title="Delete Recipe" form="deleteRecipe" recipeId={this.state._id}
                                   recipeTitle={this.state.title} handleHideModal={this.handleHideModal} />;
                    break;
                case 'addTagToRecipe':
                modal = <Modal title="Add Tag"
                               form="addTagToRecipe"
                               handleHideModal={this.handleHideModal}
                               recipeId={this.state._id}
                               tagToAdd={this.state.tagToAdd}
                               modalFormValidationState={this.state.modalFormValidationState}
                               helpBlock={this.state.helpBlock}
                               handleAddTag={(e) => this.handleAddTag(e)}
                               onChange={this.updateTagToAddInput}
                />;
                break;
                case 'deleteTagFromRecipe':
                    modal = <Modal title="Delete Tag"
                                   form="deleteTagFromRecipe"
                                   handleHideModal={this.handleHideModal}
                                   recipeId={this.state._id}
                                   tagToDelete={this.state.tagToDelete}
                                   modalFormValidationState={this.state.modalFormValidationState}
                                   helpBlock={this.state.helpBlock}
                                   handleDeleteTag={(e) => this.handleDeleteTag(e)}
                    />;
                    break;
            }
        }

        return (
            <div className='container'>
                <div className='row'>
                    <div className='col-sm-12 recipe-container'>
                        <ol className="breadcrumb">
                            <li><Link to="/recipes">Recipes</Link></li>
                            <li className="active">Recipe</li>
                        </ol>
                        <h1>{this.state.title}</h1>
                        {tags}
                        <hr></hr>
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
