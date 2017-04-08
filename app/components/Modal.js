import React from 'react';
import AddDish from './AddDish';
import EditDish from './EditDish';
import DeleteDish from './DeleteDish';
import AddTagToDish from './AddTagToDish';
import DeleteTagFromDish from './DeleteTagFromDish';


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
            case 'addDish':
                form = (<AddDish/>);
                break;
            case 'editDish':
                form = (<EditDish dishId={this.props.dishId}
                                    dishName={this.props.dishName}
                                    dishReference={this.props.dishReference}
                                    modalFormValidationState={this.props.modalFormValidationState}
                                    helpBlock={this.props.helpBlock}
                                    handleEdit={this.props.handleEdit}
                                    onNameInputChange={this.props.onNameInputChange}
                                    onReferenceInputChange={this.props.onReferenceInputChange}
                        />);
                break;
            case 'deleteDish':
                form = (<DeleteDish dishId={this.props.dishId} dishName={this.props.dishName} />);
                break;
            case 'addTagToDish':
                form = (<AddTagToDish dishId={this.props.dishId}
                                        tagToAdd={this.props.tagToAdd}
                                        modalFormValidationState={this.props.modalFormValidationState}
                                        helpBlock={this.props.helpBlock}
                                        handleAddTag={this.props.handleAddTag}
                                        onChange={this.props.onChange}
                        />);
                break;
            case 'deleteTagFromDish':
                form = (<DeleteTagFromDish dishId={this.props.dishId}
                                             tagToDelete={this.props.tagToDelete}
                                             modalFormValidationState={this.props.modalFormValidationState}
                                             helpBlock={this.props.helpBlock}
                                             handleDeleteTag={this.props.handleDeleteTag}
                        />);
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