import alt from '../alt';
import {assign} from 'underscore';

import RecipeActions from '../actions/RecipeActions';

class RecipeStore {
    constructor() {
        this.bindActions(RecipeActions);
        this.loaded = false;
        this._id = null;
        this.title = 'Loading';
        this.tags = [];
        this.showModal = false;
    }

    onUpdateRecipeTitleSuccess(title) {
        this.title = title;
    }

    onShowModalSuccess(params) {
        this.showModal = params.form;
    }

    onHideModalSuccess() {
        this.showModal = false;
    }

    onGetRecipeSuccess(data) {
        assign(this, data);
        this.loaded = true;
    }

    onGetRecipeFail(errorMessage) {
        this.title = 'Recipe not found :(';
    }
}

export default alt.createStore(RecipeStore);
