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
  const [dataUtilisateur,setDataUtilisateur] = useState({
    "nom" : "...",
    "prenom" : "..."
  });

  //ito le id avy any @parametre
  const [id,setId]=useState(useQuery().get("id"));
  

  const [nom, setNom] = useState((dataUtilisateur.nom)? dataUtilisateur.nom : '...');
  const [prenom, setPrenom] = useState((dataUtilisateur.prenom)? dataUtilisateur.prenom : '...');

  const [compteur, setCompteur] = useState(true);

const putData = async (e) =>{
  e.preventDefault();
  const donnees = { nom, prenom };
  let res = await axios.put('https://projetcloudrayansedraravo.herokuapp.com/ato/utilisateur/'+id, donnees);
  let data = res.data;
  setId(data.id);
  setCompteur(true);
}

const postData = async (e) =>{
  e.preventDefault();
  const donnees = { nom, prenom };
  let res = await axios.post('https://projetcloudrayansedraravo.herokuapp.com/ato/utilisateur', donnees);
  let data = res.data;
  setId(data.id);
  setCompteur(true);
}

  const clearPostOutput = (e) => {
    e.preventDefault();
    document.getElementById("myFormRef").reset();
  }

  function setter(data){
    setData(data);
    setDataUtilisateur(data[0]);
    setNom(data[0].nom);
    setPrenom(data[0].prenom);
    setCompteur(false);
  }

  function getData(){
    if (compteur){
      if(id){
        Promise.all([
        fetch('https://projetcloudrayansedraravo.herokuapp.com/ato/utilisateur/'+id),
        ]).then(function (responses) {
          return Promise.all(responses.map(function (response) {
            return response.json();
          }));
        }).then(function (data) {
            setter(data);
        }).catch((error) => {
            console.error("Error fetching data: ", error);
            setError(error);
        }).finally(() => {
            setLoading(false);
        });
      }
      if(!id){
        setLoading(false);
        setCompteur(false);
      }
    }
  }

  useEffect(() => {
    getData();
    console.log(data);
  }, [compteur]); 

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
                    <h5 className="title">fiche individuelle utilisateurs:</h5>
                  </a>
                  <p className="region">Nom: {(dataUtilisateur.nom)}</p>
                  <p className="region">prenom: {(dataUtilisateur.prenom)}</p>
                </div>
                <hr />
                <br/>
              </CardBody>
            </Card>
          </Col>
          <Col md="4">
            <Card>
              <CardHeader>
                <h5 className="title">Modification données utilisateurs:</h5>
              </CardHeader>
              <CardBody>
                <Form id="myFormRef">
                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <label>Nom</label>
                        <Input
                          onChange={event => setNom(event.target.value)} 
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
