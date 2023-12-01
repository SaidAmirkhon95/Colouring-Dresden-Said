import React from 'react';

import './survey-modal.css';

interface SurveyModalProps {
    show: boolean;
    title: string;
    description: string;
    confirmButtonText?: string;
    confirmButtonClass?: string;
    /* cancelButtonClass?: string; */
    onConfirm: () => void;
    onCancel: () => void;
}

const SurveyModal: React.FunctionComponent<SurveyModalProps> = ({
    confirmButtonText = 'OK',
    confirmButtonClass = 'btn-primary',
    /* cancelButtonClass = '', */
    ...props
}) => {
    const modalShowClass = props.show ? 'modal-show': 'modal-hide';
    return (
        <div className={`modal ${modalShowClass}`} tabIndex={-1} role="dialog">
            <div className="modal-backdrop">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{props.title}</h5>
                            <button
                                type="button"
                                className="close"
                                aria-label="Close"
                                onClick={() => props.onCancel()}
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <p>{props.description}</p>
                            <div className="iframe-container">
                                <iframe className="responsive-iframe" src="https://www.soscisurvey.de/colouring_dd/"></iframe>
                                {/* <iframe className="responsive-iframe" src="https://www.soscisurvey.de/colouring_dd/?act=ngL3nRsOpa3LQ4SJCTppVMPd" height={400} width={600} frameBorder={0} allowFullScreen></iframe> */}
                            </div>
                        </div>

                        
                        <div className="modal-footer">
                            <button
                                type="button"
                                className={`btn btn-block ${confirmButtonClass}`}
                                onClick={() => props.onConfirm()}
                            >{confirmButtonText}</button>
{/*                             <button
                                type="button"
                                className={`btn btn-block ${cancelButtonClass}`}
                                onClick={() => props.onCancel()}
                            >Cancel</button> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SurveyModal;
