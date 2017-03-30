import React from 'react';
import { Link } from 'react-router';
import DishesStore from '../stores/DishesStore';
import DishesActions from '../actions/DishesActions';
import Modal from './Modal';


class Dishes extends React.Component {
    constructor(props) {
        super(props);
        this.state = DishesStore.getState();
        this.onChange = this.onChange.bind(this);
        this.handleShowModal.bind(this);
        this.handleSearchByTag = this.handleSearchByTag.bind(this);
    }

    componentDidMount() {
        DishesStore.listen(this.onChange);
        if(this.state.searchTerms) {
            DishesActions.searchByTag(this.state.searchTerms);
        } else {
            DishesActions.getAllDishes();
        }
    }

    componentWillUnmount() {
        DishesStore.unlisten(this.onChange);
    }

    onChange(state) {
        this.setState(state);
    }

    handleHideModal() {
        DishesActions.hideModal();
    }

    handleShowModal(e) {
        let form = e.currentTarget.getAttribute('data-form');
        let params = { form: form };
        DishesActions.showModal(params);
    }

    handleSearchByTag(e) {
        e.preventDefault();
        let tag = this.state.searchTerms;

        if(tag) {
            DishesActions.searchByTag(tag);
        } else {
            DishesActions.getAllDishes();
        }
    }

    render() {
        var dishNodes = this.state.dishes.map((dish) => {
            return (
                <Link to={'dish/' + dish.name} className="list-group-item" key={dish._id}>{dish.name}</Link>
            );
        });

        let modal = null;
        if(this.state.showModal) {
            switch(this.state.showModal) {
                case 'addDish':
                    modal = <Modal title="Add Dish" form="addDish" handleHideModal={this.handleHideModal} />;
                    break;
            }
        }

        return (
            <div className='container dishes-container'>
                <div className='row'>
                    <div className='col-sm-9 col-md-6 col-lg-8'>
                        <ol className="breadcrumb">
                            <li className="active"><Link to="/dishes">Dishes</Link></li>
                        </ol>
                    </div>
                    <div className='col-sm-2 col-md-4 col-lg-3'>
                        <div className="input-group">
                            <input type="text" className="form-control" placeholder="Tag" value={this.state.searchTerms}
                                   onChange={DishesActions.updateSearchTermsInput}/>
                            <span className="input-group-btn">
                                <button className="btn btn-default" type="button" onClick={(e) => this.handleSearchByTag(e)}>
                                    <span className='glyphicon glyphicon-search'></span></button>
                            </span>
                        </div>
                    </div>
                    <div className='col-sm-1 col-md-2 col-lg-1 text-right'>
                        <button type='button' className='btn btn-primary btn-xs btn-add-dish' data-form='addDish' onClick={(e) => this.handleShowModal(e)}>
                        Add Dish <span className='glyphicon glyphicon-plus'></span></button>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-sm-12'>
                        <div className="list-group">
                            {dishNodes}
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

export default Dishes;
