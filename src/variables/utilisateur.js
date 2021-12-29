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
// ##############################
// // // tasks list for Tasks card in Dashboard view
// #############################

/*const tasks = [
    {
        checked: true,
        text: 'Sign contract for "What are conference organizers afraid of?"',
    },
    {
        checked: false,
        text: "Lines From Great Russian Literature? Or E-mails From My Boss?",
    },
    {
        checked: true,
        text:
            "Flooded: One year later, assessing what was lost and what was found when a ravaging rain swept through metro Detroit",
    },
];*/

// ##############################
// // // table head data and table body data for Tables view
// #############################

const thead = ["Nom", "Prenom"];
const tbody = [
    {
        className: "table-success",
        data: ["Rakoto", "Paul"],
    },
    {
        className: "",
        data: ["Randria", "Meva"],
    },
];

// tasks list for Tasks card in Dashboard view
// data for <thead> of table in TableList view
// data for <tbody> of table in TableList view
export { thead, tbody };
