import alt from '../alt';
import HomeActions from '../actions/HomeActions';

class HomeStore {
    constructor() {
        this.bindActions(HomeActions);
        this.email = '';
        this.password = '';
        this.emailHelpBlock = '';
        this.passwordHelpBlock = '';
        this.formHelpBlock = '';
        this.formValidationState = '';
        this.isLoggedIn = false;
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
        this.password = e.target.value;
        this.formValidationState = '';
        this.passwordHelpBlock = '';
    }

    onInvalidPassword() {
        this.password = '';
        this.formValidationState = 'has-error';
        this.passwordHelpBlock = 'Please enter a password';
    }

    onLoginSuccess(data) {
        if(data.success != false) {
            this.isLoggedIn = true;
        } else {
            this.formHelpBlock = data.message;
            this.formValidationState = 'has-error';
        }
    }
}

export default alt.createStore(HomeStore);
