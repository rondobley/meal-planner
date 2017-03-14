import alt from '../alt';
import {assign} from 'underscore';

import DishActions from '../actions/DishActions';

class DishStore {
    constructor() {
        this.bindActions(DishActions);
        this.loaded = false;
        this.isEdited = false;
        this._id = null;
        this.name = 'Loading';
        this.tags = [];
        this.tagToAdd = '';
        this.showModal = false;
        this.modalFormValidationState = '';
        this.helpBlock = '';
    }

    onUpdateDishNameSuccess(name) {
        this.name = name;
    }

    onShowModalSuccess(params) {
        this.showModal = params.form;
    }

    onHideModalSuccess() {
        this.isEdited = false;
        this.showModal = false;
        this.modalFormValidationState = '';
        this.helpBlock = '';
    }

    onGetDishSuccess(data) {
        assign(this, data);
        this.loaded = true;
    }

    onGetDishFail(errorMessage) {
        this.name = 'Dish not found :(';
    }

    onEditDishSuccess(payload) {
        this.name = payload.name;
        this.tags = payload.tags;
        this.isEdited = true;
        payload.history.push('/dish/' + payload.name, this);
    }

    onEditDishFail(errorMessage) {
        this.modalFormValidationState = 'has-error';
        this.helpBlock = errorMessage;
    }
}

export default alt.createStore(DishStore);
