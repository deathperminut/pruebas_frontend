import React from 'react'
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from 'react-router-dom';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { TiPlusOutline } from "react-icons/ti";
import './Main.css'
import icono from '../../img/apple-icon.png'
import { getFiles, uploadFile } from '../../services/services';
import Swal from 'sweetalert2';
import Preloader from '../../Components/Loading/Loading';

export default function Main() {

    

    const navigate=useNavigate();


    const seeDropDown=()=>{
        document.getElementById('nav-dropdown-dark-example').click();
      }
    
      const  Lobby=()=>{
        navigate('/Lobby')
      }
    
      const  LogOut=()=>{
        navigate('/Login')
      }
      
      const inputFileRef = React.useRef(null);
      const handleFileButtonClick = () => {
        inputFileRef.current.click();
      };
    
      const handleFileChange = async(event) => {
        const file = event.target.files[0];

        const name_FILE = file['name']
        
        // LLAMAMOS AL SERVICIO PARA GUARDAR EN BASE DE DATOS
        let result = undefined;
        setPreloader(true);
        result =  await uploadFile(file,name_FILE).catch((error)=>{
            setPreloader(false);
            console.log(error);
            Swal.fire({
                icon: 'info',
                title: 'Problemas al guardar el archivo'
            });
        })

        if(result){
            setPreloader(false);
            console.log(result.data);
            loadFiles()
        }
        
        // Aquí puedes manejar el archivo seleccionado, como enviarlo a un servidor, etc.
      };

      // USE EFFECTS

      React.useEffect(()=>{
        // LOAD FILES
        loadFiles()
      },[])
      let [preloader,setPreloader] = React.useState(false)
      let [files,setFiles] = React.useState([])
      const loadFiles=async()=>{

        let result = undefined;
        setPreloader(true);
        result = await getFiles().catch((error)=>{
            console.log(error);
            setPreloader(false);
            Swal.fire({
                icon: 'info',
                title: 'Problemas al cargar datos'
            });
        })

        if(result){
            setPreloader(false);
            console.log(result.data);
            Swal.fire({
                icon: 'success',
                title: 'Información cargada correctamente'
            });
            setFiles(result.data)
        }

        

      }

  return (
    <div className='Body_3'>
          {
          preloader ?
          <Preloader></Preloader>
          :

          <></>
          }
          <div className='Navbar'>
              <div className='iconContainer_2'>
                <img src={icono} width={66} height={66}></img>
              </div>
              <div onClick={seeDropDown} className='nameContainer dropdown-toggle d-flex flex-row justify-content-center align-items-center align-self-center'>
                  <span className='nameNavbar font_medium'>
                  Juan Sebastian Mendez
                  </span>
                  <NavDropdown
                    id="nav-dropdown-dark-example"
                    title=""
                    menuVariant="dark"
                  >
                    <NavDropdown.Item onClick={LogOut}>Cerrar Sesión</NavDropdown.Item>
                    
                  </NavDropdown>
              </div>
          </div>
          <div className='BodyKanban '>
              <div className='AppendKanbaContainer'>
                      <p className='titleKanban font_medium'>Sube un archivo para hacer la prueba</p>
              </div>
              <div className='KanbaButtonContainer'>
                      <div onClick={handleFileButtonClick} className='ButtonElement_kanba'>
                              <span className='ButtonText'>Agregar archivo</span>
                              <input
                                    type='file'
                                    ref={inputFileRef}
                                    style={{ display: 'none' }}
                                    onChange={handleFileChange}
                                />
                      </div>
              </div>
              <div className='KanbaContainer '>
                        <div className='KanbaContainer_2'>
                        {files.length!== 0 ? 
                            <table className='table table-sm table-striped table-no-border- align-middle'>
                            <thead>
                                <tr>
                                <th scope="col" className='th-width-md-'>
                                    <div className='d-flex flex-row justify-content-center align-items-center align-self-center w-100'>
                                    <span className='fs-6- ff-monse-regular- fw-bold tx-dark-purple-'>Nombre</span>
                                    </div>
                                </th>
                                <th scope="col" className='th-width-sm-'>
                                    <div className='d-flex flex-row justify-content-center align-items-center align-self-center w-100'>
                                    <span className='fs-6- ff-monse-regular- fw-bold tx-dark-purple-'>Enlace</span>
                                    </div>
                                </th>
                                </tr>
                            </thead>
                            <tbody>
                                {files?.map((obj,index)=>{

                                return(
                                <tr key={index}>
                                    <td 
                                    className='align-middle'>
                                        <p className='delete m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center' >{obj.Nombre}</p>
                                    </td>
                                    <td 
                                    className='align-middle'>
                                        <p className='delete m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center' >{obj.Link}</p>
                                    </td>
                                </tr>
                                )

                                })}
                                
                            </tbody>
                        </table>  
                        :
                        <></>
                        }
                        
                        </div>
                        
              </div>
          </div>  
    </div> 
  )
}
