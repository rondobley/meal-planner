import alt from '../alt';

class AddDishActions {
    constructor() {
        this.generateActions(
            'addDishSuccess',
            'addDishFail',
            'updateDishNameField',
            'invalidDishName'
        );
    }

    addDish(dishName) {
        $.ajax({
            type: 'POST',
            url: '/api/dish',
            data: { dishName: dishName }
        })
            .done((data) => {
                this.actions.addDishSuccess(data.message);
            })
            .fail((jqXHR) => {
                this.actions.addDishFail(jqXHR.responseJSON.message);
            });
    }
}

export default alt.createActions(AddDishActions);
