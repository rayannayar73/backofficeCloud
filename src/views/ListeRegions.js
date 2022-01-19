import React, {useState , useEffect} from "react";
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

  
  // function afficher(){
  //   return(
  //     <a href="modalRegion"> Afficher</a>
  //   )
  // }
  
  function ListeRegions(){
    const [modalFicheRegion , setModalIsOpen]=useState(false)
    const [id, setId]=useState(1);
    const [nom,setNom]=useState(null);
    console.log(id);
    const [data, setData]=useState(null);
    const [loading,setLoading]=useState(true);
    const [error , setError]= useState(null);

    useEffect(()=>{
      fetch("https://projetcloudrayansedraravo.herokuapp.com/ato/regions")
      .then((response)=> {
        if(response.ok){
          return response.json();
        }
        throw response;
      })
      .then((data)=>{
        setData(data);
      })
      .catch((error)=> {
        console.error("Error fetching data :", error);
        setError(error);
      })
      .finally(()=> {
        setLoading(false);
      });
    },[]);
    if (loading) return "Loading ...";
    if (error) return "Error!";
    
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
                    {data.map((prop, key) => {
                      return (
                        <tr key={key}>
                           <td key='nom' className="text-right">
                            {prop.nom}
                          </td>
                          <td key='chef de region' className="text-right">
                            {prop.nom}
                          </td>
                          <td key='Afficher'>
                            <a ><button type="button" className="btn btn-primary" onClick={()=> {setModalIsOpen(true);setId(prop.id);setNom(prop.nom)}}  >Afficher</button></a>
                          
                          </td>
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
        
        <ModalHeader>le region de {nom}</ModalHeader>
      
      <ModalBody>
           <p> region de {nom} sur la carte de Madagascar</p>
           // <img src={require("assets/img/diana.jpg").default} className="avatar border-gray" alt="Photo " />
           </ModalBody>
           <ModalFooter>
                    <Button color="primary" onClick={()=> setModalIsOpen(false)}>OK</Button>
                </ModalFooter>
      </Modal>
      </>
      );
  }

  export default ListeRegions;