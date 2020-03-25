import React from 'react';

import { Jumbotron } from 'react-bootstrap';

export default function Inicio() {
    return (
        <div className="container">
            <Jumbotron className='pt-4'>
                <h1>CRUD Aluno</h1>
                <hr />
                <p>
                    Aplicação desenvolvida usando o PostgreSQL para o banco de dados, PHP Codeigniter para desenvolver a API e React JS para o desenvolvimento deste frontend.
                </p>
                <p>Para usar este sistema localmente siga os passos abaixo:</p>
                <ul>
                    <li><strong>Banco de dados</strong></li>
                    <ol>
                        <li>Baixe e instale o <a target="_blank"
                            rel="noopener noreferrer"
                            href="https://www.pgadmin.org/download/">
                            pgAdmin 4
                                </a> e o <a target="_blank"
                                rel="noopener noreferrer"
                                href="https://www.postgresql.org/download/">
                                PostgreSQL 10
                                </a>.
                            </li>
                        <li>Faça o download do banco de dados&nbsp;
                            <a target="_blank"
                                rel="noopener noreferrer"
                                href="https://drive.google.com/open?id=1MMrgfuXbyOzxehx7wRXVaJ0dZr4ZRjYX">
                                clicando aqui
                            </a>, ou caso já tenha o arquivo use-o.
                            </li>
                        <li>No pgAdmin crie um banco de dados com o nome "delta".</li>
                        <li>Abra o query tool no banco criado, abra o arquivo db_delta.sql e o execute.</li>
                    </ol>
                    <li><strong>Backend (API)</strong></li>
                    <ol>
                        <li>Instale um servidor apache/php no seu computador para poder executar o projeto.</li>
                        <li>Na pasta de instalação do apache, procure pelo arquivo php.ini e abra-o. Exemplo:</li>
                        <ul>
                            <li>Windows (XAMPP): C:\xampp\php\php.ini</li>
                            <li>Linux: /etc/php/7.2/apache2/php.ini</li>
                        </ul>
                        <li>Procure no arquivo por extension=pdo_pgsql, caso tenha um ";" na frente da linha remova-o. É necessário reiniciar o serviço apache, caso ele esteja em execução para a alteração ser concluída.</li>
                        <li>Faça o download do backend <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href="https://github.com/joao-rezende/backend_crud_aluno/archive/master.zip"
                        >
                            clicando aqui
                                </a>, <strong>caso já tenha a pasta backend pule para o passo 6 e ignore os passos 11 a 13</strong>.
                            </li>
                        <li>Extraia o arquivo que foi baixado e ele gerará uma pasta com nome “backend_crud_aluno-master”, renomeie para “backend”.</li>
                        <li>Cole a pasta backend na pasta de execução do servidor apache/php. Exemplo:</li>
                        <ul>
                            <li>Windows (XAMPP): C:\xampp\htdocs\</li>
                            <li>Linux: /var/www/html/</li>
                        </ul>
                        <li>Dê permissão total de acesso a pasta "uploads" que se encontra na raiz do projeto.</li>
                        <li>Abra o arquivo config.php (application/config/config.php).</li>
                        <li>Procure por base_url, caso a url esteja diferente de onde você adicionou o projeto, modifique com o caminho onde o projeto está.</li>
                        <li>Agora abra o arquivo database.php, também na pasta config.</li>
                        <li>Vá até o final do arquivo (database.php) e coloque as informações corretas para fazer a conexão com o seu banco de dados.</li>
                        <li>Baixe e instale o <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href="https://getcomposer.org/Composer-Setup.exe"
                        >
                            Composer
                                </a>.
                            </li>
                        <li>Ao final da instalação do composer, abra o terminal(Linux) ou CMD(Windows).</li>
                        <li>Navegue até a pasta do backend e rode o comando <code>composer install --dev</code>.</li>
                        <li>Inicie o servidor apache.</li>
                        <li>Para mais informações sobre a API, leia a <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href="https://documenter.getpostman.com/view/6763046/SzS5wnbW?version=latest"
                        >
                            documentação
                            </a>.</li>
                    </ol>
                    <li><strong>Frontend</strong></li>
                    <ol>
                        <li>
                            Baixe e instale o <a target="_blank"
                                rel="noopener noreferrer"
                                href="https://nodejs.org/en/download/">
                                Node.js
                                </a> e o <a target="_blank"
                                rel="noopener noreferrer"
                                href="https://classic.yarnpkg.com/pt-BR/docs/install">
                                Yarn
                                </a>.
                            </li>
                        <li>Faça o download do frontend <a target="_blank"
                            rel="noopener noreferrer"
                            href="https://github.com/joao-rezende/frontend_crud_aluno/archive/master.zip">
                            clicando aqui
                                </a>, <strong>caso tenha a pasta frontend use-a e desconsidere a etapa 3</strong>.
                            </li>
                        <li>Extrai o arquivo baixado e ele gerará uma pasta com o nome "frontend_crud_aluno-master", renomeie a pasta para "frontend".</li>
                        <li>Abra o arquivo api.js (/src/services/api.js).</li>
                        <li>Altere o valor do baseURL, coloque o mesmo valor que colocou no base_url do backend + /api.</li>
                        <li>Abra o terminal(Linux) ou CMD(Windows).</li>
                        <li>Navegue até a pasta do frontend e rode o comando <code>yarn install</code>.</li>
                        <li>Depois que terminar a instalação das dependências, rode <code>yarn start</code>. Aguarde até o projeto iniciar.</li>
                    </ol>
                </ul>
            </Jumbotron>
        </div >
    )
};