import { useState, useEffect } from 'react'
import Header from './components/Header'
import ListadoGastos from './components/ListadoGastos';
import Modal from './components/Modal';
import { generarID } from './helpers';
import IconoNuevoGasto from './img/nuevo-gasto.svg'

import Filtros from './components/Filtros';


function App() {

  const [presupuesto, setPresupuesto] = useState( Number(localStorage.getItem('presupuesto')) ?? 0);
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);

  const [modal, setModal] = useState(false)
  const [animarModal, setAnimarModal] = useState(false);

  const [gastos, setGastos] = useState(
    localStorage.getItem('gastos') ? JSON.parse( localStorage.getItem('gastos')): []
  );

  const [gastoEditar, setGastoEditar] = useState({});

  const [filtro , setFiltro] = useState('');
  const [gastosFiltro , setGastosFiltro] = useState([]);

  useEffect(() => {
    if( Object.keys(gastoEditar).length > 0 ) {
      setModal(true)

      setTimeout(() => {
          setAnimarModal(true)
      }, 500);
  }
  }, [gastoEditar])

  useEffect(() => {
      localStorage.setItem('presupuesto', presupuesto ?? 0);
  }, [presupuesto])

  useEffect(()=>{
    localStorage.setItem('gastos', JSON.stringify(gastos) ?? []);
  }, [gastos])

  useEffect(()=> {
      if(filtro){
        const gastosFiltrados = gastos.filter(gasto => gasto.categoria === filtro);
        setGastosFiltro(gastosFiltrados);
      }
  }, [filtro])

  useEffect(()=> {
    const presupuestoLS = Number(localStorage.getItem('presupuesto')) ?? 0;
    
    if(presupuestoLS > 0){
      setIsValidPresupuesto(true); 
    }
  }, [])
  
  

 const handleNuevoGasto = () => {
 
    setModal(true);
    setGastoEditar({});

    setTimeout(() => {
      setAnimarModal(true);
    }, 500)
 }



 const guardarGasto = (gasto) => {

  if(gasto.id){
    const gastosActualizados = gastos.map( gastoState => gastoState.id  === gasto.id ? gasto : gastoState) 
    setGastos(gastosActualizados);
  }else {
    gasto.id = generarID();
    gasto.fecha = Date.now();
    setGastos([...gastos, gasto]);
    setGastoEditar({});
  }

  setAnimarModal(true);
  setTimeout(() => {
    setModal(false);
  }, 500)

 }

 const eliminarGasto = ( id ) => {
  const gastosActualizados = gastos.filter( gasto => gasto.id !==id );
  setGastos(gastosActualizados);
}

  return (
    <div className={modal ? 'fijar' : ''}>
      <Header 
      gastos={gastos}
      setGastos={setGastos}
      presupuesto={presupuesto}
      setPresupuesto={setPresupuesto}
      isValidPresupuesto={isValidPresupuesto}
      setIsValidPresupuesto={setIsValidPresupuesto}
      />

      {isValidPresupuesto && (
        <>
        <main>
          <Filtros filtro={filtro} setFiltro={setFiltro}/>
          <ListadoGastos gastosFiltro={gastosFiltro} filtro={filtro} eliminarGasto={eliminarGasto} setGastoEditar={setGastoEditar} gastos={gastos}/>
        </main>
        <div className='nuevo-gasto'>
          <img 
          onClick={handleNuevoGasto}
          src={IconoNuevoGasto} alt="Nuevo Gasto" />
        </div>
        </>
      )}

      { modal && <Modal setGastoEditar={setGastoEditar} gastoEditar={gastoEditar} guardarGasto={guardarGasto} setModal={setModal} setAnimarModal={setAnimarModal} animarModal={animarModal}/>}
     
    </div>
   
  )
}

export default App
