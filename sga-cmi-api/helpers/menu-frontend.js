const getMenuFrontEnd = (role) => {
  const menu = [
    {
      titulo: "Inicio",
      icono: "RiHome5Fill",
      path: "/",
    },
  ];

  if (role === "ADMIN_ROLE") {
    menu.push(
      {
        titulo: "Usuarios",
        icono: "FaUsers",
        path: "/usuarios",
      },

      {
        titulo: "Grados",
        icono: "MdGrade",
        path: "/grados",
      },
      {
        titulo: "Estudiantes",
        icono: "RiUserStarFill",
        path: "/estudiantes",
      },
      {
        titulo: "Pagos",
        icono: "MdMonetizationOn",
        path: "/pagos",
      },
      {
        titulo: "Profesores",
        icono: "FaChalkboardTeacher",
        path: "/profesores",
      },
      {
        titulo: "Equipos",
        icono: "RiComputerFill",
        path: "/equipos",
      },
      {
        titulo: "Libros",
        icono: "RiBook3Fill",
        path: "/libros",
      },
      {
        titulo: "Inmobiliarios",
        icono: "MdTableChart",
        path: "/inmobiliarios",
      },
      {
        titulo: "Uniformes",
        icono: "FaVest",
        path: "/uniformes",
      },
      {
        titulo: "Laboratorios",
        icono: "MdScience",
        path: "/laboratorios",
      },
      {
        titulo: "Reportes",
        icono: "FaChartPie",
        path: "/reportes",
      }
    );
  }

  if (role === "CASHIER_ROLE") {
    menu.push(
      {
        titulo: "Pagos",
        icono: "MdMonetizationOn",
        path: "/pagos",
      },
      {
        titulo: "Uniformes",
        icono: "FaVest",
        path: "/uniformes",
      },
      {
        titulo: "Reportes",
        icono: "FaChartPie",
        path: "/reportes",
      }
    );
  }

  if (role === "ADMINISTRATIVE_ASSISTANT_ROLE") {
    menu.push(
      {
        titulo: "Grados",
        icono: "MdGrade",
        path: "/grados",
      },
      {
        titulo: "Estudiantes",
        icono: "RiUserStarFill",
        path: "/estudiantes",
      },
      {
        titulo: "Profesores",
        icono: "FaChalkboardTeacher",
        path: "/profesores",
      },
      {
        titulo: "Equipos",
        icono: "RiComputerFill",
        path: "/equipos",
      },
      {
        titulo: "Libros",
        icono: "RiBook3Fill",
        path: "/libros",
      },
      {
        titulo: "Inmobiliarios",
        icono: "MdTableChart",
        path: "/inmobiliarios",
      },
      {
        titulo: "Uniformes",
        icono: "FaVest",
        path: "/uniformes",
      },
      {
        titulo: "Laboratorios",
        icono: "MdScience",
        path: "/laboratorios",
      }
    );
  }
  return menu;
};

module.exports = {
  getMenuFrontEnd,
};
