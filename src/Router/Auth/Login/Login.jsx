import React from 'react'
import './Login.css'
import Fondo from '../../../img/Fondo_6.jpg'
import { useNavigate } from 'react-router-dom'
import logo from '../../../img/apple-icon.png'
import { loginDrive } from '../../../services/services'
import Swal from 'sweetalert2'
import Preloader from '../../../Components/Loading/Loading'

export default function Login() {

    /* use states */

    let [preloader,setPreloader]  = React.useState(false);
    
    /* NAVIGATE */
    const navigate=useNavigate();

    const start = async() =>{

        let result =  undefined
        setPreloader(true);
        result =  await loginDrive().catch((error)=>{
            console.log(error);
            setPreloader(false)
            Swal.fire({
                icon: 'info',
                title: 'Problemas al realizar la validación'
            });
        })

        if(result){
            console.log("EXITOS: ",result.data)
            setPreloader(false)
            if(result.data.status == 'Sesión iniciada correctamente'){
                Swal.fire({
                    icon: 'success',
                    title: 'Validación realizada con éxito'
                }).then(result => {
                    if (result.isConfirmed) {
                        navigate('/Main')
                    }})
                
            }else{
                Swal.fire({
                    icon: 'info',
                    title: 'Problemas al realizar la validación'
                })
            }
        }

    }
    
    

    return (
    <div className='Body'>
        {
          preloader ?
          <Preloader></Preloader>
          :

          <></>
        }
        <div className='formContainer'>
          <form className='Form'>
              <div className='iconContainer'>
                <img src={logo} width={70} height={70}/>
              </div>
              <p className='TitleLogin'>Digita tus credenciales para continuar</p>
              <div className='inputContainer'>
                  <div className='form-floating inner-addon- left-addon-'>
                          <input type="text" className='form-control' id='user' placeholder="Usuario" />
                          <label className='fs-5- ff-monse-regular-'>Usuario</label>
                          {/* <i className='fa F fs-xs'></i> */}
                  </div>
              </div>
              <div className='inputContainer'>
                  <div className='form-floating inner-addon- left-addon-'>
                          <input type="password" className='form-control' id='user' placeholder="Contraseña" />
                          <label className='fs-5- ff-monse-regular-'>Contraseña</label>
                          {/* <i className='fa F fs-xs'></i> */}
                  </div>
              </div>
              <div className='ButtonElement'>
                      <span onClick={start} className='ButtonText'>Inicia sesión</span>
              </div>
              <span  className='textLogin'>Cambiar contraseña</span>
              <span  className='textLogin'>Recuperar contraseña</span>
          </form>
        </div>
    </div>
    )
}
