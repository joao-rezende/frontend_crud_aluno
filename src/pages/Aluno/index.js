import React, { useEffect, useState, useMemo } from 'react';
import api from '../../services/api';
import FormularioAluno from '../../components/formularioAluno';
import { Card, Button, Row, Form, FormControl, Col, OverlayTrigger, Tooltip, InputGroup, Modal, Toast } from 'react-bootstrap';
import './style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrashAlt, faPlusCircle, faSearch, faCheck } from "@fortawesome/free-solid-svg-icons";
import semImagem from '../../assets/sem-imagem-avatar.png';

export default function Aluno() {
    const [alunos, setAlunos] = useState([]);
    const [showExcluir, setShowExcluir] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [tituloModalForm, setTituloModalForm] = useState('');
    const [alunoExclusao, setAlunoExclusao] = useState('');
    const [idAlunoExclusao, setIdAlunoExclusao] = useState('');
    const [alunoEdicao, setAlunoEdicao] = useState({});
    const [thumbnail, setThumbnail] = useState(null);
    const [preview, setPreview] = useState(null);
    const [showToast, setShowToast] = useState(false);
    const [msgToast, setMsgToast] = useState('');
    const [buscar, setBuscar] = useState('');

    useMemo(() => {
        setPreview(thumbnail ? URL.createObjectURL(thumbnail) : null);
    }, [thumbnail]);

    useEffect(() => {
        carregarAlunos();
    }, []);

    function carregarAlunos(strBuscar = "") {
        api.get('/alunos', {
            params: { buscar: strBuscar }
        })
            .then(function (response) {
                setAlunos(response.data);
            }).catch(function (error) {
                console.error(error.response.status + " - " + error.response.data);
            });
    }

    function excluirAluno() {
        api.delete('/aluno/' + idAlunoExclusao)
            .then(function (response) {
                concluirOperacao(response.data)
            }).catch(function (error) {
                console.error(error.response.status + " - " + error.response.data);
            }).then(function () {
                setIdAlunoExclusao('');
                setShowExcluir(false);
            });
    }

    function formatarCep(e) {
        var cep = e.toString();
        if (cep !== "" && cep.length === 8) {
            return cep.substring(0, 5) + "-" + cep.substring(5, 8);
        }
        return cep;
    }

    function confimarExclusao(e) {
        var datasets = e.target.dataset;
        setAlunoExclusao(datasets.nome);
        setIdAlunoExclusao(datasets.id);
        setShowExcluir(true);
    }

    function limparIdAlunoExclusao() {
        setIdAlunoExclusao('');
        setShowExcluir(false);
    }

    function abrirModalForm(aluno, titulo) {
        setAlunoEdicao(aluno);
        setPreview(aluno.imagem);
        setTituloModalForm(titulo)
        setShowForm(true);
    }

    function buscarAlunos(e) {
        e.preventDefault();
        carregarAlunos(buscar);
    }

    function toggleShowToast() { setShowToast(!showToast); }

    function concluirOperacao(mensagem) {
        carregarAlunos();
        setMsgToast(mensagem);
        setShowToast(true);
        setShowForm(false);
    }

    return (
        <div className="container"
            style={{
                position: 'relative',
                minHeight: '200px',
            }}>
            <div className={showToast ? "container-toast" : "container-toast hidden"} >
                <Toast show={showToast}
                    className="success"
                    onClose={toggleShowToast}
                    delay={4000}
                    autohide>
                    <Toast.Header>
                        <FontAwesomeIcon icon={faCheck} />
                        <strong className="ml-1 mr-auto">Sucesso</strong>
                    </Toast.Header>
                    <Toast.Body>{msgToast}</Toast.Body>
                </Toast>
            </div>
            <Row>
                <Col>
                    <h2 className="my-0">
                        <span className="mr-2">
                            <OverlayTrigger
                                placement="bottom"
                                overlay={
                                    <Tooltip id="tooltip-incluir">
                                        Incluir aluno
                                    </Tooltip>
                                }>
                                <span className="link-add-aluno text-info" onClick={() => { abrirModalForm({}, "Incluir") }}>
                                    <FontAwesomeIcon icon={faPlusCircle} />
                                </span>
                            </OverlayTrigger>
                        </span>
                        Alunos
                    </h2>
                </Col>
                <Col id="buscar" className="buscar">
                    <Form inline onSubmit={buscarAlunos}>
                        <InputGroup>
                            <FormControl type="text"
                                onChange={e => setBuscar(e.target.value)}
                                placeholder="Buscar aluno" />
                            <InputGroup.Append>
                                <Button variant="outline-secondary"
                                    onClick={buscarAlunos}>
                                    <FontAwesomeIcon icon={faSearch} />
                                </Button>
                            </InputGroup.Append>
                        </InputGroup>
                    </Form>
                </Col>
            </Row>
            <hr />
            <Row className="card-alunos">
                {alunos.map(aluno => (
                    <Col key={aluno.id_aluno}>
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" className="imagem-card"
                                src={aluno.imagem ? aluno.imagem : semImagem}
                                alt={"Imagem " + aluno.nome} />
                            <Card.Body>
                                <Card.Title>{aluno.nome}</Card.Title>
                                <Card.Text className="endereco">
                                    {aluno.logradouro}, {aluno.numero}{aluno.complemento !== "" ? (", " + aluno.complemento) : ""} - {aluno.bairro}
                                </Card.Text>
                                <Card.Text className="endereco">{aluno.cidade} / {aluno.estado}</Card.Text>
                                <Card.Text className="endereco">
                                    {formatarCep(aluno.cep)}
                                </Card.Text>
                            </Card.Body>

                            <div className="box">
                                <Button variant="outline-primary"
                                    onClick={(e) => { abrirModalForm(aluno, "Editar") }}
                                    className="mr-3">
                                    <FontAwesomeIcon icon={faPencilAlt} /> Editar
                                </Button>
                                <Button variant="outline-danger"
                                    data-nome={aluno.nome}
                                    data-id={aluno.id_aluno}
                                    onClick={confimarExclusao}>
                                    <FontAwesomeIcon icon={faTrashAlt} /> Excluir
                                </Button>
                            </div>
                        </Card>
                    </Col>
                ))}
            </Row>

            <Modal show={showExcluir} onHide={limparIdAlunoExclusao}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar exclusão</Modal.Title>
                </Modal.Header>
                <Modal.Body>Deseja continuar com a exclusão do aluno(a) <strong>{alunoExclusao}</strong>?</Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={limparIdAlunoExclusao}>
                        Não
                    </Button>
                    <Button variant="success" onClick={excluirAluno}>
                        Sim
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showForm} onHide={() => { setShowForm(false); }}
                size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>{tituloModalForm} aluno</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormularioAluno
                        setStateShowForm={setShowForm}
                        aluno={alunoEdicao}
                        preview={preview}
                        thumbnail={thumbnail}
                        setStateThumbnail={setThumbnail}
                        concluirOperacao={concluirOperacao} />
                </Modal.Body>
            </Modal >
        </div >
    )
};