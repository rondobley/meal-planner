import alt from '../alt';
import {assign} from 'underscore';

class DishActions {
    constructor() {
        this.generateActions(
            'getDishSuccess',
            'getDishFail',
            'editDishSuccess',
            'editDishFail',
            'updateDishName',
            'updateDishReference',
            'showModalSuccess',
            'hideModalSuccess'
        );
    }

    updateDishName(name) {
        this.actions.updateDishNameSuccess(name);
    }

    updateDishReference(reference) {
        this.actions.updateDishReferenceSuccess(reference);
    }

    showModal(params) {
        this.actions.showModalSuccess(params);
    }

    hideModal() {
        this.actions.hideModalSuccess();
    }

    getDish(name) {
        $.ajax({ url: '/api/dish/' + name})
            .done(data => {
                this.actions.getDishSuccess(data);
            })
            .fail(jqXhr => {
                this.actions.getDishFail(jqXhr.responseJSON.message);
            });
    }

    editDish(payload) {
        $.ajax({
            type: 'PUT',
            url: '/api/dish',
            data: { dishId: payload.dishId, dishName: payload.dishName, dishReference: payload.dishReference, 'dishTags[]': payload.dishTags }
        })
            .done((data) => {
                assign(payload, data);
                this.actions.editDishSuccess(payload);
            })
            .fail((jqXHR) => {
                this.actions.editDishFail(jqXHR.responseJSON.message);
            });
    }
}

export default alt.createActions(DishActions);
