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
} from "reactstrap";

// core components
import PanelHeader from "components/PanelHeader/PanelHeader.js";
import { Link } from 'react-router-dom';
import { thead, tbody } from "variables/signalements";

function Ajout(){
  return(
    <>
      <a href='fiche-signalement' className="btn btn-sm btn-success mb-2">Ajouter</a>
    </>
  );
}

function Modif(){
  return(
    <td>
      <a href='fiche-signalement' className="btn btn-sm btn-primary mr-1">Modifier</a>
    </td>
  );
}

function Suppr(){
  return(
    <td>
      <button className="btn btn-sm btn-danger btn-delete-user" >
      <>
        <span>Supprimer</span>
      </>
      </button>
    </td>
  );
}

function ListeSignalements() {

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8090/ato/signalement")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
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
                    {data.map((prop, key) => {
                      return (
                        <tr key={key}>
                          <td key='longitude' className="text-right">
                            {prop.longitude}
                          </td>
                          <td key='latitude' className="text-right">
                            {prop.latitude}
                          </td>
                          <td key='region' className="text-right">
                            {prop.idRegion}
                          </td>
                          <td key='type' className="text-right">
                            {prop.type}
                          </td>
                          <td key='etat' className="text-right">
                            {prop.etat}
                          </td>                          
                          <td key='Modifier'>
                            <a href={'fiche-signalement?id='+prop.id} className="btn btn-sm btn-primary mr-1">Modifier</a>
                          </td>
                          <td key='Supprimer'>
                            <a href={'fiche-signalement?id='+prop.id} className="btn btn-sm btn-danger mr-1">Supprimer</a>
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
