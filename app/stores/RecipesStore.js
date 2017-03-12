import alt from '../alt';
import RecipesActions from '../actions/RecipesActions';

class RecipesStore {
    constructor() {
        this.bindActions(RecipesActions);
        this.recipes = [];
        this.searchTerms = '';
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

    onSearchByTagSuccess(data) {
        this.recipes = data;
    }

    onSearchByTagFail(errorMessage) {
        toastr.error(errorMessage);
    }

    onUpdatesearchTermsInput(e) {
        this.searchTerms = e.target.value;
    }
}

export default alt.createStore(RecipesStore);
