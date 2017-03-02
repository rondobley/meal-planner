import React from 'react';
import { Link } from 'react-router';
import RecipesStore from '../stores/RecipesStore';
import RecipesActions from '../actions/RecipesActions';
import Modal from './Modal';


class Recipes extends React.Component {
    constructor(props) {
        super(props);
        this.state = RecipesStore.getState();
        this.onChange = this.onChange.bind(this);
        this.handleShowModal.bind(this);
    }

    componentDidMount() {
        RecipesStore.listen(this.onChange);
        RecipesActions.getAllRecipes();
    }

    componentWillUnmount() {
        RecipesStore.unlisten(this.onChange);
    }

    onChange(state) {
        this.setState(state);
    }

    handleHideModal() {
        RecipesActions.hideModal();
    }

    handleShowModal(e) {
        let form = e.currentTarget.getAttribute('data-form');
        let params = {form: form};
        RecipesActions.showModal(params);
    }

    render() {
        var recipeNodes = this.state.recipes.map((recipe) => {
            return (
                <li key={recipe._id}><Link to={'recipe/' + recipe.title}>{recipe.title}</Link></li>
            );
        });

        let modal = null;
        if(this.state.showModal) {
            switch(this.state.showModal) {
                case 'addRecipe':
                    modal = <Modal title="Add Recipe" form="addRecipe" handleHideModal={this.handleHideModal} />;
                    break;
            }
        }

        return (
            <div className='container'>
                <div className='row'>
                    <div className='col-sm-12'>
                        <p>Recipes</p>
                        <button type='button' className='btn btn-primary btn-xs' data-form='addRecipe' onClick={(e) => this.handleShowModal(e)}>
                        Add Recipe <span className='glyphicon glyphicon-plus'></span></button>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-sm-12'>
                        <ul className="list-unstyled">
                            {recipeNodes}
                        </ul>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-sm-12'>
                        {modal}
                    </div>
                </div>
            </div>
        );
    }
}

export default Recipes;
