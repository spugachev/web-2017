import { WasmHelper } from './asm-utils.js';

(async function(){
    const helper = new WasmHelper();
    const {instance, module}  = await helper.loadWasm('calc');   
    window.half = instance.exports.half;              
    console.log('half es2017:', half(123456));     
})();