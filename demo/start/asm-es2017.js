import { WasmHelper } from './asm-utils.js';

(async function(){
    const helper = new WasmHelper();
    const {instance, module}  = await helper.loadWasm('calc');   
    window.half = instance.exports.half;              
    console.log('half:', half(123456));     
})();