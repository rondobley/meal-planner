import React from 'react';
import AddRecipe from './AddRecipe';
import EditRecipe from './EditRecipe';
import DeleteRecipe from './DeleteRecipe';


class Modal extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        $('#' + this.props.form + 'Modal').modal('show');
        $('#' + this.props.form + 'Modal').on('hidden.bs.modal', this.props.handleHideModal);
    }

    render(){
        let modalId = this.props.form + 'Modal';
        let form = null;

        switch(this.props.form) {
            case 'addRecipe':
                form = (<AddRecipe/>);
                break;
            case 'editRecipe':
                form = (<EditRecipe recipeId={this.props.recipeId} recipeTitle={this.props.recipeTitle}/>);
                break;
            case 'deleteRecipe':
                form = (<DeleteRecipe recipeId={this.props.recipeId} recipeTitle={this.props.recipeTitle} />);
                break;
            case 'addTagToRecipe':
                form = (<AddTagToRecipe recipeId={this.props.recipeId} recipeTitle={this.props.recipeTitle}/>);
                break;
        }

        return (
            <div className="modal fade" id={modalId}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            <h4 className="modal-title">{this.props.title}</h4>
                        </div>
                        <div className="modal-body">
                            {form}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Modal;