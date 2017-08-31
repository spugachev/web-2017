export class WasmHelper {
    async loadWasm(fileName){
        const res = await fetch(`/wasm/${fileName}.wasm`);
        const bytes = await res.arrayBuffer();
        const module = await WebAssembly.compile(bytes);
        const instance = await WebAssembly.instantiate(module);
        return {instance, module}; 
    } 
}
