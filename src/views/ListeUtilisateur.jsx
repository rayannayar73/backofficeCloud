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
import { thead, tbody } from "variables/utilisateur";

function ListeUtilisateur() {

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [compteur, setCompteur] = useState(true);

  function Supprimer(id){
    fetch(`https://projetcloudrayansedraravo.herokuapp.com/ato/utilisateur/${id}`, {
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

  useEffect(() => {
    if (compteur){
    fetch("https://projetcloudrayansedraravo.herokuapp.com/ato/utilisateur")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        setData(data);
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
  }, [compteur]);

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
                <CardTitle tag="h4">liste des utilisateur</CardTitle>
              </CardHeader>
              <CardBody>
              <>
                <a href='fiche-utilisateur' className="btn btn-sm btn-success mb-2">Ajouter</a>
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
                            {prop.nom}
                          </td>
                          <td key='latitude' className="text-right">
                            {prop.prenom}
                          </td>                          
                          <td key='Modifier'>
                            <a href={'fiche-utilisateur?id='+prop.id} className="btn btn-sm btn-primary mr-1">Modifier</a>
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

export default ListeUtilisateur;
