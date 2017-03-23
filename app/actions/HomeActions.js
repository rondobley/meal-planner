import alt from '../alt';

class HomeActions {
    constructor() {
        this.generateActions(
            'updateEmailInput',
            'invalidEmail',
            'updatePasswordInput',
            'invalidPassword'
        );
    }
}

export default alt.createActions(HomeActions);
