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
  Table,
  Button,
  Label,
  FormGroup,
  Input,
  UncontrolledTooltip,
} from "reactstrap";

// core components
import PanelHeader from "components/PanelHeader/PanelHeader.js";

import {
  dashboardPanelChart,
  dashboard24HoursPerformanceChart,
} from "variables/charts.js";

function Dashboard() {

  const [dataSigne, setDataSigne] = useState(null);
  const liste = [];

  useEffect(() => {
    fetch("http://localhost:8090/ato/regions")
      .then((response) => {
        if (response.ok) {  
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        data.forEach(regionObj => {
          liste.push(regionObj.nom);
        })setDataSigne(liste);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      })
  }, []);

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
  
      var tab=[40, 500, 650, 700, 1200, 1250, 1300, 1900];
      var tabLabels=dataSigne;
      
      return {
        labels: tabLabels,
        datasets: [
          {
            label: "Email Stats",
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
      <PanelHeader
        size="lg"
        content={
          <Line
            data={dashboardPanelChart.data}
            options={dashboardPanelChart.options}
          />
        }
      />
      <div className="content">
        <Row>
         
          <Col xs={12} md={6}>
            <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">2021-2022</h5>
                <CardTitle tag="h4">Tous les signalements</CardTitle>
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
                    data={dashboardAllProductsChart.data}
                    options={dashboardAllProductsChart.options}
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
                    data={dashboard24HoursPerformanceChart.data}
                    options={dashboard24HoursPerformanceChart.options}
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
