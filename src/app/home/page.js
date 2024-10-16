"use client";

import * as React from "react";
import { extendTheme } from "@mui/material/styles";
import { styled } from "@mui/system";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import BarChartIcon from "@mui/icons-material/BarChart";
import DescriptionIcon from "@mui/icons-material/Description";
import LayersIcon from "@mui/icons-material/Layers";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { PageContainer } from "@toolpad/core/PageContainer";
import Grid from "@mui/material/Grid2";
import { ActivityTable } from "./cargar/actividades/page";
import { AdopcionesTable } from "./cargar/adopciones/page";
import { AnimalTable } from "./cargar/animales/page";
import { DonacionesTable } from "./cargar/donaciones/page";
import { ProveedoresServiciosTable } from "./cargar/proveedor-servicios-complementarios/page";
import { ProveedorAlimentosTable } from "./cargar/proveedores-alimentos/page";
import { ServiceTypeTable } from "./cargar/tipo-servicios/page";
import { FoodTypeTable } from "./cargar/tipos-alimentos/page";
import { TransporteTable } from "./cargar/transportes/page";
import { VeterinarianTable } from "./cargar/veterinarios/page";

import {
  PawPrint,
  Activity,
  Heart,
  DollarSign,
  FileText,
  Stethoscope,
  ShoppingBag,
  Briefcase,
  Truck,
  List,
  BarChart2,
  TrendingUp,
  LogOut,
  MoreHoriz,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  ChefHat
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
    title: "Aliemntos",
    icon: <ChefHat />,
  },
  
];

const components = {
  activities: <ActivityTable />,
  adoptions: <AdopcionesTable />,
  animals: <AnimalTable />,
  donaciones: <DonacionesTable />,
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

  const router = useDemoRouter("/dashboard");

  const renderComponent = () => {
    switch (router.pathname) {
      case "/activities":
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
      <DashboardLayout>
        <PageContainer></PageContainer>
      </DashboardLayout>
    </AppProvider>
  );
}
