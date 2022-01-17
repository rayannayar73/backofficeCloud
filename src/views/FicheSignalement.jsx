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
  const dataEtat = ['nouveau','en traitement','terminé']
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dataSignalement = {
    "region" : {"nom": "..."},
    "longitude" : "...",
    "latitude" : "...",
    "type" : {"nom": "..."},
    "utilisateur": {"nom": "...", "prenom": "..."},
    "description": "..."
  };

  //ito le id avy any @parametre
  var id=useQuery().get("id");
  

  const [longitude, setLongitude] = useState('');
  const [latitude, setLatitude] = useState('');
  const [type, setType] = useState('');
  const [etat, setEtat] = useState('');
  const [utilisateur, setUtilisateur] = useState('');
  const [description, setDescription] = useState('');
  const [region, setRegion] = useState('');
  const [compteur, setCompteur] = useState(true);
  const [selectedOption, setSelectedOption] = useState(null);

const putData = async (e) =>{
  e.preventDefault();
  const donnees = { 
        region: region.value,
        longitude,
        latitude,
        description,
        type: type.value,
        utilisateur: utilisateur.value
      };
    let res = await axios.put('http://localhost:8090/ato/signalement/'+id, donnees);
    let data = res.data;
    id = data.id;
}

const postData = async (e) =>{
  e.preventDefault();
  const donnees = { 
        region: region.value,
        longitude,
        latitude,
        description,
        type: type.value,
        utilisateur: utilisateur.value 
      };
      console.log(donnees);
    let res = await axios.post('http://localhost:8090/ato/signalement', donnees);
    let data = res.data;
    id = data.id;
}

  const clearPostOutput = (e) => {
    e.preventDefault();
    document.getElementById("myFormRef").reset();
  }

  function getData(){
    if (compteur){
      if(id){
        Promise.all([
        fetch('http://localhost:8090/ato/signalement/'+id),
        fetch('http://localhost:8090/ato/regions'),
        fetch('http://localhost:8090/ato/utilisateur'),
        fetch('http://localhost:8090/ato/type')
        ]).then(function (responses) {
          return Promise.all(responses.map(function (response) {
            return response.json();
          }));
        }).then(function (data) {
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
      if(!id){
        Promise.all([
        fetch('http://localhost:8090/ato/regions'),
        fetch('http://localhost:8090/ato/utilisateur'),
        fetch('http://localhost:8090/ato/type')
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
    console.log(data);
  }, [data]);

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
                  <p className="region">Region: {data[0].region.nom}</p>
                  <p className="longitute">longitude: {data[0].longitude}</p>
                  <p className="latitude">latitude: {data[0].latitude}</p>
                  <p className="type">type: {data[0].type.nom}</p>
                  <p className="type">user: {data[0].utilisateur.nom +" "+ data[0].utilisateur.prenom}</p>
                  <p className="etat">etat: nouveau</p>
                </div>
                <hr />
                <br/>
                <p className="descri text-center">
                  {data[0].description} 
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
                      <select className="form-select bg-secondary text-light" 
                      onChange={event => setEtat(event.target.value)} >
                      {dataEtat.map((prop, key) => {
                        return(
                          <option key={key} value={prop}>{prop}</option>
                          );
                       })}
                      </select>
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
