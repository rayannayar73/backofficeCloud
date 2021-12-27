import React from "react";
import {
    Card,
    CardBody,
    CardHeader,
    CardTitle,
    Table,
    Row,
    Col,
  } from "reactstrap";
  import PanelHeader from "components/PanelHeader/PanelHeader.js";
  import { thead, tbody } from "variables/general";

  function ListeRegions(){
      return (
      <>
      <PanelHeader size="sm" />
      <div className="content">
      <Row>
          <Col xs={12}>
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Liste Regions</CardTitle>
              </CardHeader>
              <CardBody>
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
                    {tbody.map((prop, key) => {
                      return (
                        <tr key={key}>
                          {prop.data.map((prop, key) => {
                            if (key === thead.length - 1)
                              return (
                                <td key={key} className="text-right">
                                  {prop} <button >Open Modal</button>
                                </td>
                              );
                            return <td key={key}>{prop}</td>;
                          })}
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
          <Col xs={12}>
            <Card className="card-plain">
              <CardHeader>
                <CardTitle tag="h4">Table on Plain Background</CardTitle>
                <p className="category"> Here is a subtitle for this table</p>
              </CardHeader>
            </Card>
          </Col>
        </Row>
      </div>
    {/* <div id="id01" class="w3-modal">
        <div class="w3-modal-content">
            <div class="w3-container">
                <span onClick="document.getElementById('id01').style.display='none'"
                class="w3-button w3-display-topright">&times;</span>
                <p>Some text in the Modal..</p>
                <p>Some text in the Modal..</p>
            </div>
        </div>
    </div> */}
      </>
      )

  }
  export default ListeRegions;