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
  const [dataType, setDataType] = useState(null);
  const [dataRegion,setDataRegion] = useState(null);
  const dataEtat = ['nouveau','en traitement','terminé']
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //ito le id avy any @parametre
  var id=useQuery().get("id");
  if(!id)id=1;

  const [longitude, setLongitude] = useState('');
  const [latitude, setLatitude] = useState('');
  const [type, setType] = useState('');
  const [etat, setEtat] = useState('');
  const [utilisateur, setUtilisateur] = useState('');
  const [description, setDescription] = useState('');
  const [region, setRegion] = useState('');

  const [postResult, setPostResult] = useState(null);

  const fortmatResponse = (res) => {
    return JSON.stringify(res, null, 2);
  }
  
  function putData() {
    fetch("http://localhost:8090/ato/signalement/1", {
      "method": "PUT",
      "headers": {
        "content-type": "application/json",
      },
      "body": JSON.stringify({
        region: 2,
        longitude: 123.3,
        latitude: 123.21,
        description: 'asa',
        type: 2,
        utilisateur: 2
      })
    })
    .then(response => response.json())
    .then(response => {
      alert(response)
    })
    .catch(err => {
      console.log(err);
    });
  }



  function postData() {
   fetch("http://localhost:8090/ato/signalement", {
      "method": "POST",
      "headers": {
        "content-type": "application/json",
      },
      "body": JSON.stringify({
        region: 1,
        longitude: 123.3,
        latitude: 123.21,
        description: 'asa',
        type: 1,
        utilisateur: 1
      })
    })
    .then(response => response.json())
    .then(response => {
      alert(response)
    })
    .catch(err => {
      console.log(err);
    });
  }
  
  const clearPostOutput = (e) => {
    e.preventDefault();
    document.getElementById("myFormRef").reset();
  }

  function getData(){
    Promise.all([
    fetch('http://localhost:8090/ato/signalement/'+id),
    fetch('http://localhost:8090/ato/type')
    ]).then(function (responses) {
      return Promise.all(responses.map(function (response) {
        return response.json();
      }));
    }).then(function (data) {
      setData(data);
    }).catch((error) => {
        console.error("Error fetching data: ", error);
        setError(error);
    }).finally(() => {
        setLoading(false);
    }).catch(function (error) {
      console.log(error);
    });
  }


  function getOneData(entity, idEntity) {
    // get all entities - GET
    fetch("http://localhost:8090/ato/"+entity+"/"+idEntity, {
      "method": "GET"
    })
    .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        setData(data);
      })
    .catch(err => { console.log(err); 
    });
  }

  useEffect(() => {
    getData();
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
                  <p className="region">Region: {data[0].region.nom}</p>
                  <p className="longitute">longitude: {data[0].longitude}</p>
                  <p className="latitude">latitude: {data[0].latitude}</p>
                  <p className="type">type: {data[0].type.nom}</p>
                  <p className="etat">etat: nouveau</p>
                </div>
                <hr />
                <br/>
                <p className="descri text-center">
                  Description:
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
                        <Input
                          onChange={event => setRegion(event.target.value)} 
                          placeholder="nom du region"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <label>Utilisateur</label>
                        <Input
                          onChange={event => setUtilisateur(event.target.value)} 
                          placeholder="nom de l'utilisateur"
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
                        <label>Type</label>
                        <Input
                        onChange={event => setType(event.target.value)} 
                          placeholder="type de signalement"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
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
                  <button className="btn btn-sm btn-success" onClick={putData}>valider</button>
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
