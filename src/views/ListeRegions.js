import React, {useState} from "react";
import {
    Card,
    CardBody,
    CardHeader,
    CardTitle,
    Table,
    Row,
    Col,
    Modal,
    Button,
    ModalFooter,
    ModalHeader,
    ModalBody
  } from "reactstrap";
  import PanelHeader from "components/PanelHeader/PanelHeader.js";
  import { thead, tbody } from "variables/TabRegions";
  
  
  function ListeRegions(){
    const [modalFicheRegion , setModalIsOpen]=useState(false)
    const modalStyle={
      height: 1000
    }
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
                                  {prop} <button type="button" className="btn btn-primary" onClick={()=> setModalIsOpen(true)} >Afficher</button>
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
    
    <Modal isOpen={modalFicheRegion} style={{
          display: 'block', width: 700, padding: 30
      }}> 
      <ModalHeader>Le region Itasy</ModalHeader>
      <ModalBody>
           <p>Modal body text goes here.</p>
           <p>Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte. Il n'a pas fait que survivre cinq siècles, mais s'est aussi adapté à la bureautique informatique, sans que son contenu n'en soit modifié. Il a été popularisé dans les années 1960 grâce à la vente de feuilles Letraset contenant des passages du Lorem Ipsum, et, plus récemment, par son inclusion dans des applications de mise en page de texte, comme Aldus PageMaker.</p>
           </ModalBody>
           <ModalFooter>
                    <Button color="primary" onClick={()=> setModalIsOpen(false)}>Okay</Button>
                </ModalFooter>
    </Modal>
      </>
      );
  }

  export default ListeRegions;