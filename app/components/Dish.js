import React from 'react';
import { Link } from 'react-router';
import DishStore from '../stores/DishStore';
import DishActions from '../actions/DishActions';
import Modal from './Modal';

var s = require('underscore.string');

class Dish extends React.Component {
    constructor(props) {
        super(props);
        this.state = DishStore.getState();
        this.onChange = this.onChange.bind(this);
        this.handleShowModal.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.updateNameInput = this.updateNameInput.bind(this);
        this.updateReferenceInput = this.updateReferenceInput.bind(this);
        this.updateTagToAddInput = this.updateTagToAddInput.bind(this);
        this.deleteTagClick = this.deleteTagClick.bind(this);
    }

    componentDidMount() {
        DishStore.listen(this.onChange);
        DishActions.getDish(this.props.params.name);
    }

    componentWillUnmount() {
        DishStore.unlisten(this.onChange);
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
        DishActions.hideModal();
    }

    handleShowModal(e) {
        let form = e.currentTarget.getAttribute('data-form');
        let params = {form: form};
        DishActions.showModal(params);
    }

    handleEdit(e) {
        e.preventDefault();
        let dishId = e.currentTarget.getAttribute('data-dish-id');
        let dishName = this.state.name.trim();
        let dishReference = this.state.reference.trim();
        let dishTags = this.state.tags;
        if(dishName == '') {
            this.setState({ modalFormValidationState:'has-error', helpBlock: 'You must enter a dish name' });
        }

        if(dishName) {
            DishActions.editDish({ dishId: dishId, dishName: dishName, dishReference: dishReference, dishTags: dishTags, history: this.props.history });
        }
    }

    handleAddTag(e) {
        e.preventDefault();
        let dishId = e.currentTarget.getAttribute('data-dish-id');
        let dishName = this.state.name.trim();
        let tagToAdd = s(this.state.tagToAdd).toLowerCase().value();
        let dishTags = this.state.tags;

        if(dishTags.indexOf(tagToAdd) > -1) {
            this.setState({modalFormValidationState: 'has-error', helpBlock: 'Tag already exists'});
        } else if(tagToAdd == '') {
            this.setState({ modalFormValidationState:'has-error', helpBlock: 'You must enter a tag' });
        } else {
            dishTags.push(tagToAdd);
            DishActions.editDish({ dishId: dishId, dishName: dishName, dishTags: dishTags, history: this.props.history });
        }
    }

    handleDeleteTag(e) {
        e.preventDefault();
        let dishId = e.currentTarget.getAttribute('data-dish-id');
        let dishName = this.state.name.trim();
        let tagToDelete = this.state.tagToDelete;
        let dishTags = this.state.tags;
        dishTags.splice(dishTags.indexOf(tagToDelete), 1);

        DishActions.editDish({ dishId: dishId, dishName: dishName, dishTags: dishTags, history: this.props.history });
    }

    updateNameInput(name) {
        this.setState({ name: name });
    }

    updateReferenceInput(reference) {
        this.setState({ reference: reference });
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
        let editDishButton= null;
        let deleteDishButton = null;
        let modal = null;
        let tags = [];

        if(this.state.tags) {
            tags = this.state.tags.map((tag, index) => {
                let displayTag = s(tag).titleize().value();
                return (
                <span className="label label-info" key={index} data-form='deleteTagFromDish' data-tag-to-delete={tag} onClick={(e) => this.deleteTagClick(e)}>
                    {displayTag} <span className='glyphicon glyphicon-trash'></span></span>
                );
            });
        }

        if(this.state.loaded) {
            addTagButton = <button type='button'
                                   className='btn btn-primary btn-xs'
                                   data-form='addTagToDish' onClick={(e) => this.handleShowModal(e)}
                            >Add Tag <span className='glyphicon glyphicon-plus'></span></button>;

            editDishButton = <button type='button'
                                      className='btn btn-primary btn-xs'
                                      data-form='editDish'
                                      onClick={(e) => this.handleShowModal(e)}
                                >Edit Dish <span className='glyphicon glyphicon-pencil'></span></button>;

            deleteDishButton = <button type='button' className='btn btn-danger btn-xs' data-form='deleteDish' onClick={(e) => this.handleShowModal(e)}>
                Delete Dish <span className='glyphicon glyphicon-trash'></span></button>;
        }

        if(this.state.showModal) {
            switch(this.state.showModal) {
                case 'editDish':
                    modal = <Modal title="Edit Dish"
                                   form="editDish"
                                   handleHideModal={this.handleHideModal}
                                   dishId={this.state._id}
                                   dishName={this.state.name}
                                   dishReference={this.state.reference}
                                   modalFormValidationState={this.state.modalFormValidationState}
                                   helpBlock={this.state.helpBlock}
                                   handleEdit={(e) => this.handleEdit(e)}
                                   onNameInputChange={this.updateNameInput}
                                   onReferenceInputChange={this.updateReferenceInput}
                            />;
                    break;
                case 'deleteDish':
                    modal = <Modal title="Delete Dish" form="deleteDish" dishId={this.state._id}
                                   dishName={this.state.name} handleHideModal={this.handleHideModal} />;
                    break;
                case 'addTagToDish':
                modal = <Modal title="Add Tag"
                               form="addTagToDish"
                               handleHideModal={this.handleHideModal}
                               dishId={this.state._id}
                               tagToAdd={this.state.tagToAdd}
                               modalFormValidationState={this.state.modalFormValidationState}
                               helpBlock={this.state.helpBlock}
                               handleAddTag={(e) => this.handleAddTag(e)}
                               onChange={this.updateTagToAddInput}
                />;
                break;
                case 'deleteTagFromDish':
                    modal = <Modal title="Delete Tag"
                                   form="deleteTagFromDish"
                                   handleHideModal={this.handleHideModal}
                                   dishId={this.state._id}
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
                    <div className='col-sm-12 dishes-container'>
                        <ol className="breadcrumb">
                            <li><Link to="/dishes">Dishes</Link></li>
                            <li className="active">Dish</li>
                        </ol>
                        <h1>{this.state.name}</h1>
                        <p>Recipe: {this.state.reference}</p>
                        {tags}
                        <hr></hr>
                        {addTagButton}{editDishButton}{deleteDishButton}
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

export default Dish;
