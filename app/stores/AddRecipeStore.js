import alt from '../alt';
import AddRecipeActions from '../actions/AddRecipeActions';
import RecipesActions from '../actions/RecipesActions';

class AddRecipeStore {
    constructor() {
        this.bindActions(AddRecipeActions);
        this.recipeTitle = '';
        this.helpBlock = '';
        this.recipeValidationState = '';
        this.isAdded = false;
    }

    onAddRecipeSuccess(successMessage) {
        this.recipeTitle = '';
        this.isAdded = true;
        RecipesActions.getAllRecipes();
    }

    onAddRecipeFail(errorMessage) {
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

export default alt.createStore(AddRecipeStore);
