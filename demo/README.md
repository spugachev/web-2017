# Links

* [Awesome Wasm](https://github.com/mbasso/awesome-wasm)
* [Introduction to WebAssembly](https://rsms.me/wasm-intro)
* [WebAssembly Explorer](https://mbebenita.github.io/WasmExplorer/)
* [Wasm Fiddle](https://wasdk.github.io/WasmFiddle/)
* [Wasm Intro](https://github.com/guybedford/wasm-intro)
* [Spinning Cube](https://github.com/callahad/spinning-cube)

# Demo

## 1. WebAssembly Explorer
* Address: [https://mbebenita.github.io/WasmExplorer/]() 
* Saved: [https://goo.gl/KAVoaV]()

### calc.c
```c
unsigned int half(unsigned int num){
    return num/2;
}
  
int calc(int x){
    return 3 + (x*4);
}
```

```
5:   00000101
5*4: 00010100
3:   00000011
```

```bash
$ xxd calc.wasm
```

```bash
$ npm install -g serve
$ serve 
```

## 2. ECMAScript 2017
Async/Await, Classes, Template Literals, Destructuring etc.

## 3. Fibbonachi
## 4. Spinning Cube

```bash
source ~/dev/emsdk-portable/emsdk_env.sh
make native
make wasm
```
## 5. Progressive Web Apps
* [chrome://flags#enable-improved-a2hs]()
* [https://devfest-e762d.firebaseapp.com]()