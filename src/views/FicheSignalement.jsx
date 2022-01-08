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
import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { Link, useLocation, BrowserRouter as Router } from "react-router-dom";

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

function useQuery(){
  return new URLSearchParams(useLocation().search);
}

function User(props) {

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //ito le id azo avy any @parametre ohatran'ny $_Get taloha
  var id=useQuery().get("id");
  if (id==null){ id = 1}

  useEffect(() => {
    //ato le lien no apetraka
    fetch("http://localhost:8090/ato/signalement/"+id)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      //dia tafiditra ato anaty variable data le données rehetra. dia io ftsn no ampiasaina any ambany
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return "Loading...";
  if (error) return "Error!";

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
                  <p className="region">Region: {data.idRegion}</p>
                  <p className="longitute">longitude: {data.longitude}</p>
                  <p className="latitude">latitude: {data.latitude}</p>
                  <p className="type">type: {data.type}</p>
                  <p className="etat">etat: nouveau</p>
                </div>
                <hr />
                <br/>
                <p className="descri text-center">
                  Description:
                  {data.description} 
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
                          ref={region}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <label>Utilisateur</label>
                        <Input
                          placeholder="nom de l'utilisateur"
                          type="text"
                          ref={utilisateur}
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
                          ref={longitude}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="px-1" md="6">
                      <FormGroup>
                        <label>Latitude</label>
                        <Input
                          placeholder="Latitude"
                          type="text"
                          re={latitude}
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
                          ref={type}
                        />
                      </FormGroup>
                    </Col>
                    <Col md="12">
                      <FormGroup>
                      <label>Etat</label>
                      <select className="form-select bg-secondary text-light" ref={etat}>
                        <option value='1'>nouveau</option>
                        <option value='2'>en traitement</option>
                        <option value='3'>terminé</option>
                      </select>
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
                  <button className="btn btn-sm btn-success" onClick={postData}>valider</button>
                  <button className="btn btn-sm btn-warning ml-2" onClick={clearPostOutput}>annuler</button>
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
