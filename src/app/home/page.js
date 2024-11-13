"use client";

import * as React from "react";
import { extendTheme } from "@mui/material/styles";
import { styled } from "@mui/system";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { PageContainer } from "@toolpad/core/PageContainer";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

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
import UserTable from "./cargar/user/page";
import TablePIAD from "./cargar/ingresodonacionadopcion/page";
import TablePAA from "./cargar/programaactividadanimal/page";

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
  User,
} from "lucide-react";
import { CircularProgress } from "@mui/material";

const adminNavigation = [
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
        segment: "listPC",
        title: "Listado Contratos Proveedores de Servicios Complementarios",
        icon: <ChevronRight />,
      },
      {
        segment: "listPA",
        title: "Listado Contratos Proveedores de Alimentos",
        icon: <ChevronRight />,
      },
      {
        segment: "listV",
        title: "Listado Contratos Veterinarios",
        icon: <ChevronRight />,
      },
      {
        segment: "listVA",
        title: "Listado Veterinarios Activos",
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
        segment: "adoptions/donations-revenues",
        title: "Ingresos por Donaciones y Adopciones",
        icon: <ChevronRight />,
      },
    ],
  },
];
const userAdminNavigation = [
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
    title: "Gestión de Cuentas",
  },
  {
    segment: "users",
    title: "Cuentas",
    icon: <User />,
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
        segment: "listPC",
        title: "Listado Contratos Proveedores de Servicios Complementarios",
        icon: <ChevronRight />,
      },
      {
        segment: "listPA",
        title: "Listado Contratos Proveedores de Alimentos",
        icon: <ChevronRight />,
      },
      {
        segment: "listV",
        title: "Listado Contratos Veterinarios",
        icon: <ChevronRight />,
      },
      {
        segment: "listVA",
        title: "Listado Veterinarios Activos",
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
        segment: "adoptions/donations-revenues",
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
  users: <UserTable />,
  PIAD: <TablePIAD />,
  PAA: <TablePAA />,
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

  const [navigation, setNavigation] = useState([]);
  const { data: session, status } = useSession();
  const router = useDemoRouter("/dashboard");

  useEffect(() => {
    if (session?.user?.role === process.env.NEXT_PUBLIC_USER_ADMIN_ROLE) {
      setNavigation(userAdminNavigation);
    } else {
      setNavigation(adminNavigation);
    }
    console.log(navigation);
  }, [session, status, router]);

  const handleAvatarClick = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

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
      case "/users":
        return components.users;
      case "/revenues/adoptions/donations-revenues":
        return components.PIAD;
      case "/Programas/animal-activity-program":
        return components.PAA;
    }
  };

  if (status === "loading") {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh", // Esto hace que ocupe toda la altura de la ventana
        }}
      >
        <CircularProgress color="primary" size={60} />{" "}
        {/* Cambia el tamaño aquí */}
      </div>
    );
  }

  // Remove this const when copying and pasting into your project.
  const demoWindow = window ? window() : undefined;

  return (
    <>
      <AppProvider
        navigation={navigation}
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
          values={session?.user?.email}
        ></SwipeableTemporaryDrawer>

        <DashboardLayout>
          {renderComponent()}
          {/* <PageContainer>{}</PageContainer> */}
        </DashboardLayout>
      </AppProvider>
    </>
  );
}
