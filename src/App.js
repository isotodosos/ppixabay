import React, {useState, useEffect} from 'react';
import Formulario from './components/Formulario';
import ListadoImagenes from './components/ListadoImagenes';


function App() {
  
  const [busqueda, guardarBusqueda] = useState('');
  const [imagenes, guardarImagenes] = useState([]);
  const [paginaactual, guardarPaginaActual] = useState(1);
  const [totalpaginas, guardarTotalPaginas] = useState(1);
  

  useEffect(()=>{

    

    const consultarApi = async () => {

      if(busqueda === ''){return null}

      const resultadoPorPagina = 30;
      const key = '19634765-1789955c5ae23bfccd07bae5a';
      const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${resultadoPorPagina}&page=${paginaactual}`;//como per_page en las apis te avisan de los endpointque puedes colocar
      const  respuesta= await fetch(url);
      const resultado = await respuesta.json();
      guardarImagenes(resultado.hits);

      //calcular el total de páginas
      const calcularTotalPaginas = Math.ceil(resultado.totalHits / resultadoPorPagina);// con Math.ceil() redondeas hacia arriba y .floor hacia abajo
      guardarTotalPaginas(calcularTotalPaginas)

      //mover la pantalla hacia arriba suavemente
      const jumbotron = document.querySelector('.jumbotron');
      jumbotron.scrollIntoView({ behavior: 'smooth'});
    }

    consultarApi();

  },[busqueda, paginaactual]);//como dependencia busqueda &image_type=photo&pretty=true

  //definir la pagina anterior
  const paginaAnterior = () => {
    const nuevaPaginaActual = paginaactual - 1;

    if(nuevaPaginaActual === 0)return ;
  
    guardarPaginaActual(nuevaPaginaActual);
    
    
  }

   //definir la pagina siguiente
   const paginaSiguiente = () => {
    const nuevaPaginaActual = paginaactual + 1;

    if(nuevaPaginaActual > totalpaginas)return ;

    guardarPaginaActual(nuevaPaginaActual);
    
    
  }
  
  
  return (
    <div className='container'>

      <div className='jumbotron'>
        <p className='lead text-center'>Buscador de Imágenes</p>
        <Formulario
          guardarBusqueda={guardarBusqueda}
        />
      </div>

      <div className="row justify-content-center">
        <ListadoImagenes
          imagenes={imagenes}
        />
        
        {(paginaactual ===1) ? null :
          <button
          type="button"
          className="btn btn-info mr-1"
          onClick= {paginaAnterior}
        > &laquo; Anterior</button>
        }
        
        {(paginaactual ===totalpaginas) ? null :
          <button
          type="button"
          className="btn btn-info"
          onClick= {paginaSiguiente}
        >Siguiente &raquo;</button>
        }

        

      </div>


    </div>
  );
}

export default App;
