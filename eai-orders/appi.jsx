import React, { useState, useEffect, useContext, createContext, Suspense } from "react"
import axios from "axios"


// ---------- styles
  /** @jsx jsx */ 
  import { ThemeProvider, jsx, Styled, useThemeUI } from "theme-ui"
  import { Grid, Flex, Box, Button, Text, Image, Spinner, Input } from "@theme-ui/components"
  import Theme from "./theme"
  import "@babel/polyfill"

  import moment from "moment";

  import { useMediaQuery } from 'react-responsive'



// ------------------
  import usedata from "./usedata"
  import Head from "./head"
  import Menu from "./menu"
  import Regs from "./regs"

  import SideBar from "./sidebar";
  import "./styles.css";




// -------------------------------------------

  let App;
  const StateContext = createContext();

let server = "https://sushifactory.app"



const useStateUniv = () => {
  return {
    Theme: useState(useContext(createContext(Theme))),
    Loading: {
      DataMain: useState(useContext(createContext(false))),
      Registros: useState(useContext(createContext(false))),
      Detalle: useState(useContext(createContext(false))),
    },

    Menu: {
      onMenu: useState(useContext(createContext(false))),
      Selected: useState(useContext(createContext(0))),
    },

    Extend: {
      Filter: useState(useContext(createContext(true))),
      Search: useState(useContext(createContext(true))),
      Cat: useState(useContext(createContext(true))),
      Order: useState(useContext(createContext(true))),
      Cliente: useState(useContext(createContext(true))),
      Cuenta: useState(useContext(createContext(true))),
      Share: useState(useContext(createContext(false))),

    },

    Images: {
      Logo1: useState(useContext(createContext({src: "https://smxai.net/sf/sflogo1.jpg"}))),
      Logo2: useState(useContext(createContext({src: "https://smxai.net/sf/sflogo2.jpg"}))),
      Flechad: useState(useContext(createContext({src: "https://smxai.net/sf/cs1/arrowd1.png"}))),
      Flechau: useState(useContext(createContext({src: "https://smxai.net/sf/cs1/arrowu1.png"}))),
    },
    
    Empresa: useState(useContext(createContext(1))),
    Sucursal: useState(useContext(createContext({value: 6}))),
    Registros: useState(useContext(createContext([]))),

    User: {
      Id: useState(useContext(createContext(0))),
      Name: useState(useContext(createContext(""))),
    },
  };
}

// ------------------

const ContextProvider = ({ children }) => {
  return (
    <StateContext.Provider value={useStateUniv()}>
      <ThemeProvider theme={Theme}>{children}</ThemeProvider>
    </StateContext.Provider>
  );
}

// --------------------------------------------------------------------------

let useStatus = function(StateContextM) {
  return {
    head: function() { return 1 },
    filter: function() { return 1 },
    search: function() { return 1 },

  }
}

// --------------------------------------------------------------------------


let useAcciones = function(StateContext) {
  const useData = new usedata()
  const [LoadingDataMain, setLoadingDataMain] = useContext(StateContext).Loading.DataMain
  const [Registros, setRegistros] = useContext(StateContext).Registros
  const [UserId, setUserId] = useContext(StateContext).User.Id;
  const [UserName, setUserName] = useContext(StateContext).User.Name;

    // ---------------------
  
    return {

      useChange : (Field, setField) => {
        return {
          name: Field,
          value: Field,
          fontSize: 1,
          color: "#595959",
          bg: "#DCDCDC",
          onChange: e => {
            setField(e.target.value)
          }
        }
      },

      
      Loader : async function (props) {

        const res = await axios.get(server + '/logindata')
        setUserId(res.data.miid)
        setUserName(res.data.miuser)



        setLoadingDataMain(true)
          let useDataRes = await useData.Pedidos().getLista({
            Sucursal: 6,
            Ano: Number(2020),
            Mes: Number(11),
            Dia: Number(10),
          })
          setRegistros(useDataRes)

        setLoadingDataMain(false)
      },

    }
  }
  
