import React from 'react';
import ReactDOM from 'react-dom';
import AddRecipeStore from '../stores/AddRecipeStore';
import AddRecipeActions from '../actions/AddRecipeActions';

class AddRecipe extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.state.recipeTitle = '';
        this.state.helpBlock = '';
        this.state.modalFormValidationState = '';
        this.state.isAdded = false;
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        AddRecipeStore.listen(this.onChange);
    }

    componentWillUnmount() {
        AddRecipeStore.unlisten(this.onChange);
    }

    componentWillUpdate() {
        if(this.state.isAdded) {
            $('#addRecipeModal').modal('hide');
        }
    }

    onChange(state) {
        this.setState(state);
    }

    handleSubmit(e) {
        e.preventDefault();

        var recipeTitle = this.state.recipeTitle.trim();

        if(!recipeTitle) {
            AddRecipeActions.invalidRecipe();
            ReactDOM.findDOMNode(this.refs.titleTextField).focus();
        }

        if(recipeTitle) {
            AddRecipeActions.addRecipe(recipeTitle);
        }
    }

    render() {
        let button  = <button type='submit' className='btn btn-primary'>Add Recipe</button>;

        return (
            <form onSubmit={this.handleSubmit.bind(this)}>
                <div className={'form-group ' + this.state.modalFormValidationState}>
                    <label className='control-label'>Recipe</label>
                    <input type='text' className='form-control' ref='titleTextField' value={this.state.recipeTitle}
                           onChange={AddRecipeActions.updateRecipe} autoFocus/>
                    <span className='help-block'>{this.state.helpBlock}</span>
                </div>
                {button}
            </form>
        );
    }
}

export default AddRecipe;
