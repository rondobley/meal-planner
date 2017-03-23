import React from 'react';
import HomeStore from '../stores/HomeStore';
import HomeActions from '../actions/HomeActions';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.state.email = '';
        this.state.password = '';
        this.state.helpBlock = '';
        this.state.modalFormValidationState = '';
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        HomeStore.listen(this.onChange);
    }

    componentWillUnmount() {
        HomeStore.unlisten(this.onChange);
    }

    onChange(state) {
        this.setState(state);
    }

    render() {
        let button  = <button type='submit' className='btn btn-primary'>Login</button>;
console.log('Home render', this.state);
        return (
            <form action="/" method="post">
              <div className={'form-group ' + this.state.formValidationState}>
                <label className='control-label'>Login</label>
                <input type='text' className='form-control' ref='emailInput' name="email" value={this.state.email}
                       onChange={HomeActions.updateEmailInput} autoFocus/>
                <span className='help-block'>{this.state.emailHelpBlock}</span>
                <input type='password' className='form-control' ref='passwordInput' name="password" value={this.state.password}
                       onChange={HomeActions.updatePasswordInput} />
                <span className='help-block'>{this.state.passwordHelpBlock}</span>
              </div>
                {button}
            </form>
        );
    }
}

export default Home;
