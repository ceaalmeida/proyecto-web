"use client";

import * as React from "react";
import { extendTheme } from "@mui/material/styles";
import { styled } from "@mui/system";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { PageContainer } from "@toolpad/core/PageContainer";

import ActivityTable from "./cargar/actividades/page";
import AdopcionesTable from "./cargar/adopciones/page";
import AnimalTable from "./cargar/animales/page";
import DonacionesTable from "./cargar/donaciones/page";
import ContractTable from "./cargar/contratos/page";
import ProveedoresServiciosTable from "./cargar/proveedor-servicios-complementarios/page";
import ProveedorAlimentosTable from "./cargar/proveedores-alimentos/page";
import ServiceTypeTable from "./cargar/tipo-servicios/page";
import FoodTypeTable from "./cargar/tipos-alimentos/page";
import TransporteTable from "./cargar/transportes/page";
import VeterinarianTable from "./cargar/veterinarios/page";
import SwipeableTemporaryDrawer from "./usuario-barra-lateral";

import {
  PawPrint,
  Activity,
  Heart,
  DollarSign,
  FileText,
  Stethoscope,
  ShoppingBag,
  Briefcase,
  Store,
  Truck,
  List,
  BarChart2,
  TrendingUp,
  LogOut,
  MoreHoriz,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  ChefHat,
} from "lucide-react";

const NAVIGATION = [
  {
    kind: "header",
    title: "Gestión de Animales",
  },
  {
    segment: "animals",
    title: "Animales",
    icon: <PawPrint />,
  },
  {
    segment: "activities",
    title: "Actividades",
    icon: <Activity />,
  },
  {
    segment: "adoptions",
    title: "Adopciones",
    icon: <Heart />,
  },
  {
    segment: "donations",
    title: "Donaciones",
    icon: <DollarSign />,
  },
  {
    kind: "divider",
  },
  {
    kind: "header",
    title: "Gestión de Contratos",
  },
  {
    segment: "contracts",
    title: "Contratos",
    icon: <FileText />,
    children: [
      {
        segment: "veterinarian",
        title: "Veterinarios",
        icon: <Stethoscope />,
      },
      {
        segment: "complementaryServicesProvider",
        title: "Proveedor Servicios Complementarios",
        icon: <Briefcase />,
      },
      {
        segment: "foodProvider",
        title: "Proveedor Alimentos",
        icon: <ShoppingBag />,
      },
    ],
  },
  {
    kind: "divider",
  },
  {
    kind: "header",
    title: "Otros",
  },
  {
    segment: "foods",
    title: "Alimentos",
    icon: <ChefHat />,
  },
  {
    segment: "services",
    title: "Servicios",
    icon: <Store />,
  },
  {
    segment: "transport",
    title: "Transporte",
    icon: <Truck />,
  },
  {
    kind: "divider",
  },
  {
    kind: "header",
    title: "Reportes",
  },
  {
    segment: "lists",
    title: "Listados",
    icon: <List />,
    children: [
      {
        segment: "list1",
        title: "Listado 1",
        icon: <ChevronRight />,
      },
      {
        segment: "list2",
        title: "Listado 2",
        icon: <ChevronRight />,
      },
      {
        segment: "list3",
        title: "Listado 3",
        icon: <ChevronRight />,
      },
      {
        segment: "list4",
        title: "Listado 4",
        icon: <ChevronRight />,
      },
    ],
  },
  {
    segment: "Programas",
    title: "Servicios",
    icon: <BarChart2 />,
    children: [
      {
        segment: "animal-activity-program",
        title: "Programa de Actividades del Animal",
        icon: <ChevronRight />,
      },
    ],
  },
  {
    segment: "revenues",
    title: "Ingresos",
    icon: <TrendingUp />,
    children: [
      {
        segment: "adpotions/donations-revenues",
        title: "Ingresos por Donaciones y Adopciones",
        icon: <ChevronRight />,
      },
    ],
  },
];

const components = {
  activities: <ActivityTable />,
  adoptions: <AdopcionesTable />,
  animals: <AnimalTable />,
  donaciones: <DonacionesTable />,
  contracts: <ContractTable />,
  proveedoresServicios: <ProveedoresServiciosTable />,
  proveedorAlimentos: <ProveedorAlimentosTable />,
  serviceType: <ServiceTypeTable />,
  foodType: <FoodTypeTable />,
  transporte: <TransporteTable />,
  veterinarian: <VeterinarianTable />,
};

const demoTheme = extendTheme({
  colorSchemes: { light: true, dark: true },
  colorSchemeSelector: "class",
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function useDemoRouter(initialPath) {
  const [pathname, setPathname] = React.useState(initialPath);

  const router = React.useMemo(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path) => setPathname(String(path)),
    };
  }, [pathname]);

  return router;
}

const Skeleton = styled("div")(({ theme, height }) => ({
  backgroundColor: theme.palette.action.hover,
  borderRadius: theme.shape.borderRadius,
  height,
  content: '" "',
}));

export default function DashboardLayoutBasic(props) {
  const { window } = props;

  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const handleAvatarClick = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const router = useDemoRouter("/dashboard");

  console.log("Router pathname:", router.pathname);

  const renderComponent = () => {
    switch (router.pathname) {
      case "/animals":
        return components.animals;
      case "/activities":
        return components.activities;
      case "/adoptions":
        return components.adoptions;
      case "/donations":
        return components.donaciones;
      case "/contracts/veterinarian":
        return components.veterinarian;
      case "/contracts/complementaryServicesProvider":
        return components.proveedoresServicios;
      case "/contracts/foodProvider":
        return components.proveedorAlimentos;
      case "/foods":
        return components.foodType;
      case "/services":
        return components.serviceType;
      case "/transport":
        return components.transporte;
    }
  };

  // Remove this const when copying and pasting into your project.
  const demoWindow = window ? window() : undefined;

  return (
    <AppProvider
      navigation={NAVIGATION}
      router={router}
      theme={demoTheme}
      window={demoWindow}
    >
      <SwipeableTemporaryDrawer
        anchor="right"
        open={drawerOpen}
        onClose={handleDrawerClose}
        onOpen={() => setDrawerOpen(true)}
        //values={""}
      ></SwipeableTemporaryDrawer>
      <SwipeableTemporaryDrawer
        anchor="right"
        open={drawerOpen}
        onClose={handleDrawerClose}
        onOpen={() => setDrawerOpen(true)}
        values={"Alejandro Almeida"}
      ></SwipeableTemporaryDrawer>

      <DashboardLayout>
        {renderComponent()}
        {/* <PageContainer>{}</PageContainer> */}
      </DashboardLayout>
    </AppProvider>
  );
}
