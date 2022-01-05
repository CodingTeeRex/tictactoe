import React from 'react'
import { Modal, Button, Form, FormGroup } from 'react-bootstrap';

export const SelectGamePiece = (props) => {
    return (
        <Modal show={props.show} onHide={props.handleClose} variant="primary" centered size="md" backdrop="static">
            <Modal.Header>
                <Modal.Title>
                    Select Symbol for Player 1
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={(e) => {
                    props.handleSubmit(e);
                }}>
                    <div className="radio-select-game-piece">
                        <FormGroup className="form-check">
                            <input className="form-contro-sm" type="radio" id="radio-pikachu" name="radioGamePiece" value="pikachu" checked onChange={() => {}} />
                            <label htmlFor="radio-pikachu"><img src="./assets/images/pikachu.png" /></label>
                        </FormGroup>
                        <FormGroup className="form-check">
                            <input className="form-control-md" type="radio" id="radio-snorlax" name="radioGamePiece" value="snorlax" />
                            <label htmlFor="radio-snorlax"><img src="./assets/images/snorlax.png" /></label>
                        </FormGroup>
                        <Button type="submit" color="primary" className="ms-auto">Select</Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    )
}
