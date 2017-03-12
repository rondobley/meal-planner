import alt from '../alt';
import DeleteRecipeActions from '../actions/DeleteRecipeActions';

class DeleteRecipeStore {
    constructor() {
        this.bindActions(DeleteRecipeActions);
        this.title = '';
        this.helpBlock = '';
        this.modalFormValidationState = '';
        this.isDeleted = false;
    }

    onDeleteRecipeSuccess() {
        this.isDeleted = true;
    }

    onDeleteRecipeFail(errorMessage) {
        this.modalFormValidationState = 'has-error';
        this.helpBlock = errorMessage;
    }
}

export default alt.createStore(DeleteRecipeStore);
