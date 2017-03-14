import alt from '../alt';

class DishesActions {
    constructor() {
        this.generateActions(
            'getAllDishesSuccess',
            'showModalSuccess',
            'hideModalSuccess',
            'updateSearchTermsInput',
            'searchByTagSuccess',
            'searchByTagFail'
        );
    }

    showModal(params) {
        this.actions.showModalSuccess(params);
    }

    hideModal() {
        this.actions.hideModalSuccess();
    }

    getAllDishes() {
        $.ajax({ url: '/api/dishes' })
            .done(data => {
                this.actions.getAllDishesSuccess(data);
            })
            .fail(jqXhr => {
                this.actions.getAllDishesFail(jqXhr.responseJSON.message);
            });
    }

    searchByTag(tags) {
        if(tags) {
            $.ajax({url: '/api/dishes/search/tag/' + tags})
                .done(data => {
                    if(data.length == 0) {
                        this.actions.searchByTagFail('No dishes found');
                    } else {
                        this.actions.searchByTagSuccess(data);
                    }
                })
                .fail(jqXhr => {
                    this.actions.searchByTagFail(jqXhr.responseJSON.message);
                });
        } else {
            this.actions.searchByTagFail('No Tags provided');
        }
    }
}

export default alt.createActions(DishesActions);
