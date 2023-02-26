import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import api from "./utils/api";
import React, { useEffect } from "react";
import Input from "./form/Imput";
/* contexts */

import { register } from "./hooks/useAuth";

export default function Home() {
  const [show, setShow] = useState(false);
  const [projects, setProjects] = useState([]);
  const [createProject, setCreateProject] = useState({});

  useEffect(() => {
    const getAll = async () => {
      api.get("/api/projects", {}).then((response) => {
        setProjects(response.data.projects);
      });
    };

    getAll();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    register(createProject);
    setTimeout(() => {
      window.location.reload();
    },500);
  }

  function handleChange(e) {
    setCreateProject({ ...createProject, [e.target.name]: e.target.value });
  }

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div class="container ">
      <div class="col-sm-11 offset-sm-1  mt-5 mb-4 text-gred items">
        <h1 class="left">Projetos</h1>
        <div className="right">
          <Button variant="primary" onClick={handleShow}>
            Novo projeto
          </Button>
        </div>
      </div>
      <div className="crud shadow-lg p-3 mb-5 mt-5 bg-body rounded">
        <div class="row">
          <div class="col-sm-12 mt-4 mb-4 text-gred ">
            <div className="search">
              <form class="form-inline">
                <input
                  class="form-control "
                  type="search"
                  placeholder="Search project"
                  aria-label="Search"
                />
              </form>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="table-responsive ">
            <table class="table">
              <thead>
                <tr className="tr">
                  <th>Empresas</th>
                  <th>Projeto </th>
                  <th>Tipo projeto</th>
                  <th>Status </th>
                  <th>Lider </th>
                  <th>Tarefas abertas</th>
                  <th>Situação</th>
                </tr>
              </thead>
              <tbody>
                {projects.length > 0 &&
                  projects.map((project) => (
                    // <div>
                    <tr>
                      <td>{project.cliente}</td>
                      <td>{project.nome}</td>
                      <td>static campo </td>
                      <td>{project.status}</td>
                      <td>Leonardo Marcelo</td>
                      <td>9</td>
                      <td className={project.situation}>{project.situation}</td>
                    </tr>
                    // </div>
                  ))}
                {projects.length === 0 && (
                  <p>Ainda não há projetos cadastrados!</p>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* <!--- Model Box ---> */}
        <div class="model_box">
          <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>Dados do projeto</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form onSubmit={handleSubmit}>
                <div class="row">
                  <div class="form-group col-6">
                    <Input
                      text="Nome"
                      type="text"
                      name="nome"
                      required
                      placeholder="(Desenvolvimento)Site institucional"
                      handleOnChange={handleChange}
                    />
                    <div class="form-group ">
                      <Input
                        text="Cliente"
                        type="text"
                        required
                        name="cliente"
                        placeholder="Cliente"
                        handleOnChange={handleChange}
                      />
                    </div>
                    <div class="form-group">
                      <Input
                        text="Data inicio"
                        type="date"
                        name="data"
                        handleOnChange={handleChange}
                      />
                    </div>
                    <div class="form-group">
                      <Input
                        text="Deadline"
                        type="date"
                        name="deadline"
                        handleOnChange={handleChange}
                      />
                    </div>
                    <div class="form-group">
                      <Input
                        text="Budget"
                        type="text"
                        name="budget"
                        handleOnChange={handleChange}
                        placeholder="Ex:R$:20.000.00"
                        required
                      />
                    </div>
                    <div class="form-group">
                      <Input
                        text="Status"
                        type="text"
                        name="status"
                        handleOnChange={handleChange}
                        placeholder="Ex:liberado"
                      />
                    </div>
                  </div>
                  <div class="col-4">
                    <div>
                      <h4>Tipo do projeto</h4>
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="radio"
                          name="flexRadioDefault"
                          id="flexRadioDefault1"
                        />
                        <label class="form-check-label" for="flexRadioDefault1">
                          Projeto com escopo fechado
                        </label>
                      </div>
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="radio"
                          name="flexRadioDefault"
                          id="flexRadioDefault2"
                          checked
                        />
                        <label class="form-check-label" for="flexRadioDefault2">
                          Projeto recorrente
                        </label>
                      </div>
                    </div>
                    <br></br>
                    <h4>Categorias</h4>
                    <div class="form-check form-switch">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        id="flexSwitchCheckDefault"
                      />
                      <label
                        class="form-check-label"
                        for="flexSwitchCheckDefault"
                      >
                        Marketing Digital
                      </label>
                    </div>
                    <div class="form-check form-switch">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        id="flexSwitchCheckDefault"
                      />
                      <label
                        class="form-check-label"
                        for="flexSwitchCheckDefault"
                      >
                        Desenvolvimemto
                      </label>
                    </div>
                    <div class="form-check form-switch">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        id="flexSwitchCheckDefault"
                      />
                      <label
                        class="form-check-label"
                        for="flexSwitchCheckDefault"
                      >
                        Hospedagem
                      </label>
                    </div>
                  </div>
                  <div className="rightBtn">
                    <button
                      type="submit"
                      onSubmit={handleSubmit}
                      class="btn bg-primary mt-4 "
                    >
                      Salvar
                    </button>
                  </div>
                </div>
              </form>
            </Modal.Body>
          </Modal>

          {/* Model Box Finsihs */}
        </div>
      </div>
    </div>
  );
}
