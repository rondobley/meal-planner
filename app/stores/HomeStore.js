import alt from '../alt';
import HomeActions from '../actions/HomeActions';

class HomeStore {
    constructor() {
        this.bindActions(HomeActions);
        this.email = '';
        this.password = '';
        this.emailHelpBlock = '';
        this.passwordHelpBlock = '';
        this.formValidationState = '';
    }

    onUpdateEmailInput(e) {
        this.email = e.target.value;
        this.formValidationState = '';
        this.emailHelpBlock = '';
    }

    onInvalidEmail() {
        this.email = '';
        this.formValidationState = 'has-error';
        this.emailHelpBlock = 'Please enter an email address';
    }

    onUpdatePasswordInput(e) {
        console.log('Store update password input');
        this.password = e.target.value;
        this.formValidationState = '';
        this.passwordHelpBlock = '';
    }

    onInvalidPassword() {
        this.password = '';
        this.formValidationState = 'has-error';
        this.passwordHelpBlock = 'Please enter a password';
    }
}

export default alt.createStore(HomeStore);
