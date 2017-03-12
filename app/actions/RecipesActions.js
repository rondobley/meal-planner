import alt from '../alt';

class RecipesActions {
    constructor() {
        this.generateActions(
            'getAllRecipesSuccess',
            'showModalSuccess',
            'hideModalSuccess',
            'updatesearchTermsInput',
            'searchByTagSuccess',
            'searchByTagFail'
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

    searchByTag(tags) {
        if(tags) {
            $.ajax({url: '/api/recipes/search/tag/' + tags})
                .done(data => {
                    if(data.length == 0) {
                        this.actions.searchByTagFail('No dishes found');
                    } else {
                        this.actions.searchByTagSuccess(data);
                    }
                })
                .fail(jqXhr => {
                    this.actions.searchByTagFail(jqXhr.responseJSON.message);
                });
        } else {
            this.actions.searchByTagFail('No Tags provided');
        }
    }
}

export default alt.createActions(RecipesActions);
