(async function(){
	async function loadWasm(fileName){
		const res = await fetch(`/wasm/{fileName}.wasm`);
		const bytes = await res.arrayBuffer();
        const module = await WebAssembly.compile(bytes);
        
        const memory = new WebAssembly.Memory({initial: 256, maximum: 256});
		const instance = await WebAssembly.instantiate(module, {
            env: {
                '_notify': function(offset){
                    const strBuf = new Uint8Array(memory.buffer, offset, 256);
                    const str = new TextDecoder().decode(strBuf);
                    console.log(str);       
                },
                'abortStackOverflow': _ => { throw new Error('overflow'); },
                'table': new WebAssembly.Table({initial: 0, maximum: 0, element: 'anyfunc'}),
                'tableBase': 0,
                'memory': memory,
                'memoryBase': 1024,
                'STACKTOP': 0,
                'STACK_MAX': memory.buffer.byteLength,
            },
        });

        return {instance, module, memory};
	}

    const {instance, memory} = await loadWasm('fib');	  
    
    const offset = instance.exports._fib();		
    const arr = new Uint32Array(memory.buffer, offset, 10);
    console.dir(arr);

    let i = 0;
    for(const item of arr){
        console.log(`fib(${i++}):`, item);
    }       
})(); 