import alt from '../alt';
import AddDishActions from '../actions/AddDishActions';
import DishesActions from '../actions/DishesActions';

class AddDishStore {
    constructor() {
        this.bindActions(AddDishActions);
        this.dishName = '';
        this.helpBlock = '';
        this.modalFormValidationState = '';
        this.isAdded = false;
    }

    onAddDishSuccess(successMessage) {
        this.dishName = '';
        this.isAdded = true;
        DishesActions.getAllDishes();
    }

    onAddDishFail(errorMessage) {
        this.dishName = '';
        this.modalFormValidationState = 'has-error';
        this.helpBlock = errorMessage;
        this.isAdded = false;
    }

    onUpdateDishNameInput(e) {
        this.dishName = e.target.value;
        this.modalFormValidationState = '';
        this.helpBlock = '';
        this.isAdded = false;
    }

    onInvalidDishName() {
        this.dishName = '';
        this.modalFormValidationState = 'has-error';
        this.helpBlock = 'Please enter a dish name';
        this.isAdded = false;
    }
}

export default alt.createStore(AddDishStore);
