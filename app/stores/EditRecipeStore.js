import alt from '../alt';
import EditRecipeActions from '../actions/EditRecipeActions';
import RecipeActions from '../actions/RecipeActions';

class EditRecipeStore {
    constructor() {
        this.bindActions(EditRecipeActions);
        this.recipeTitle = '';
        this.helpBlock = '';
        this.recipeValidationState = '';
        this.isEdited = false;
    }

    onEditRecipeSuccess(doc) {
        this.recipeTitle = '';
        this.isEdited = true;
        RecipeActions.getRecipe(doc.title);
    }

    onEditRecipeFail(errorMessage) {
        this.recipeValidationState = 'has-error';
        this.helpBlock = errorMessage;
    }

    onUpdateRecipe(event) {
        this.recipeTitle = event.target.value;
        this.recipeValidationState = '';
        this.helpBlock = '';
    }

    onInvalidRecipe() {
        this.recipeTitle = '';
        this.recipeValidationState = 'has-error';
        this.helpBlock = 'Please enter a recipe.';
    }
}

export default alt.createStore(EditRecipeStore);
