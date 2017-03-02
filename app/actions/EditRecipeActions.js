import alt from '../alt';

class EditRecipeActions {
    constructor() {
        this.generateActions(
            'editRecipeSuccess',
            'editRecipeFail',
            'updateRecipe',
            'invalidRecipe'
        );
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

export default alt.createActions(EditRecipeActions);
