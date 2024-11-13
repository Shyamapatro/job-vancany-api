import log4js from "log4js"

var logger = log4js.getLogger();
logger.level = "debug";


const debug = (message) =>{
    logger.debug(message);
}
const info = (message) =>{
    logger.info(message);
}
const warn = (message) =>{
    logger.warn(message);
}
const error = (message) =>{
    logger.error(message);
}


export { 
    debug,info,warn,error
};