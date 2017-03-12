import alt from '../alt';
import AddRecipeActions from '../actions/AddRecipeActions';
import RecipesActions from '../actions/RecipesActions';

class AddRecipeStore {
    constructor() {
        this.bindActions(AddRecipeActions);
        this.recipeTitle = '';
        this.helpBlock = '';
        this.modalFormValidationState = '';
        this.isAdded = false;
    }

    onAddRecipeSuccess(successMessage) {
        this.recipeTitle = '';
        this.isAdded = true;
        RecipesActions.getAllRecipes();
    }

    onAddRecipeFail(errorMessage) {
        this.recipeTitle = '';
        this.modalFormValidationState = 'has-error';
        this.helpBlock = errorMessage;
    }

    onUpdateRecipe(e) {
        this.recipeTitle = e.target.value;
        this.modalFormValidationState = '';
        this.helpBlock = '';
    }

    onInvalidRecipe() {
        this.recipeTitle = '';
        this.modalFormValidationState = 'has-error';
        this.helpBlock = 'Please enter a recipe.';
    }
}

export default alt.createStore(AddRecipeStore);
