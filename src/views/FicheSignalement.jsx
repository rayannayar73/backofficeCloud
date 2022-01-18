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
  const [dataType, setDataType] = useState(null);
  const [dataRegion,setDataRegion] = useState(null);
  const [dataEtat,setDataEtat] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dataSignalement,setDataSignalement] = useState({
    "region" : {"nom": "...","id":""},
    "longitude" : "...",
    "latitude" : "...",
    "type" : {"nom": "...","id":""},
    "utilisateur": {"nom": "...", "prenom": "...","id":""},
    "etat": {"nom": "...","id":""},
    "description": "..."
  });

  //ito le id avy any @parametre
  const [id,setId]=useState(useQuery().get("id"));
  

  const [longitude, setLongitude] = useState(dataSignalement.longitude);
  const [latitude, setLatitude] = useState(dataSignalement.latitude);
  const [type, setType] = useState({ value:dataSignalement.type.id, label:dataSignalement.type.nom });
  const [etat, setEtat] = useState({ value:dataSignalement.etat.id, label:dataSignalement.etat.nom });
  const [utilisateur, setUtilisateur] = useState({ value:dataSignalement.utilisateur.id, label:dataSignalement.utilisateur.nom });
  const [description, setDescription] = useState(dataSignalement.description);
  const [region, setRegion] = useState({ value:dataSignalement.region.id, label:dataSignalement.nom });
  const [compteur, setCompteur] = useState(true);

const putData = async (e) =>{
  e.preventDefault();
  const donnees = { 
        region: region.value,
        longitude,
        latitude,
        description,
        type: type.value,
        etat: etat.value,
        utilisateur: utilisateur.value
      };
    let res = await axios.put('http://localhost:8090/ato/signalement/'+id, donnees);
    let data = res.data;
    setId(data.id);
    setCompteur(true);
}

const postData = async (e) =>{
  e.preventDefault();
  const donnees = { 
        region: region.value,
        longitude,
        latitude,
        description,
        type: type.value,
        etat: etat.value,
        utilisateur: utilisateur.value 
      };
      console.log(donnees);
    let res = await axios.post('http://localhost:8090/ato/signalement', donnees);
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
    setDataSignalement(data[0]);
    setDescription(data[0].description);
    setRegion({value:data[0].region.id});
    setUtilisateur({value:data[0].utilisateur.id});
    setLongitude(data[0].longitude);
    setLatitude(data[0].latitude);
    setEtat({value:data[0].etat.id});
    setType({value:data[0].type.id});
    setCompteur(false);
  }

  function getData(){
    if (compteur){
      if(id){
        Promise.all([
        fetch('http://localhost:8090/ato/signalement/'+id),
        fetch('http://localhost:8090/ato/regions'),
        fetch('http://localhost:8090/ato/utilisateur'),
        fetch('http://localhost:8090/ato/type'),
        fetch('http://localhost:8090/ato/etat')
        ]).then(function (responses) {
          return Promise.all(responses.map(function (response) {
            return response.json();
          }));
        }).then(function (data) {
            setter(data);
        }).catch((error) => {
            data.splice(0,0,dataSignalement);
            console.error("Error fetching data: ", error);
            setError(error);
        }).finally(() => {
            setLoading(false);
        });
      }
      if(!id){
        Promise.all([
        fetch('http://localhost:8090/ato/regions'),
        fetch('http://localhost:8090/ato/utilisateur'),
        fetch('http://localhost:8090/ato/type'),
        fetch('http://localhost:8090/ato/etat')
        ]).then(function (responses) {
          return Promise.all(responses.map(function (response) {
            return response.json();
          }));
        }).then(function (data) {
            data.splice(0,0,dataSignalement);
            setData(data);
            setCompteur(false);
        }).catch((error) => {
            data.splice(0,0,dataSignalement);
            console.error("Error fetching data: ", error);
            setError(error);
        }).finally(() => {
            setLoading(false);
        });
      }
    }
  }

  useEffect(() => {
    getData();
    console.log(dataSignalement);
    console.log(etat);
  }, [compteur]); 

  if (loading) return "Loading..."; 
  if (error) return "Error!";

const listeRegion = [];
{data[1].forEach(regionObj => {
  listeRegion.push({ value:regionObj.id, label:regionObj.nom });
})}  

const listeUtilisateur = [];
{data[2].forEach(userObj => {
  listeUtilisateur.push({ value:userObj.id, label:userObj.nom+" "+userObj.prenom });
})}  

const listeType = [];
{data[3].forEach(typeObj => {
  listeType.push({ value:typeObj.id, label:typeObj.nom });
})}  

const listeEtat = [];
{data[4].forEach(typeObj => {
  listeEtat.push({ value:typeObj.id, label:typeObj.nom });
})}  

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
                    <h5 className="title">fiche individuelle signalement:</h5>
                  </a>
                  <p className="region">Region: {dataSignalement.region.nom}</p>
                  <p className="longitute">longitude: {dataSignalement.longitude}</p>
                  <p className="latitude">latitude: {dataSignalement.latitude}</p>
                  <p className="type">type: {dataSignalement.type.nom}</p>
                  <p className="type">user: {dataSignalement.utilisateur.nom +" "+ dataSignalement.utilisateur.prenom}</p>
                  <p className="etat">etat: {dataSignalement.etat.nom}</p>
                </div>
                <hr />
                <br/>
                <p className="descri text-center">
                  {dataSignalement.description} 
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
                <Form id="myFormRef">
                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <label>Region</label>
                        <Select
                          placeholder="nom du region"
                          onChange={setRegion}
                          options={listeRegion}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <label>Utilisateur</label>
                        <Select
                          placeholder="nom de l'utilisateur"
                          onChange={setUtilisateur}
                          options={listeUtilisateur}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="px-1" md="6">
                      <FormGroup>
                        <label>Longitude</label>
                        <Input
                          onChange={event => setLongitude(event.target.value)} 
                          placeholder="Longitude"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="px-1" md="6">
                      <FormGroup>
                        <label>Latitude</label>
                        <Input
                        onChange={event => setLatitude(event.target.value)} 
                          placeholder="Latitude"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <FormGroup>
                      <label>Etat</label>
                      <Select
                          // className="form-select bg-secondary text-light"
                          placeholder="etat"
                          onChange={setEtat}
                          options={listeEtat}
                        />
                      </FormGroup>
                    </Col>
                    <Col md="12">
                      <FormGroup>
                        <label>Type</label>
                        <Select
                          placeholder="type"
                          onChange={setType}
                          options={listeType}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <label>Description</label>
                        <Input
                        onChange={event => setDescription(event.target.value)} 
                          cols="80"
                          placeholder="mettez ici la description du signalement"
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
