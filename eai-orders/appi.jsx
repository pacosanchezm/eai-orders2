import React, { useState, useEffect, useContext, createContext, Suspense } from "react"
import axios from "axios"


// ---------- styles
  /** @jsx jsx */ 
  import { ThemeProvider, jsx, Styled, useThemeUI } from "theme-ui"
  import { Grid, Flex, Box, Button, Text, Image, Spinner, Input } from "@theme-ui/components"
  import Theme from "./theme"
  import "@babel/polyfill"

  import moment from "moment"

  import { useMediaQuery } from 'react-responsive'

  // import Dropbox from "react-select"
  // import DropboxCss from "./select"

  import {MuiPickersUtilsProvider,DatePicker} from '@material-ui/pickers'
  import MomentUtils from '@date-io/moment'

  import Pusher from 'pusher-js';


// ------------------
  import usedata from "./usedata"
  import Head from "./head"
  import Menu from "./menu"
  import Regs from "./regs"

  import SideBar from "./sidebar";
  import "./styles.css";




// -------------------------------------------








  var pusher = new Pusher('bef17b566c9f80236bf8', {
    cluster: 'us2'
  });


  var channel = pusher.subscribe('cs1');








  let server = "https://sushifactory.app"


  let App;
  const StateContext = createContext();



  











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

    Images: {
      Logo1: useState(useContext(createContext({src: "https://smxai.net/sf/sflogo1.jpg"}))),
      Logo2: useState(useContext(createContext({src: "https://smxai.net/sf/sflogo2.jpg"}))),
      Flechad: useState(useContext(createContext({src: "https://smxai.net/sf/cs1/arrowd1.png"}))),
      Flechau: useState(useContext(createContext({src: "https://smxai.net/sf/cs1/arrowu1.png"}))),
      Ayuda: useState(useContext(createContext({src: "https://smxai.net/sf/cs1/ayuda.jpg"}))),
      Icon1: useState(useContext(createContext({src: "https://smxai.net/sf/cs1/avatar.jpg"}))),
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
    
    Empresa: useState(useContext(createContext(1))),
    Sucursal: useState(useContext(createContext({value: 6}))),
    Registros: useState(useContext(createContext([]))),
    FiltroFecha: useState(useContext(createContext(new Date()))),

    User: {
      Id: useState(useContext(createContext({UserName: ""}))),
      Name: useState(useContext(createContext(""))),
      Sucursal: useState(useContext(createContext(99))),
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
  const [UserId, setUserId] = useContext(StateContext).User.Id
  const [UserName, setUserName] = useContext(StateContext).User.Name
  const [Sucursal, setSucursal] = useContext(StateContext).User.Sucursal

  const [FiltroFecha, setFiltroFecha] = useContext(StateContext).FiltroFecha

    // ---------------------
  

    

    return {

      getUser : async (props) => {
        try {
          const res = await axios.get(server + '/logindata')
          setUserId(res.data.miid)
          setUserName(res.data.miuser)
          setSucursal(res.data.misucursal)
          return res.data
        } catch (e) { console.error(e) }
      },
  
      getRegs : async (e) => {
        try {

        setLoadingDataMain(true)

          setRegistros(await useData.Pedidos().getLista({
            Sucursal: e.misucursal ? e.misucursal : Number(Sucursal),
            Ano: Number(moment(FiltroFecha).format("YYYY")),
            Mes: Number(moment(FiltroFecha).format("MM")),
            Dia: Number(moment(FiltroFecha).format("DD")),
          }))

        setLoadingDataMain(false)

    
        } catch (e) { console.error(e) }
      },






      Loader : async function (props) {

       let miuser = await this.getUser()
        this.getRegs(miuser)

         setSucursal(6)  // -- para usar fuera de dev

        console.log(Notification.permission);

         // let avisos = await Notification.requestPermission()
          Notification.requestPermission().then(permission => {
            console.log(permission);
          })

      },





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

      









      


      sumPagado: Registros.reduce((a, b) => a + Number((b.Pagado)), 0),


    }
  }
  
// -----------------------------------------------------------------------------




const HeaderBody = props => {
  const usestatus = new useStatus(StateContext)
  const useacciones = new useAcciones(StateContext)

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
  const Estilo = useThemeUI().theme.styles

  const usestatus = new useStatus(StateContext)
  const useacciones = new useAcciones(StateContext)
  const [FiltroFecha, setFiltroFecha] = useContext(StateContext).FiltroFecha
  const [Sucursal, setSucursal] = useContext(StateContext).User.Sucursal


// ------------




 useEffect(() => { useacciones.Loader(props) }, [])

 useEffect(() => { useacciones.getRegs(props) }, [FiltroFecha])

// useEffect(() => { useacciones.LoaderCat(PedidoData) }, [PedidoData.Id])

// useEffect(() => { if(ExtendCuenta){useacciones.LoaderCuenta()}}, [ExtendCuenta]);

useEffect(() => { 

  channel.unbind('pedido');



  channel.bind('pedido', function(data) {
    console.log(data)


    if(data.sucursal === Sucursal) {
    //  if(data.accion === "confirma") { alert("Confirmación recibida - Pedido: " + data.pedido) }
      if(data.accion === "confirma") { 
        let Aviso = new Notification(
            "Pedido Confirmado",
            {
              body: "Se ha confirmado el pedido: " + data.pedido ,
            },
          )
      }


     // if(data.accion === "pagado") { alert("Pago recibido - Pedido: " + data.pedido) }
     if(data.accion === "pagado") { 
      let Aviso = new Notification(
          "Pedido Pagado",
          {
            body: "Se ha recibido el pago del pedido: " + data.pedido ,
          },
        )
    }

      if(data.accion === "notifica") { 
        let Aviso = new Notification(
            "Nueva Notificacion",
            {
              body: "Se ha recibido notificación ",
              tag: "request",
              // requireInteraction: true,
              // "actions": [
              //   { "action": "Ok", "title": "Ok"},
              // ]
            },
          )
       }


    }
  });


 }, [Sucursal])

// ------------

try {

  return (

    <div>

      <Flex bg="WhiteSmoke" sx={{width: "100%" }}>
      <Flex sx={{width: "100%" }}>
        <Box sx={{ width: "100%" }}>


          <header>
            <Flex bg="WhiteSmoke" sx={{width: "100%" }}>

              <Box sx={{ width: "30%" }}>
                <MuiPickersUtilsProvider utils={MomentUtils}>
                  <DatePicker
                    autoOk
                    variant="inline"
                    clearable
                    //disableFuture
                    //label="Basic example"
                    value={FiltroFecha}
                    onChange={setFiltroFecha}
                  />
                </MuiPickersUtilsProvider>
              </Box>

              <Box sx={{ width: "50%" }}/>

              <Box sx={{ width: "20%" }}>
                <Button
                  sx={{ height: "25px", width: "100%" }}
                  bg={"lightgrey"}
                  Disabled={false}
                  onClick={() => { useacciones.getRegs(props) }}
                >
                  <Text sx={Estilo.h2}>Actualizar</Text>
                </Button>
              </Box>

            </Flex>

          </header>


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


const Pie = props => {
  const Estilo = useThemeUI().theme.styles;
  // const { getRegistros, getDetalle } = useData();

  const useacciones = new useAcciones(StateContext)




  try {
    return (
      <div>
        <Flex
        
        sx={{
          p: 3,
          bg: "gray",
          fontWeight: "normal",
          fontSize: 3,
          color: "#FFFFFF",
          fontFamily: "body",
          width: "100%"
        }}
        
        
        
        >



            <Box sx={{ width: "80%" }}>
            </Box>

            <Box sx={{ width: "20%" }}>
              {useacciones.sumPagado}
            </Box>




        </Flex>

        <Flex>
          <Box sx={{ width: "100%" }}>
            <Text sx={Estilo.h2}>
              ** Si tienes dudas manda un Whatsapp al: 4772740011
            </Text>
          </Box>
        </Flex>
      </div>
    );
  } catch (e) {
    console.error(e);
  }
};




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


                  <footer sx={{width: "100%"}}>
                    <div
                      sx={{
                        display: "block",
                        padding: "10px",
                        height: "60px",
                        width: "100%"
                      }}
                    />

                    <div
                      style={{
                        backgroundColor: "white",
                        fontSize: "20px",
                        color: "white",
                        borderTop: "1px solid #E7E7E7",
                        textAlign: "left",
                        padding: "0px",
                        position: "fixed",
                        left: "0",
                        bottom: "0",
                        height: "80px",
                        width: "100%"
                      }}
                    >
                      <Pie {...props} />
                    </div>
                  </footer>






                </Box>
              </Flex>

            </ContextProvider>

        </div>

      </div>


    </div>
  );
});

// ----------------------------------------------------------------------------

