(function(){
    function loadWasm(fileName){
        return fetch('/wasm/' + fileName + '.wasm').
        then(function (res) {
            return res.arrayBuffer();
        }).then(function(bytes) {
            return WebAssembly.compile(bytes);
        }).then(function(module) {
            return WebAssembly.instantiate(module);
        });     
    }

    loadWasm('calc').then(function(instance){
        window.half = instance.exports.half;    
        console.log('half:', half(123456)); 
    });              
})();