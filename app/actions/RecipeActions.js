import alt from '../alt';

class RecipeActions {
    constructor() {
        this.generateActions(
            'getRecipeSuccess',
            'getRecipeFail',
            'updateRecipeTitle',
            'showModalSuccess',
            'hideModalSuccess'
        );
    }

    updateRecipeTitle(title) {
        this.actions.updateRecipeTitleSuccess(title);
    }

    showModal(params) {
        this.actions.showModalSuccess(params);
    }

    hideModal() {
        this.actions.hideModalSuccess();
    }

    getRecipe(title) {
        $.ajax({ url: '/api/recipes/' + title})
            .done(data => {
                this.actions.getRecipeSuccess(data);
            })
            .fail(jqXhr => {
                this.actions.getRecipeFail(jqXhr.responseJSON.message);
            });
    }
}

export default alt.createActions(RecipeActions);
