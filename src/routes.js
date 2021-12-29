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
import Dashboard from "views/Dashboard.js";
import Notifications from "views/Notifications.js";
import Icons from "views/Icons.js";
import Typography from "views/Typography.js";
import TableList from "views/TableList.js";
import ListeSignalements from "views/ListeSignalement.jsx";
import Maps from "views/Maps.js";
import Upgrade from "views/Upgrade.js";
import UserPage from "views/UserPage.js";
import FicheSignalement from "views/FicheSignalement.jsx";
import ListeUtilisateur from "views/ListeUtilisateur.js";
import FicheUtilisateur from "views/FicheUtilisateur.jsx";

var dashRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "design_app",
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/icons",
    name: "Icons",
    icon: "design_image",
    component: Icons,
    layout: "/admin",
  },
  {
    path: "/maps",
    name: "Maps",
    icon: "location_map-big",
    component: Maps,
    layout: "/admin",
  },
  {
    path: "/notifications",
    name: "Notifications",
    icon: "ui-1_bell-53",
    component: Notifications,
    layout: "/admin",
  },
  {
    path: "/user-page",
    name: "User Profile",
    icon: "users_single-02",
    component: UserPage,
    layout: "/admin",
  },
  {
    path: "/extended-tables",
    name: "Table List",
    icon: "files_paper",
    component: TableList,
    layout: "/admin",
  },
  {
    path: "/liste-signalements",
    name: "liste signalements",
    icon: "files_paper",
    component: ListeSignalements,
    layout: "/admin",
  },
  {
    path: "/typography",
    name: "Typography",
    icon: "design-2_ruler-pencil",
    component: Typography,
    layout: "/admin",
  },
  {
    path: "/fiche-signalement",
    name: "fiche-signalement",
    icon: "design-2_ruler-pencil",
    component: FicheSignalement,
    layout: "/admin",
  },
  {
      path: "/liste-utilisateur",
      name: "liste utilisateur",
      icon: "files_paper",
      component: ListeUtilisateur,
      layout: "/admin",
  },
  {
      path: "/fiche-utilisateur",
      name: "fiche utilisateur",
      icon: "design-2_ruler-pencil",
      component: FicheUtilisateur,
      layout: "/admin",
  },
];
export default dashRoutes;
