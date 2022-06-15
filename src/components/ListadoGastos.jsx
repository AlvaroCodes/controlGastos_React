import React from 'react'
import Gasto from './Gasto'

const ListadoGastos = ({filtro, gastosFiltro, gastos, setGastoEditar, eliminarGasto}) => {
  return (
    <div className='listado-gastos contenedor'>
     

        {
          filtro ? (
            <>
            <h2>{gastosFiltro.length ? 'Gastos' : 'No hay Gastos aun'}</h2>
            {gastosFiltro.map( gasto => { return(
              <Gasto eliminarGasto={eliminarGasto} setGastoEditar={setGastoEditar} key={gasto.id} gasto={gasto} />
          
          )})}
          </>
          ) : (
            <>
               <h2>{gastos.length ? 'Gastos' : 'No hay Gastos aun'}</h2>
              { gastos.map( gasto => { return(
              <Gasto eliminarGasto={eliminarGasto} setGastoEditar={setGastoEditar} key={gasto.id} gasto={gasto} />
          )})}
            </>
           
          )
        }

    </div>
  )
}

export default ListadoGastos