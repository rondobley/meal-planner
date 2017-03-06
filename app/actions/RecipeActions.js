import alt from '../alt';

class RecipeActions {
    constructor() {
        this.generateActions(
            'getRecipeSuccess',
            'getRecipeFail',
            'editRecipeSuccess',
            'editRecipeFail',
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

    editRecipe(recipeId, recipeTitle) {
        $.ajax({
            type: 'PUT',
            url: '/api/recipes',
            data: { recipeId: recipeId, recipeTitle: recipeTitle }
        })
            .done((data) => {
                this.actions.editRecipeSuccess(data);
            })
            .fail((jqXHR) => {
                this.actions.editRecipeFail(jqXHR.responseJSON.message);
            });
    }
}

export default alt.createActions(RecipeActions);
