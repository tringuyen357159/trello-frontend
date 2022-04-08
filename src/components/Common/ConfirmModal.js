import React from "react";
import { Modal, Button } from 'react-bootstrap'
import ReactHtmlParser from 'react-html-parser';

function ConfirmModal(props) {
    const { title, content, show, onAction } = props;
  
    return (
      <>
        <Modal show={show} onHide={() => onAction('close')}>
            <Modal.Header closeButton>
                <Modal.Title>{ReactHtmlParser(title)}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{ReactHtmlParser(content)}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => onAction('close')}>
                    Close
                </Button>
                <Button variant="primary" onClick={() => onAction('confirm')}>
                    Confirm
                </Button>
            </Modal.Footer>
        </Modal>
      </>
    );
  }
  
export default ConfirmModal;