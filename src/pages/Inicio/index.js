import React from 'react';

import { Jumbotron, Button } from 'react-bootstrap';

export default function Inicio() {
    return (
        <div className="container">
            <Jumbotron>
                <h1>CRUD de Aluno!</h1>
                <p>
                    This is a simple hero unit, a simple jumbotron-style component for calling
                    extra attention to featured content or information.
            </p>
                <p>
                    <Button variant="primary">Learn more</Button>
                </p>
            </Jumbotron>
        </div>
    )
};