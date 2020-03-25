import React from 'react';
import { Link } from 'react-router-dom'
import './style.css';

export default function NaoEncontrado() {
    return (
        <div id="notfound">
            <div className="notfound">
                <div className="notfound-404">
                    <h1>Oops!</h1>
                </div>
                <h2>Erro 404 - Página não encontrada</h2>
                <p>A página que você está procurando pode ter sido removida, por ter sido renomeada ou está temporariamente indisponível.</p>
                <Link to="/"><span>Ir para página inicial</span></Link>
            </div>
        </div>
    );
}