import React from 'react';
import ReactDOM from 'react-dom';
import HomeStore from '../stores/HomeStore';
import HomeActions from '../actions/HomeActions';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = HomeStore.getState();
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        HomeStore.listen(this.onChange);
    }

    componentWillUnmount() {
        HomeStore.unlisten(this.onChange);
    }

    componentDidUpdate() {
        if(this.state.isLoggedIn) {
            window.location.href = "/dishes";
        }
    }

    onChange(state) {
        this.setState(state);
    }

    resetValidationState() {
        this.state.emailHelpBlock = '';
        this.state.passwordHelpBlock = '';
        this.state.formHelpBlock = '';
        this.state.formValidationState = '';
    }

    handleSubmit(e) {
        e.preventDefault();

        this.resetValidationState();

        var email = this.state.email.trim();
        var password = this.state.password.trim();

        if(!email) {
            HomeActions.invalidEmail();
            ReactDOM.findDOMNode(this.refs.emailInput).focus();
        } else if(!password) {
            HomeActions.invalidPassword();
            ReactDOM.findDOMNode(this.refs.passwordInput).focus();
        } else {
            HomeActions.login(email, password);
        }
    }

    render() {
        let button  = <button type='submit' className='btn btn-primary'>Login</button>;

        return (
            <div className='container'>
                <div className='row'>
                    <div className='col-md-3'></div>
                    <div className='col-sm-12 col-md-6'>
                        <form className='login-form' onSubmit={this.handleSubmit.bind(this)}>
                          <div className={'form-group ' + this.state.formValidationState}>
                            <label className='control-label'>Login</label>
                            <input type='text' className='form-control' ref='emailInput' name="email" value={this.state.email}
                                   onChange={HomeActions.updateEmailInput} autoFocus/>
                            <span className='help-block'>{this.state.emailHelpBlock}</span>
                            <input type='password' className='form-control' ref='passwordInput' name="password" value={this.state.password}
                                   onChange={HomeActions.updatePasswordInput} />
                            <span className='help-block'>{this.state.passwordHelpBlock}</span>
                              <span className='help-block'>{this.state.formHelpBlock}</span>
                          </div>
                            <div className="text-right">{button}</div>
                        </form>
                    </div>
                    <div className='col-md-3'></div>
                </div>
            </div>
        );
    }
}

export default Home;
