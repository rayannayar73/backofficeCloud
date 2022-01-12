import React, {useState} from "react";
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
import {useHistory} from "react-router-dom";
import AdminLayout from "layouts/Admin.js";
  
  function ListeRegions(){
      let histoty =useHistory();
    
      return ( 
        <>
        <div className="content" 
            style={{
                marginTop: "100px",
                marginLeft: "40%"
            }}
        
        >
            <Row>
            {/* <Col md="12"> */}
               
                <Col md="5">
                    <Card>
                        <CardHeader>
                            <h5 className="title">Login:</h5>
                        </CardHeader>
                        <CardBody>
                            <Form>
                                <Row>
                                    <Col md="12">
                                        <FormGroup>
                                            <label>Email</label>
                                            <Input
                                                placeholder="email de l' utilisateur"
                                                type="text"
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md="12">
                                        <FormGroup>
                                            <label>Mots de passe</label>
                                            <Input
                                                placeholder="mots de passe de l' utilisateur"
                                                type="text"
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md="12">
                                        <FormGroup>
                                            <Input
                                                cols="80"
                                                placeholder=""
                                                rows="4"
                                                type="textarea"
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <button value="submit" className="btn btn-sm btn-success" onClick={()=> history.push("/dashboard")} >
                                  valider
                                    {/* <>
                                        <span>valider</span>
                                    </> */}
                                </button>
                            </Form>
                        </CardBody>
                    </Card>
                </Col>
            {/* </Col> */}
            </Row>
        </div>
    </>

        );
  }

  export default ListeRegions;