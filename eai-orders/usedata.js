import axios from "axios"

// ------------------------------------------------------------

 // let graphqlserver = "https://8t8jt.sse.codesandbox.io/gql"
   let graphqlserver = "https://smxai.net/graphqleai2"

let usedata = function(StateContextM) {

  return {

    Clientes: function() {
      return {
        get: async function(e) {
         
          var axdata = await axios({
            url: graphqlserver,
            method: "post",
            data: {
              query: `
                query getClientes($Query: ClienteInput) {
                  Clientes {
                    Consultas {
                      Query(Query: $Query) {
                        Id
                        Empresa
                        Telefono
                        Nombre
                      }
                    }
                  }
                }
               `,
              variables: {
                Query: {
                  Telefono: e.Telefono,
                  Empresa: e.Empresa
                }
              }
            }
          });
    
          let axdataRes = axdata.data.data.Clientes.Consultas.Query;

          if (axdataRes) {return axdataRes} else {return []}
        },

        getId: async function(e) {
         
          var axdata = await axios({
            url: graphqlserver,
            method: "post",
            data: {
              query: `
                query getClientes($Query: ClienteInput) {
                  Clientes {
                    Consultas {
                      Query(Query: $Query) {
                        Id
                        Empresa
                        Telefono
                        Nombre
                        ApellidoPat
                        Genero
                        Nacimiento
                        Email
                        Obv
                      }
                    }
                  }
                }
               `,
              variables: {
                Query: {
                  Id: e.Id,
                }
              }
            }
          });
    
          let axdataRes = axdata.data.data.Clientes.Consultas.Query;

          if (axdataRes) {return axdataRes} else {return []}
        },


      }
    },





    Pedidos: function() {

      return {

        getLista : async function(e) {
          var axdata = await axios({
            url: graphqlserver,
            method: "post",
            data: {
              query: `
                query pedidos ($Query: PedidoInput){
                  Pedidos{
                    Consultas{
                      PedidoCom(Query: $Query){
                        Id,
                        Codigo,
                        Dia,
                        Mes,
                        Ano,
                        Sucursal,
                        Cliente,
                        Telefono,
                        Nombre,
                        Apellido,
                        Comanda,
                        Cuenta,
                        Fecha,
                        TipoEntrega,
                        Monto,
                        Pagado,
                        Confirmado,
                        Atendido,
                        Enviado,
                        Entregado,
                        Usuario,
                        Obv
                      }
                    }
                  }
                }
              `,
              variables: {
                Query: { 
                    Sucursal: e.Sucursal,
                    Ano: Number(e.Ano),
                    Mes: Number(e.Mes),
                    Dia: Number(e.Dia),
                }
              }
            }
          });
        
          let axdataRes = axdata.data.data.Pedidos.Consultas.PedidoCom
          //console.log(axdataRes);
          if (axdataRes) {return axdataRes} else {return []}

        },



      };
    }, // ------- Pedidos














  }

}


export default usedata