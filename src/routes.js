import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Inicio from './pages/Inicio'
import Aluno from './pages/Aluno'
import NaoEncontrado from './pages/NaoEncontrado';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Inicio}></Route>
                <Route path="/aluno" exact component={Aluno}></Route>
                <Route path="*" exact component={NaoEncontrado}></Route>
            </Switch>
        </BrowserRouter>
    )
}