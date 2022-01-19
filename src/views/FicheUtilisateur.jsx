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
import Select from 'react-select';

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
const axios = require('axios');

function useQuery(){
  return new URLSearchParams(useLocation().search);
}

function User(props) {

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dataUtilisateur = {
    "nom" : {"nom" : "..."},
    "prenom" : "..."
  };

  var id=useQuery().get("id");

  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');

  const putData = async (e) =>{
    e.preventDefault();
    const donnees = { 
          nom,
          prenom
        };
      let res = await axios.put('http://localhost:8090/ato/utilisateur/'+id, donnees);
      let data = res.data;
      id = data.id;
  }

  const postData = async (e) =>{
    e.preventDefault();
    const donnees = { 
          nom,
          prenom 
        };
        console.log(donnees);
      let res = await axios.post('http://localhost:8090/ato/utilisateur', donnees);
      let data = res.data;
      id = data.id;
  }

  const clearPostOutput = (e) => {
    e.preventDefault();
    document.getElementById("myFormRef").reset();
  }

  function getData(){
    if(id){
      Promise.all([
      fetch('http://localhost:8090/ato/utilisateur/'+id)
      ]).then(function (responses) {
        return Promise.all(responses.map(function (response) {
          return response.json();
        }));
      }).then(function (data) {
          setData(data);
      }).catch((error) => {
          data.splice(0,0,dataUtilisateur);
          console.error("Error fetching data: ", error);
          setError(error);
        }).finally(() => {
          setLoading(false);
        });
    }
    if(!id){
      data.splice(0,0,dataUtilisateur);
    }
  }

  useEffect(() => {
    getData();
    console.log(data);
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
                  <a href="#pablo" >
                    <h5 className="title">fiche individuelle utilisateur:</h5>
                  </a>
                  <p className="nom">Nom: {data[0].nom}</p>
                  <p className="prenom">Prenom: {data[0].prenom}</p>
                </div>
                <hr />
                <br/>
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
                        onChange={event => setNom(event.target.value)} 
                          cols="80"
                          placeholder="veuillez saisir votre nom"
                          rows="4"
                          type="textarea"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <label>Prenom</label>
                        <Input
                        onChange={event => setPrenom(event.target.value)} 
                          cols="80"
                          placeholder="veuillez saisir votre prenom"
                          rows="4"
                          type="textarea"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <button className="btn btn-sm btn-success" onClick={(id)? putData : postData}>valider</button>
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