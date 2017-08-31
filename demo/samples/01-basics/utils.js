export class WashHelper {
    async loadWasm(fileName){
        const res = await fetch(`/${fileName}.wasm`);
        const bytes = await res.arrayBuffer();
        const module = await WebAssembly.compile(bytes);
        const instance = await WebAssembly.instantiate(module);
        return {instance, module}; 
    } 
}
