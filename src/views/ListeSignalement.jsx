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
import React, { useState, useEffect } from "react";

// reactstrap components
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Table,
  Row,
  Col,
  Button
} from "reactstrap";

// core components
import PanelHeader from "components/PanelHeader/PanelHeader.js";
import { Link } from 'react-router-dom';
import { thead, tbody } from "variables/signalements";

function ListeSignalements() {

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [compteur, setCompteur] = useState(true);

  function Supprimer(id){
    fetch(`http://localhost:8090/ato/signalement/${id}`, {
      "method": "DELETE"
    })
    .then(response => response.json())
    .then(response => {
      console.log(response);
      setCompteur(true);
    })
    .catch(err => {
      console.log(err);
    });
  }
  
  function setter(dataType){
  }
  useEffect(() => {
    if (compteur){
    fetch("http://localhost:8090/ato/signalement")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        setData(data);
        console.log(data);
        setCompteur(false);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
    }
  },[compteur]);

  if (loading) return "Loading...";
  if (error) return "Error!";
  return (
    <>
      <PanelHeader size="sm" />
      <div className="content">
        <Row>
          <Col xs={12}>
            <Card>
              <CardHeader>
                <CardTitle tag="h4">liste des signalements</CardTitle>
              </CardHeader>
              <CardBody>
              <>
                <a href='fiche-signalement' className="btn btn-sm btn-success mb-2">Ajouter</a>
              </>
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      {thead.map((prop, key) => {
                        if (key === thead.length - 1)
                          return (
                            <th key={key} className="text-right">
                              {prop}
                            </th>
                          );
                        return <th key={key}>{prop}</th>;
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {data
                      // .filter((prop) => prop.type.nom.includes('rano'))
                      .filter((prop, nombre) => nombre < 10)
                      .map((prop, key) => {
                      const dateDebut = new Date(prop.dateSignalement);
                      return (
                        <tr key={key}>
                          <td key='region' className="text-right">
                            {(prop.region==null)? <a href={'attribution-signalement-region?id='+prop.id}><i className={"now-ui-icons ui-1_simple-add"} /></a> : prop.region.nom }
                          </td>
                          <td key='type' className="text-right">
                            {(prop.type)?prop.type.nom : "..."}
                          </td>
                          <td key='etat' className="text-right">
                            {(prop.etat)?prop.etat.nom : "..."}
                          </td>
                          <td key='dateSignalement' className="text-right">
                            {(dateDebut)?dateDebut.getDate()+"-"+(dateDebut.getMonth()+1)+"-"+dateDebut.getFullYear() : "..."}
                          </td>                          
                          <td key='Modifier'>
                            <a href={'fiche-signalement?id='+prop.id} className="btn btn-sm btn-primary mr-1">Modifier</a>
                          </td>
                          <td key='Supprimer'>
                            <a onClick={() => Supprimer(prop.id) } className="btn btn-sm btn-danger mr-1">Supprimer</a>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default ListeSignalements;
