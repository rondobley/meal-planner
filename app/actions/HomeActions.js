import alt from '../alt';

class HomeActions {
    constructor() {
        this.generateActions(
            'updateEmailInput',
            'invalidEmail',
            'updatePasswordInput',
            'invalidPassword',
            'loginSuccess',
            'loginFailure'
        );
    }

    login(email, password) {
        $.ajax({
            type: 'POST',
            url: '/',
            data: { email: email, password: password }
        })
            .done((data) => {
                this.actions.loginSuccess(data);
            })
            .fail((jqXHR) => {
                this.actions.loginFail(jqXHR.responseJSON.message);
            });
    }
}

export default alt.createActions(HomeActions);