// -----------------------------------------------------------------------------




const HeaderBody = props => {
  const usestatus = new useStatus(StateContext)
  const useacciones = new useAcciones(StateContext)

// ------------
 useEffect(() => { useacciones.Loader(props) }, [])

// useEffect(() => { useacciones.LoaderCat(PedidoData) }, [PedidoData.Id])

// useEffect(() => { if(ExtendCuenta){useacciones.LoaderCuenta()}}, [ExtendCuenta]);


// ------------

  try {

    return (

      <div>

        <Flex bg="WhiteSmoke" sx={{width: "100%" }}>
        <Flex sx={{width: "100%" }}>
          <Box sx={{ width: "100%" }}>

            <main>
              <Head 
                useContext={useContext(StateContext)}
              // useAcciones = {useacciones}
                useStatus = {usestatus}
              />

            </main>

          </Box>
        </Flex>

      </Flex>
      </div>
    )
      
  } catch (e) {
    console.error(e);
  }
}


// -----------------------------------------------------------------------------


const MenuBody = props => {
  const Estilo = useThemeUI().theme.styles;
  // const usestatus = new useStatus(StateContext)
  const useacciones = new useAcciones(StateContext)

// ------------
try {

  return (
    <Flex sx={{width: "100%" }}>

      <Box sx={{ width: "100%" }}>

        <Menu 
          useContext={useContext(StateContext)}
          useAcciones = {useacciones}
          //useStatus = {usestatus}
        />

      </Box>

    </Flex>
    )

  } catch (e) {
    console.error(e);
  }
}


// -----------------------------------------------------------------------------



const Body = props => {
  const usestatus = new useStatus(StateContext)
  const useacciones = new useAcciones(StateContext)

// ------------
 useEffect(() => { useacciones.Loader(props) }, [])

// useEffect(() => { useacciones.LoaderCat(PedidoData) }, [PedidoData.Id])

// useEffect(() => { if(ExtendCuenta){useacciones.LoaderCuenta()}}, [ExtendCuenta]);


// ------------

try {

  return (

    <div>

      <Flex bg="WhiteSmoke" sx={{width: "100%" }}>
      <Flex sx={{width: "100%" }}>
        <Box sx={{ width: "100%" }}>

          <main>

            <Flex sx={{ width: "100%" }}>
              <Box sx={{ width: "100%" }}>
                <Regs {...props}
                  useContext={useContext(StateContext)}
                /> 
              </Box>
            </Flex>

          </main>

        </Box>
      </Flex>

    </Flex>
    </div>
  )
    
} catch (e) {
  console.error(e);
}
}


// -----------------------------------------------------------------------------



// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------

export default (App = props => {

  const isDesktop = useMediaQuery({ minWidth: 550 })

  return (
    <div id="App"
     // style={{display: 'flex', justifyContent: 'center'}}
    >

        {isDesktop ? <div/>
          :  <div>
              <SideBar pageWrapId={"page-wrap"} outerContainerId={"App"} />
            </div>                 
        }


      <div id="page-wrap">

        <div style={{display: 'flex',
          justifyContent: 'center'
        }}
        >

            <ContextProvider>

              <Flex bg="WhiteSmoke"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                 width: "100%",
                 minHeight: '300vh',
                }}
              // css={{ maxWidth: "768px", minWidth: "375px" }}
              >
                <Box sx={{ width: "100%" }}>

                  <header sx={{width: "100%"}}>

                    <HeaderBody {...props} />

                    {isDesktop ? 
                        <div>
                          <MenuBody {...props} />
                        </div>                 
                      : <div/>
                    }
                  </header>

                  <main sx={{width: "100%"}}>
                    <Body {...props} />
                  </main>
                </Box>
              </Flex>

            </ContextProvider>

        </div>

      </div>


    </div>
  );
});

// ----------------------------------------------------------------------------

