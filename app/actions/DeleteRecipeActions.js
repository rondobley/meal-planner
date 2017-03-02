import alt from '../alt';

class DeleteRecipeActions {
    constructor() {
        this.generateActions(
            'deleteRecipeSuccess',
            'deleteRecipeFail'
        );
    }

    deleteRecipe(recipeId, recipeTitle) {
        $.ajax({
            type: 'DELETE',
            url: '/api/recipes',
            data: { recipeId: recipeId, recipeTitle: recipeTitle }
        })
            .done((data) => {
                this.actions.deleteRecipeSuccess(data.message);
            })
            .fail((jqXHR) => {
                this.actions.deleteRecipeFail(jqXHR.responseJSON.message);
            });
    }
}

export default alt.createActions(DeleteRecipeActions);
