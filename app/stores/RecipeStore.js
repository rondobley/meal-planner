import alt from '../alt';
import {assign} from 'underscore';

import RecipeActions from '../actions/RecipeActions';

class RecipeStore {
    constructor() {
        this.bindActions(RecipeActions);
        this.loaded = false;
        this.isEdited = false;
        this._id = null;
        this.title = 'Loading';
        this.tags = [];
        this.tagToAdd = '';
        this.showModal = false;
        this.modalFormValidationState = '';
        this.helpBlock = '';
    }

    onUpdateRecipeTitleSuccess(title) {
        this.title = title;
    }

    onShowModalSuccess(params) {
        this.showModal = params.form;
    }

    onHideModalSuccess() {
        this.showModal = false;
        this.isEdited = false;
    }

    onGetRecipeSuccess(data) {
        assign(this, data);
        this.loaded = true;
    }

    onGetRecipeFail(errorMessage) {
        this.title = 'Recipe not found :(';
    }

    onEditRecipeSuccess(payload) {
        this.title = payload.title;
        this.tags = payload.recipeTags;
        this.isEdited = true;
        payload.history.push('/recipe/' + payload.title, this);
    }

    onEditRecipeFail(errorMessage) {
        this.modalFormValidationState = 'has-error';
        this.helpBlock = errorMessage;
    }
}

export default alt.createStore(RecipeStore);
