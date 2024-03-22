import { configuraciones } from "../appConfig";

let server = configuraciones.server;

export const environment = {
    production:false,
    // API
    api:server,

    // SERVICIOS

    login_drive:'login',
    getFiles:'getFiles',
    uploadFiles:'uploadFiles'
}