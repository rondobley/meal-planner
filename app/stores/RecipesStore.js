import alt from '../alt';
import RecipesActions from '../actions/RecipesActions';

class RecipesStore {
    constructor() {
        this.bindActions(RecipesActions);
        this.recipes = [];
        this.showModal = false;
    }

    onShowModalSuccess(params) {
        this.showModal = params.form;
    }

    onHideModalSuccess() {
        this.showModal = false;
    }

    onGetAllRecipesSuccess(data) {
        this.recipes = data;
    }

    onGetAllRecipesFail(errorMessage) {
        toastr.error(errorMessage);
    }
}

export default alt.createStore(RecipesStore);
