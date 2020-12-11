import React, { useState, useEffect, useContext, createContext, Suspense } from "react"

/** @jsx jsx */
import { ThemeProvider, jsx, Styled, useThemeUI } from "theme-ui"
import { Flex, Box, Button, Text, Image, Spinner, Grid, Input, Link } from "@theme-ui/components";
import Theme from "./theme"

import moment from "moment";


let App
const StateContext = createContext()

// ------------------------------------------------------------------

const useStateLocal = () => {
  return {
    Theme: useState(useContext(createContext(Theme))),
  };
};

// ------------------

const ContextProvider = ({ children }) => {
  return (
    <StateContext.Provider value={useStateLocal()}>
      <ThemeProvider theme={Theme}>{children}</ThemeProvider>
    </StateContext.Provider>
  );
};

// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------


const Body = props => {
  const Estilo = useThemeUI().theme.styles
  const [Loading, setLoading] = props.useContext.Loading.DataMain
  const [Registros, setRegistros] = props.useContext.Registros
  const {useAcciones} = props

// -----------------------------------------------------------------------------

// ------------------

const Encabezado = props => {
  const Estilo = useThemeUI().theme.styles;

  try {
    return (
      <div>

        <Flex sx={{ width: "100%", bg: "primary" }}>
          <Box sx={{ width: "15%" }}>
            <Text sx={Estilo.h2}>Pedido</Text>
          </Box>

          <Box sx={{ width: "15%" }}>
            <Text sx={Estilo.h2}>Cuenta</Text>
          </Box>

          <Box sx={{ width: "15%" }}>
            <Text sx={Estilo.h2}>Entrega</Text>
          </Box>




          <Box sx={{ width: "15%" }}>
            <Text sx={Estilo.h2}>Fecha</Text>
          </Box>

          <Box sx={{ width: "30%" }}>
            <Text sx={Estilo.h2}>Cliente</Text>
          </Box>

          <Box sx={{ width: "15%" }}>
            <Text sx={Estilo.h2}>Confirmado</Text>
          </Box>


          <Box sx={{ width: "15%" }}>
            <Text sx={Estilo.h2}>Importe</Text>
          </Box>

          <Box sx={{ width: "15%" }}>
            <Text sx={Estilo.h2}>Pagado</Text>
          </Box>

          <Box sx={{ width: "5%" }}>
            <Text sx={Estilo.h2} />
          </Box>
        </Flex>
      </div>
    );
  } catch (e) {
    console.error(e);
  }
};

// -----------------------------------------------------------------------------




const Renglon = props => {
  const Estilo = useThemeUI().theme.styles;
  const { Row, Color, getDetalleConsumo, i, usedata } = props;



  return (
    <div>
              <Link 
                href={"https://sushifactory.app/orderbook?id=" + Row.Id}
                target={"_blank"}
              >
      <Grid sx={{ width: "100%", bg: Color, borderTopStyle: i===0 ? "none" : "solid", borderWidth:2, borderColor: "#D3D3D3", }}>

          <Flex sx={{ width: "100%", bg: Color }} columns={[1,null,2]}>





            <Grid sx={{ width: "100%", bg: Color, gridGap: 0 }}>
              <Flex sx={{ width: "100%", bg: Color }}>





              <Button
                sx={{
                  width: "100%",
                  bg: "transparent"
                }}
                onClick={() => {
                // setPedido(Row.Id);
                  //setTipoAnim(1);
                  // setLoadingDet(true)
                  // navigate("/det");
                }}
              >
                <Flex sx={{ width: "100%", bg: Color }}>
                  <Box sx={{ width: "15%" }}>
                    <Text sx={Estilo.h2}>{Row.Id}</Text>
                  </Box>

                  <Box sx={{ width: "15%" }}>
                    <Text sx={Estilo.h2}>{Row.Cuenta}</Text>
                  </Box>

                  <Box sx={{ width: "15%" }}>
                    <Text sx={Estilo.h2}>{Row.TipoEntrega === "1" ? "ToGo":""}{Row.TipoEntrega === "2" ? "Domicilio":""}</Text>
                  </Box>



                  <Box sx={{ width: "15%" }}>
                    {/* <Text sx={Estilo.h2}>{moment(Row.Fecha).format("DD MMM")}</Text> */}
                    <Text sx={Estilo.h2}>
                      {moment(Row.Fecha).format("DD MMM HH:mm")}
                    </Text>
                  </Box>

                  <Box sx={{ width: "30%", textAlign: "left" }}>
                    <Text sx={Estilo.h2}>
                      {Row.Telefono} {Row.Nombre}
                    </Text>
                  </Box>


                  <Box sx={{ width: "15%" }}>
                    {/* <Text sx={Estilo.h2}>{moment(Row.Fecha).format("DD MMM")}</Text> */}
                    <Text sx={Estilo.h2}>
                      {Row.Confirmado ? moment(Row.Confirmado).format("DD MMM HH:mm"):""}
                    </Text>
                  </Box>




                  <Box sx={{ width: "15%" }}>
                    <Text sx={Estilo.h2s(Row.Monto)}>{Row.Monto} </Text>
                  </Box>

                  <Box sx={{ width: "15%" }}>
                    <Text sx={Estilo.h2s(Row.Pagado)}>{Row.Pagado} </Text>
                  </Box>

                  <Box sx={{ width: "5%" }}>
                    <Text sx={Estilo.h2}>></Text>
                  </Box>
                </Flex>
              </Button>




              </Flex>

            </Grid>

          </Flex>
      </Grid>
              </Link>

    </div>
  );
};



// ------------------------------

const Listado = props => {
  const Estilo = useThemeUI().theme.styles;
  // const [FiltroProceso, setFiltroProceso] = props.useContext.Filtro.Proceso
  // const [Search, setSearch] = props.useContext.Search

  // const RenglonesFiltro = Registros.filter(v => {

  //   let A = FiltroProceso.TOSTADAS.Activo ? v.CategoriasTitulo === "TOSTADAS" : null
  //   let B = FiltroProceso.ENTRADAS.Activo ? v.CategoriasTitulo === "ENTRADAS" : null
  //   let C = FiltroProceso.SOPAS.Activo ? v.CategoriasTitulo === "SOPAS" : null
  //   let D = FiltroProceso.ARROCES.Activo ? v.CategoriasTitulo === "ARROCES" : null
  //   let E = FiltroProceso.POKES.Activo ? v.CategoriasTitulo === "POKES" : null
  //   let F = FiltroProceso.NATURALES.Activo ? v.CategoriasTitulo === "NATURALES" : null
  //   let G = FiltroProceso.CALIENTES.Activo ? v.CategoriasTitulo === "CALIENTES" : null
  //   let H = FiltroProceso.HORNEADOS.Activo ? v.CategoriasTitulo === "HORNEADOS" : null
  //   let I = FiltroProceso.VEGETARIANOS.Activo ? v.CategoriasTitulo === "VEGETARIANOS" : null
  //   let J = FiltroProceso.PREMIUM.Activo ? v.CategoriasTitulo === "PREMIUM" : null
  //   let K = FiltroProceso.PLATILLOS.Activo ? v.CategoriasTitulo === "PLATILLOS" : null
  //   let L = FiltroProceso.RAMEN.Activo ? v.CategoriasTitulo === "RAMEN" : null
  //   let M = FiltroProceso.POSTRES.Activo ? v.CategoriasTitulo === "POSTRES" : null
  //   let N = FiltroProceso.BEBIDAS.Activo ? v.CategoriasTitulo === "BEBIDAS" : null
  //   let O = FiltroProceso.INFANTIL.Activo ? v.CategoriasTitulo === "INFANTIL" : null
  //   let P = FiltroProceso["ROLLO DEL MES"].Activo ? v.CategoriasTitulo === "ROLLO DEL MES" : null
  //   let Q = FiltroProceso.EXTRAS.Activo ? v.CategoriasTitulo === "EXTRAS" : null

  //   let S = v.ProductosTitulo.toLowerCase().includes(Search.toLowerCase())


  //   return S & (A || B || C || D || E || F || G || H || I || J || K || L || M || N || O || P || Q )

  // }).map((row, index) => {

  //   return (
  //     <Renglon
  //       key={row.Id}
  //       Row={row}
  //       Color={"White"}
  //       i={index}
  //     />
  //   );
  // });

  const Renglones = Registros.map((row, index) => {
    return (
      <Renglon
        key={row.Id}
        Row={row}
        Color={"White"}
        i={index}
      />
    );
  });

  return (
    <div>
      <Flex>
        <Box sx={{ width: "100%" }}>{Renglones}</Box>
      </Flex>
    </div>
  );
};

// ------------------------------------------

  try {

    return (
      <Grid sx={{p:0, m: 0}}>
        {Loading ? <Spinner size={17} ml={3} /> : 

          <div>
          <header>
            <Encabezado {...props} texto="Pedidos" />
          </header>

            <Listado {...props}/>
          </div>
        }
      </Grid>
    )
    
  } catch (e) {
    console.error(e);
  }
}

// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------

export default (App = props => {
  return (
    <div>
      <ContextProvider>
        <Flex>

          <main sx={{width: "100%"}}>
            <Body {...props} />
          </main>
        </Flex>
      </ContextProvider>
    </div>
  );
});

// -------------------------------------------------------------------------------

