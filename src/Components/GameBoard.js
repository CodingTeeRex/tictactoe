import { Container, Row, Col, Table } from 'react-bootstrap';
import { WinnerComponent } from './Winner';

export const GameBoard = ({ board, handleRestart, handleClick, turn, winner }) => {

    const Cell = ({ cellId }) => {
        return (
            <td className="center" onClick={() => handleClick(cellId)}>
                {board[cellId]}
            </td>
        );
    }
    
    return (
        <Container className="mt-5">
            <div className="d-flex flex-column align-items-center justify-content-center">
                <Row id="game-board">
                    <Row className="mx-0">
                        <Col>
                            <div className="d-flex justify-content-between align-items-center p-2">
                                <h4>{turn} turn</h4>
                                <div className="align-self-end">
                                    <button className="ms-3 btn btn-outline-secondary btn-sm" onClick={() => handleRestart()} >Restart</button>
                                </div>
                            </div>
                        </Col>      
                    </Row>
                    <Col>
                        <Table className="col-12 mt-2">
                            <tbody>
                                <tr>
                                    <Cell cellId={0} />
                                    <Cell cellId={1} />
                                    <Cell cellId={2} />
                                </tr>
                                <tr>
                                    <Cell cellId={3} />
                                    <Cell cellId={4} />
                                    <Cell cellId={5} />
                                </tr>
                                <tr>
                                    <Cell cellId={6} />
                                    <Cell cellId={7} />
                                    <Cell cellId={8} />
                                </tr>
                            </tbody>
                        </Table>
                    </Col>
                    <Row>
                        {<WinnerComponent winner={winner} />}
                    </Row>
                </Row>
            </div>
        </Container>
    );
    
}

