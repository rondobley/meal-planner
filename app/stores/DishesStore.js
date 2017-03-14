import alt from '../alt';
import DishesActions from '../actions/DishesActions';

class DishesStore {
    constructor() {
        this.bindActions(DishesActions);
        this.dishes = [];
        this.searchTerms = '';
        this.showModal = false;
    }

    onShowModalSuccess(params) {
        this.showModal = params.form;
    }

    onHideModalSuccess() {
        this.showModal = false;
    }

    onGetAllDishesSuccess(data) {
        this.dishes = data;
    }

    onGetAllDishesFail(errorMessage) {
        toastr.error(errorMessage);
    }

    onSearchByTagSuccess(data) {
        this.dishes = data;
    }

    onSearchByTagFail(errorMessage) {
        toastr.error(errorMessage);
    }

    onUpdateSearchTermsInput(e) {
        this.searchTerms = e.target.value;
    }
}

export default alt.createStore(DishesStore);
