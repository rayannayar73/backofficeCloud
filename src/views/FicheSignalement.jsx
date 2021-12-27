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
                    <h5 className="title">fiche individuelle signalement:</h5>
                  </a>
                  <p className="region">Region: non attribué</p>
                  <p className="longitute">longitude: 23,789</p>
                  <p className="latitude">latitude: 23,789</p>
                  <p className="type">type: fako</p>
                  <p className="etat">etat: nouveau</p>
                </div>
                <hr />
                <br/>
                <p className="descri text-center">
                  Description:
                  "misy fako miparitaka eo @arabe" 
                </p>
              </CardBody>
            </Card>
          </Col>
          <Col md="4">
            <Card>
              <CardHeader>
                <h5 className="title">Modification données signalement:</h5>
              </CardHeader>
              <CardBody>
                <Form>
                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <label>Region</label>
                        <Input
                          placeholder="nom du region"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="6">
                      <FormGroup>
                        <label>Longitude</label>
                        <Input
                          placeholder="Longitude"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="px-1" md="6">
                      <FormGroup>
                        <label>Latitude</label>
                        <Input
                          placeholder="Latitude"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <label>Type</label>
                        <Input
                          placeholder="type de signalement"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    <Col md="12">
                      <FormGroup>
                        <label>Etat</label>
                      <UncontrolledDropdown>
                        <DropdownToggle caret>
                            etat du signalement
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem>nouveau</DropdownItem>
                            <DropdownItem>en cours</DropdownItem>
                            <DropdownItem>fini</DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <label>Description</label>
                        <Input
                          cols="80"
                          placeholder="mettez ici la description du signalement"
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
