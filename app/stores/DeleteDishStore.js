import alt from '../alt';
import DeleteDishActions from '../actions/DeleteDishActions';

class DeleteDishStore {
    constructor() {
        this.bindActions(DeleteDishActions);
        this.name = '';
        this.helpBlock = '';
        this.modalFormValidationState = '';
        this.isDeleted = false;
    }

    onDeleteDishSuccess() {
        this.isDeleted = true;
    }

    onDeleteDishFail(errorMessage) {
        this.modalFormValidationState = 'has-error';
        this.helpBlock = errorMessage;
    }
}

export default alt.createStore(DeleteDishStore);
