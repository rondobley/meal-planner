import alt from '../alt';
import {assign} from 'underscore';

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

    editRecipe(payload) {
        $.ajax({
            type: 'PUT',
            url: '/api/recipes',
            data: { recipeId: payload.recipeId, recipeTitle: payload.recipeTitle }
        })
            .done((data) => {
                assign(payload, data);
                this.actions.editRecipeSuccess(payload);
            })
            .fail((jqXHR) => {
                this.actions.editRecipeFail(jqXHR.responseJSON.message);
            });
    }
}

export default alt.createActions(RecipeActions);
