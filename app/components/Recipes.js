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
        this.handleSearchByTag = this.handleSearchByTag.bind(this);
    }

    componentDidMount() {
        RecipesStore.listen(this.onChange);
        if(this.state.searchTerms) {
            RecipesActions.searchByTag(this.state.searchTerms);
        } else {
            RecipesActions.getAllRecipes();
        }
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

    handleSearchByTag(e) {
        e.preventDefault();
        let tag = this.state.searchTerms;
        RecipesActions.searchByTag(tag);
    }

    render() {
        var recipeNodes = this.state.recipes.map((recipe) => {
            return (
                <Link to={'recipe/' + recipe.title} className="list-group-item" key={recipe._id}>{recipe.title}</Link>
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
                    <div className='col-sm-9'>
                        <ol className="breadcrumb">
                            <li className="active"><Link to="/recipes">Recipes</Link></li>
                        </ol>
                    </div>
                    <div className='col-sm-2'>
                        <div className="input-group">
                            <input type="text" className="form-control" placeholder="Tag" value={this.state.searchTerms}
                                   onChange={RecipesActions.updatesearchTermsInput}/>
                            <span className="input-group-btn">
                                <button className="btn btn-default" type="button" onClick={(e) => this.handleSearchByTag(e)}>
                                    <span className='glyphicon glyphicon-search'></span></button>
                            </span>
                        </div>
                    </div>
                    <div className='col-sm-1'>
                        <button type='button' className='btn btn-primary btn-xs' data-form='addRecipe' onClick={(e) => this.handleShowModal(e)}>
                        Add Recipe <span className='glyphicon glyphicon-plus'></span></button>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-sm-12'>
                        <div className="list-group">
                            {recipeNodes}
                        </div>
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
