/*!

=========================================================
* Now UI Dashboard React - v1.5.0
=========================================================

* Product Page: https://www.creative-tim.com/product/now-ui-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/now-ui-dashboard-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";

// reactstrap components
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    Row,
    Col,
} from "reactstrap";

// core components
import PanelHeader from "components/PanelHeader/PanelHeader.js";
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
function User() {
    return (
        <>
            <PanelHeader size="sm" />
            <div className="content">
                <Row>

                    <Col md="8">
                        <Card className="card-user">
                            <div className="image">
                            </div>
                            <CardBody>
                                <div className="author">
                                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                                        <h5 className="title">fiche utilisateur:</h5>
                                    </a>
                                    <p className="nom">Nom: Jean</p>
                                    <p className="prenom">Prenom: Mec</p>
                                </div>
                                <hr />
                                <br />
                                <p className="descri text-center">
                                    Description:
                                    "Bandy kely"
                                </p>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col md="4">
                        <Card>
                            <CardHeader>
                                <h5 className="title">Modification données utilisateur:</h5>
                            </CardHeader>
                            <CardBody>
                                <Form>
                                    <Row>
                                        <Col md="12">
                                            <FormGroup>
                                                <label>Nom</label>
                                                <Input
                                                    placeholder="nom de l' utilisateur"
                                                    type="text"
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md="12">
                                            <FormGroup>
                                                <label>Prenom</label>
                                                <Input
                                                    placeholder="prenom de l' utilisateur"
                                                    type="text"
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md="12">
                                            <FormGroup>
                                                <label>Description</label>
                                                <Input
                                                    cols="80"
                                                    placeholder="mettez ici la description de l' utilisateur"
                                                    rows="4"
                                                    type="textarea"
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <button value="submit" className="btn btn-sm btn-success" >
                                        <>
                                            <span>valider</span>
                                        </>
                                    </button>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        </>
    );
}

export default User;
