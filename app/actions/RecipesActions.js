import alt from '../alt';

class RecipesActions {
    constructor() {
        this.generateActions(
            'getAllRecipesSuccess',
            'showModalSuccess',
            'hideModalSuccess'
        );
    }

    showModal(params) {
        this.actions.showModalSuccess(params);
    }

    hideModal() {
        this.actions.hideModalSuccess();
    }

    getAllRecipes() {
        $.ajax({ url: '/api/recipes' })
            .done(data => {
                this.actions.getAllRecipesSuccess(data);
            })
            .fail(jqXhr => {
                this.actions.getAllRecipesFail(jqXhr.responseJSON.message);
            });
    }
}

export default alt.createActions(RecipesActions);
