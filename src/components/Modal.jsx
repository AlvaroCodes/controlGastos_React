
import { useState, useEffect} from 'react';
import Mensaje from './Mensaje'
import CerrarBtn from '../img/cerrar.svg';

const Modal = ({setGastoEditar, setModal, animarModal, setAnimarModal, guardarGasto, gastoEditar}) => {

  const [mensaje, setMensaje] = useState ('');

  const [nombre, setNombre] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [categoria, setCategoria] = useState('');
  const [fecha, setFecha] = useState('');
  const [id, setId] = useState('');

  useEffect(() => {
    if(Object.keys(gastoEditar).length > 0){
      setNombre(gastoEditar.nombre);
      setCantidad(gastoEditar.cantidad);
      setCategoria(gastoEditar.categoria);
      setId(gastoEditar.id);
      setFecha(gastoEditar.fecha);
    }
  }, [])
  

    const ocultarModal = () => {
       
        setAnimarModal(false);
        setGastoEditar({});
        setTimeout(() => {
            setModal(false);
          }, 500)
    }

    const handleSubmit = (e) => {
      e.preventDefault();

      if([nombre, cantidad, categoria].includes('')){
        console.log('Fallo la validacion');
        setMensaje('Todos los campos son obligatorios');
        setTimeout(()=> {
          setMensaje('');
        }, 3000)
        return
      }

      guardarGasto({nombre, cantidad, categoria, id, fecha});
    }
  return (
    <div className="modal">
        <div className="cerrar-modal">
            <img 
            onClick={ocultarModal}
            src={CerrarBtn} alt="Cerrar modal" />
        </div>

        <form 
        onSubmit={handleSubmit}
        className={`formulario ${animarModal ? 'animar' : 'cerrar'}`}>
            <legend>{gastoEditar.nombre ? 'Editar Gato' : 'Nuevo Gasto'}</legend>
            {mensaje && <Mensaje tipo={'error'}>{mensaje}</Mensaje>}

            <div className='campo'>
              <label htmlFor='nombre'>Nombre Gsto</label>
              <input onChange={ e=> setNombre(e.target.value)} value={nombre} type="text" id='nombre' placeholder='Añade el Nombre del Gasto'/>
            </div>

            <div className='campo'>
              <label htmlFor='cantidad'> Cantidad</label>
              <input type="number" onChange={ e=> setCantidad(Number(e.target.value))} value={cantidad} id='cantidad' placeholder='Añade la cantidad del gato: ej. 100'/>

            </div>

            <div className='campo'>
              <label htmlFor='categoria'> Categoria </label>
            <select onChange={ e=> setCategoria(e.target.value)} value={categoria} id='categoria'>
              <option value=""> -- Seleccione --</option>
              <option value="ahorro"> Ahorro </option>
              <option value="comida"> Comida </option>
              <option value="casa"> Casa </option>
              <option value="gastos"> Gastos varios </option>
              <option value="ocio"> Ocio </option>
              <option value="salud"> salud </option>
              <option value="suscripciones"> suscripciones </option>
            </select>

            </div>
            
            <input type="submit" value={gastoEditar.nombre ? 'Guardar Gastos' : 'Anadir Gastos'}/>

        </form>
    </div>
  )
}

export default Modal