import alt from '../alt';

class AddRecipeActions {
    constructor() {
        this.generateActions(
            'addRecipeSuccess',
            'addRecipeFail',
            'updateRecipe',
            'invalidRecipe'
        );
    }

    addRecipe(recipeTitle) {
        $.ajax({
            type: 'POST',
            url: '/api/recipes',
            data: { recipeTitle: recipeTitle }
        })
            .done((data) => {
                this.actions.addRecipeSuccess(data.message);
            })
            .fail((jqXHR) => {
                this.actions.addRecipeFail(jqXHR.responseJSON.message);
            });
    }
}

export default alt.createActions(AddRecipeActions);
