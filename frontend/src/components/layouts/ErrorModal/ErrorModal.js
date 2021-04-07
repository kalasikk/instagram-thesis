import React , {useState} from 'react';
import classes from './ErrorModal.module.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';


export const ErrorModal = ({error}) => {
    const [show, setShow] = useState(true);

    const handleClose = () => {
        setShow(false)
        window.location.href = "/login";
    };
    // const handleShow = () => setShow(true);

    return (
      <>
        {/* <Button variant="primary" onClick={handleShow}>
          Launch demo modal
        </Button> */}

        <Modal show={show} className={classes.errorModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>Error</Modal.Title>
          </Modal.Header>
          <Modal.Body>{error.code === 401
          ? 'You are not authorised, please Log In again'
          : 'Something went wrong'}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Log In Again
            </Button>
            {/* <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button> */}
          </Modal.Footer>
        </Modal>
      </>
    );
  }
