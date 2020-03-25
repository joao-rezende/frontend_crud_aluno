import React from 'react'
import { withFormik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { Row, Col, Form as FormBT, Button } from 'react-bootstrap';
import MaskedInput from "react-text-mask";
import PropTypes from 'prop-types';
import camera from '../assets/camera.svg';
import api from '../services/api';

const mascaraCep = [/\d/, /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/];

function mascararCep(valor) {
  if (valor !== undefined && valor.length === 8) {
    return valor.substring(0, 5) + "-" + valor.substring(5, 8);
  }
  return valor;
}

function retirarMascaraCep(valor) {
  return valor.replace(/(\.|-)/g, "");
}

const schema = Yup.object().shape({
  nome: Yup.string()
    .required('O nome é obrigatório')
    .min(3, 'O nome deve conter no mínimo 3 letras'),
  cep: Yup.string()
    .required('O CEP é obrigatório')
    .length(9, "CEP inválido")
    .matches(/\d{5}-\d{3}/, "CEP inválido"),
  logradouro: Yup.string().required('O logradouro é obrigatório'),
  numero: Yup.number().required('O número é obrigatório')
    .min(1, "O número deve ser maior que zero"),
  bairro: Yup.string().required('O bairro é obrigatório'),
  cidade: Yup.string().required('O cidade é obrigatório'),
  estado: Yup.string()
    .required('O estado é obrigatório')
    .length(2, "O estado deve conter 2 letras")
    .matches(/^[A-Za-z]+$/, "O estado deve conter apenas letras")
})

const FormularioAluno = withFormik({
  mapPropsToValues: (props) => ({
    id_aluno: props.aluno.id_aluno,
    nome: props.aluno.nome,
    logradouro: props.aluno.logradouro,
    cep: mascararCep(props.aluno.cep),
    numero: props.aluno.numero,
    bairro: props.aluno.bairro,
    complemento: props.aluno.complemento,
    cidade: props.aluno.cidade,
    estado: props.aluno.estado
  }),
  handleSubmit: (values, formik) => {
    const data = new FormData();

    if (values.id_aluno !== undefined) {
      data.append("id_aluno", values.id_aluno);
    }

    data.append("nome", values.nome);
    data.append("cep", retirarMascaraCep(values.cep));
    data.append("logradouro", values.logradouro);
    data.append("numero", values.numero);
    data.append("bairro", values.bairro);
    var complemento = values.complemento ? values.complemento : "";
    data.append("complemento", complemento);
    data.append("cidade", values.cidade);
    data.append("estado", values.estado);
    data.append("imagem", values.imagem);

    let path = "/aluno"
    if (values.id_aluno !== undefined
      && values.id_aluno !== ""
      && values.id_aluno !== null) {
      path += "/" + values.id_aluno;
    }

    api.post(path, data).then(function (response) {
      formik.props.concluirOperacao(response.data);
    }).catch(function (error) {
      if (error.response.status === 400
        && error.response.data === "The image you are attempting to upload doesn't fit into the allowed dimensions.") {
        formik.setFieldError("imagem", "A imagem que você está tentando enviar não se encaixa nas dimensões permitidas")
      } else if (error.response.status === 400
        && error.response.data === "The file you are attempting to upload is larger than the permitted size.") {
        formik.setFieldError("imagem", "O arquivo que você está tentando enviar é maior que o tamanho permitido")
      } else {
        console.error(error.response.status + " - " + error.response.data);
      }
    });
  },
  initialErrors: true,
  validateOnChange: false,
  validateOnBlur: false,
  displayName: 'FormularioAluno',
  validationSchema: schema
})

const Formulario = ({
  preview,
  setStateThumbnail,
  setStateShowForm,
  errors,
  setFieldValue
}) => {
  return (
    <div>
      <Form>
        <Row>
          <Col>
            <FormBT.Group className={errors.nome ? "has-error" : ""}>
              <FormBT.Label htmlFor="nome">Nome: *</FormBT.Label>
              <Field name="nome" id="nome" placeholder="Nome" className="form-control"
              />
              <div className="text-danger">
                <ErrorMessage name="nome" />
              </div>
            </FormBT.Group>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <FormBT.Group className={errors.cep ? "has-error" : ""}>
              <FormBT.Label htmlFor="cep">CEP: *</FormBT.Label>
              <Field name="cep" >
                {({ field }) => (
                  <MaskedInput
                    mask={mascaraCep}
                    id="cep"
                    placeholder="CEP"
                    type="text"
                    className="form-control"
                    {...field}
                  />
                )}
              </Field>
              <div className="text-danger">
                <ErrorMessage name="cep" />
              </div>
            </FormBT.Group>
          </Col>
          <Col md={6}>
            <FormBT.Group className={errors.logradouro ? "has-error" : ""}>
              <FormBT.Label htmlFor="logradouro">Logradouro: *</FormBT.Label>
              <Field id="logradouro" name="logradouro" placeholder="Logradouro" className="form-control" />
              <div className="text-danger">
                <ErrorMessage name="logradouro" />
              </div>
            </FormBT.Group>
          </Col>
          <Col md={2}>
            <FormBT.Group className={errors.numero ? "has-error" : ""}>
              <FormBT.Label htmlFor="numero">Número: *</FormBT.Label>
              <Field id="numero" name="numero" type="number" placeholder="Número" className="form-control" />
              <div className="text-danger">
                <ErrorMessage name="numero" />
              </div>
            </FormBT.Group>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <FormBT.Group className={errors.bairro ? "has-error" : ""}>
              <FormBT.Label htmlFor="bairro">Bairro: *</FormBT.Label>
              <Field id="bairro" name="bairro" placeholder="Bairro" className="form-control" />
              <div className="text-danger">
                <ErrorMessage name="bairro" />
              </div>
            </FormBT.Group>
          </Col>
          <Col md={3}>
            <FormBT.Group>
              <FormBT.Label htmlFor="complemento">Complemento:</FormBT.Label>
              <Field id="complemento" name="complemento" placeholder="Complemento" className="form-control" />
              <div className="text-danger">
                <ErrorMessage name="complemento" />
              </div>
            </FormBT.Group>
          </Col>
          <Col md={3}>
            <FormBT.Group className={errors.cidade ? "has-error" : ""}>
              <FormBT.Label htmlFor="cidade">Cidade: *</FormBT.Label>
              <Field id="cidade" name="cidade" placeholder="Cidade" className="form-control" />
              <div className="text-danger">
                <ErrorMessage name="cidade" />
              </div>
            </FormBT.Group>
          </Col>
          <Col md={2}>
            <FormBT.Group className={errors.estado ? "has-error" : ""}>
              <FormBT.Label htmlFor="estado">Estado: *</FormBT.Label>
              <Field id="estado" name="estado" placeholder="Estado" className="form-control" />
              <div className="text-danger">
                <ErrorMessage name="estado" />
              </div>
            </FormBT.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormBT.Group>
              <label id="thumbnail"
                style={{ backgroundImage: `url(${preview})` }}
                className={preview ? 'has-thumbnail' : ''}>
                <input id="imagem" type="file" onChange={e => {
                  setStateThumbnail(e.target.files[0]);
                  setFieldValue('imagem', e.target.files[0]);
                }} />
                <img src={camera} alt="Selecione uma imagem" />
              </label>
              <div className="text-danger">
                <ErrorMessage name="imagem" />
              </div>
            </FormBT.Group>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col>
            <Button variant="danger" type="button"
              onClick={() => { setStateShowForm(false) }}>
              Cancelar
            </Button>
          </Col>
          <Col className="text-right">
            <Button variant="success" type="submit">Enviar</Button>
          </Col>
        </Row>
      </Form>
    </div >
  )
}

Formulario.propTypes = {
  setStateThumbnail: PropTypes.func.isRequired,
  setStateShowForm: PropTypes.func.isRequired,
  aluno: PropTypes.object
};

export default FormularioAluno(Formulario)