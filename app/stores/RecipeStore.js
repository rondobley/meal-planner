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
        this.showModal = false;
        this.recipeValidationState = '';
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

    onEditRecipeSuccess(doc) {
        this.isEdited = true;
        this.title = doc.title;
    }

    onEditRecipeFail(errorMessage) {
        this.recipeValidationState = 'has-error';
        this.helpBlock = errorMessage;
    }
}

export default alt.createStore(RecipeStore);
