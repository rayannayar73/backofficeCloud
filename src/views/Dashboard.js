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
import React, {useState, useEffect} from "react";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  FormGroup,
  Input,
  Button,
  Modal,
  ModalFooter,
  ModalHeader,
  ModalBody
} from "reactstrap";

// core components
import PanelHeader from "components/PanelHeader/PanelHeader.js";

import {
  dashboardPanelChart,
  dashboard24HoursPerformanceChart,
} from "variables/charts.js";

function Dashboard() {

  const [modalLogin , setModalLogin]= useState(true);

  const [dataSigne, setDataSigne] = useState(null);
  const [nombreSigne, setNombreSigne] = useState(null);
  const [dataTer, setDataTer] = useState(null);
  const [nombreTer, setNombreTer] = useState(null);
  const [dataNouv, setDataNouv] = useState(null);
  const [nombreNouv, setNombreNouv] = useState(null);
  const liste = [];
  const listeSigne = [];
  const listeTer = [];

  function setter(data){
    setDataSigne(data[0]);
    setNombreSigne(data[3]);
    setDataTer(data[1]);
    setNombreTer(data[4]);
    setDataNouv(data[2]);
    setNombreNouv(data[5]);
  }

  function getData(){
    Promise.all([
    fetch('https://projetcloudrayansedraravo.herokuapp.com/ato/signalement/jour'),
    fetch('https://projetcloudrayansedraravo.herokuapp.com/ato/signalement-Terminé/jour'),
    fetch('https://projetcloudrayansedraravo.herokuapp.com/ato/signalement-Nouveau/jour'),
    fetch('https://projetcloudrayansedraravo.herokuapp.com/ato/signalement-nombre/jour'),
    fetch('https://projetcloudrayansedraravo.herokuapp.com/ato/signalement-Terminé-nombre/jour'),
    fetch('https://projetcloudrayansedraravo.herokuapp.com/ato/signalement-Nouveau-nombre/jour'),
    ]).then(function (responses) {
      return Promise.all(responses.map(function (response) {
        return response.json();
      }));
    }).then(function (data) {
        setter(data);
    }).catch((error) => {
        // data.splice(0,0,dataSignalement);
        console.error("Error fetching data: ", error);
        setError(error);
    });
  }
  useEffect(() => {
    getData();
  }, []);
  
  if(nombreNouv)listeObjet(nombreNouv,liste);
  if(nombreSigne)listeObjet(nombreSigne,listeSigne);
  if(nombreTer)listeObjet(nombreTer,listeTer);

  function listeObjet(liste,listeRetour){
    liste.forEach(obj => {
      listeRetour.push(obj[0]);
    })
  }
console.log(liste);

  function hexToRGB(hex, alpha) {
    var r = parseInt(hex.slice(1, 3), 16),
      g = parseInt(hex.slice(3, 5), 16),
      b = parseInt(hex.slice(5, 7), 16);
  
    if (alpha) {
      return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
    } else {
      return "rgb(" + r + ", " + g + ", " + b + ")";
    }
  }
  const chartColor = "#FFFFFF";
  var gradientChartOptionsConfigurationWithNumbersAndGrid = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltips: {
        bodySpacing: 4,
        mode: "nearest",
        intersect: 0,
        position: "nearest",
        xPadding: 10,
        yPadding: 10,
        caretPadding: 10,
      },
    },
    responsive: 1,
    scales: {
      y: {
        grid: {
          zeroLineColor: "transparent",
          drawBorder: false,
        },
        ticks: {
          maxTicksLimit: 7,
        },
      },
      x: {
        display: 0,
        ticks: {
          display: false,
        },
        grid: {
          zeroLineColor: "transparent",
          drawTicks: false,
          display: false,
          drawBorder: false,
        },
      },
    },
    layout: {
      padding: { left: 0, right: 0, top: 15, bottom: 15 },
    },
  };
  

  const dashboardAllProductsChart = {
    data: (canvas) => {
      var ctx = canvas.getContext("2d");
      var gradientStroke = ctx.createLinearGradient(500, 0, 100, 0);
      gradientStroke.addColorStop(0, "#18ce0f");
      gradientStroke.addColorStop(1, chartColor);
      var gradientFill = ctx.createLinearGradient(0, 170, 0, 50);
      gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
      gradientFill.addColorStop(1, hexToRGB("#18ce0f", 0.4));
  
      var tab=listeSigne;
      var tabLabels=dataSigne;
      
      return {
        labels: tabLabels,
        datasets: [
          {
            label: "signalement",
            borderColor: "#18ce0f",
            pointBorderColor: "#FFF",
            pointBackgroundColor: "#18ce0f",
            pointBorderWidth: 2,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 1,
            pointRadius: 4,
            fill: true,
            backgroundColor: gradientFill,
            borderWidth: 2,
            tension: 0.4,
            data: tab,
          },
        ],
      };
    },
    options: gradientChartOptionsConfigurationWithNumbersAndGrid,
  };

  const dashboardAllProductsChartTermine = {
    dataT: (canvas) => {
      var ctx = canvas.getContext("2d");
      var gradientStroke = ctx.createLinearGradient(500, 0, 100, 0);
      gradientStroke.addColorStop(0, "#18ce0f");
      gradientStroke.addColorStop(1, chartColor);
      var gradientFill = ctx.createLinearGradient(0, 170, 0, 50);
      gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
      gradientFill.addColorStop(1, hexToRGB("#18ce0f", 0.4));
  
      var tab=listeTer;
      var tabLabel=dataTer;
      
      return {
        labels: tabLabel,
        datasets: [
          {
            label: "signalement",
            borderColor: "#18ce0f",
            pointBorderColor: "#FFF",
            pointBackgroundColor: "#18ce0f",
            pointBorderWidth: 2,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 1,
            pointRadius: 4,
            fill: true,
            backgroundColor: gradientFill,
            borderWidth: 2,
            tension: 0.4,
            data: tab,
          },
        ],
      };
    },
    options: gradientChartOptionsConfigurationWithNumbersAndGrid,
  };

  const dashboardAllProductsChartNouveau = {
    dataN: (canvas) => {
      var ctx = canvas.getContext("2d");
      var gradientStroke = ctx.createLinearGradient(500, 0, 100, 0);
      gradientStroke.addColorStop(0, "#18ce0f");
      gradientStroke.addColorStop(1, chartColor);
      var gradientFill = ctx.createLinearGradient(0, 170, 0, 50);
      gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
      gradientFill.addColorStop(1, hexToRGB("#18ce0f", 0.4));
  
      var tab=liste;
      var tabLabe=dataNouv;
      
      return {
        labels: tabLabe,
        datasets: [
          {
            label: "signalement",
            borderColor: "#18ce0f",
            pointBorderColor: "#FFF",
            pointBackgroundColor: "#18ce0f",
            pointBorderWidth: 2,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 1,
            pointRadius: 4,
            fill: true,
            backgroundColor: gradientFill,
            borderWidth: 2,
            tension: 0.4,
            data: tab,
          },
        ],
      };
    },
    options: gradientChartOptionsConfigurationWithNumbersAndGrid,
  };
  
  return (
    <>

<Modal isOpen={modalLogin} style={{
          display: 'block', width: 700, padding: 30
      }}>
        
        <ModalHeader>Connexion</ModalHeader>
      
      <ModalBody>
           <p> Login</p>
           <CardBody>
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
                        </CardBody>
           </ModalBody>
           <ModalFooter>
                    <Button color="primary" onClick={()=> setModalLogin(false)}>Valider</Button>
                </ModalFooter>
      </Modal>



      <PanelHeader
        size="lg"
        content={
          <Line
            data={dashboardAllProductsChart.data}
            options={dashboardAllProductsChart.options}
          />
        }
      />
      <div className="content">
        <Row>
         
          <Col xs={12} md={6}>
            <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">2021-2022</h5>
                <CardTitle tag="h4">Nouveau signalements</CardTitle>
                <UncontrolledDropdown>
                  <DropdownMenu right>
                    <DropdownItem>Action</DropdownItem>
                    <DropdownItem>Another Action</DropdownItem>
                    <DropdownItem>Something else here</DropdownItem>
                    <DropdownItem className="text-danger">
                      Remove data
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Line
                    data={dashboardAllProductsChartNouveau.dataN}
                    options={dashboardAllProductsChartNouveau.options}
                  />
                </div>
              </CardBody>
              <CardFooter>
                <div className="stats">
                  <i className="now-ui-icons arrows-1_refresh-69" /> 
                  
                </div>
              </CardFooter>
            </Card>
          </Col>
          <Col xs={12} md={6}>
            <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">2021-2022</h5>
                <CardTitle tag="h4">Signalement terminé</CardTitle>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Bar
                    data={dashboardAllProductsChartTermine.dataT}
                    options={dashboardAllProductsChartTermine.options}
                  />
                </div>
              </CardBody>
              <CardFooter>
                <div className="stats">
                  <i className="now-ui-icons ui-2_time-alarm" /> 
                </div>
              </CardFooter>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={6}>
           
          </Col>
          <Col xs={12} md={6}>
            
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Dashboard;
