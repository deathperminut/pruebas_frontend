import axios from "axios"
import { environment } from "../environments/environments"



const loginDrive=async()=>{
    let path = environment.api+environment.login_drive

    return await axios.get(path)
}

const getFiles=async()=>{
    let path = environment.api+environment.getFiles
    return await axios.get(path)
}

const uploadFile=async(File,name)=>{

    let path = environment.api+environment.uploadFiles
    let body = new FormData()
    body.append('file',File)
    body.append('name',name)
    return await axios.post(path,body)
}



export {loginDrive,uploadFile,getFiles}