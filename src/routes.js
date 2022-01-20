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
import ListeRegions from "views/ListeRegions.js";
import ListeSignalements from "views/ListeSignalement.jsx";
import Maps from "views/Maps.js";
import FicheSignalement from "views/FicheSignalement.jsx";
import ListeUtilisateur from "views/ListeUtilisateur.jsx";
import FicheUtilisateur from "views/FicheUtilisateur.jsx";
import AffectationSignalementRegion from "views/AffectationSignalementRegion.jsx";

var dashRoutes = [
  {
    path: "/dashboard",
    name: "Statistique",
    icon: "design_app",
    component: Dashboard,
    layout: "/admin",
  },
  // {
  //   path: "/icons",
  //   name: "Icons",
  //   icon: "design_image",
  //   component: Icons,
  //   layout: "/admin",
  // },
  // {
  //   path: "/maps",
  //   name: "Maps",
  //   icon: "location_map-big",
  //   component: Maps,
  //   layout: "/admin",
  // },
  {
    path: "/attribution-signalement-region",
    name: "Affecter Signalement-Region",
    icon: "design-2_ruler-pencil",
    component: AffectationSignalementRegion,
    layout: "/admin",
  },
  {
    path: "/liste-regions",
    name: "ListeRegions",
    icon: "files_paper",
    component: ListeRegions,
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
