import alt from '../alt';

class DeleteDishActions {
    constructor() {
        this.generateActions(
            'deleteDishSuccess',
            'deleteDishFail'
        );
    }

    deleteDish(dishId, dishName) {
        $.ajax({
            type: 'DELETE',
            url: '/api/dish',
            data: { dishId: dishId, dishName: dishName }
        })
            .done((data) => {
                this.actions.deleteDishSuccess(data.message);
            })
            .fail((jqXHR) => {
                this.actions.deleteDishFail(jqXHR.responseJSON.message);
            });
    }
}

export default alt.createActions(DeleteDishActions);
