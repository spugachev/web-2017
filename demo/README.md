# Demo

## 1. WebAssembly Explorer
* Address: [https://mbebenita.github.io/WasmExplorer/](https://mbebenita.github.io/WasmExplorer/) 
* Saved: [https://goo.gl/KAVoaV](https://goo.gl/KAVoaV)

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

```bash
source ~/dev/emsdk-portable/emsdk_env.sh
```
[First 300 fib](http://www.maths.surrey.ac.uk/hosted-sites/R.Knott/Fibonacci/fibtable.html)

## 4. Spinning Cube

```bash
make native
make wasm
```

## 5. Run on Android

## 6. Progressive Web Apps
* [chrome://flags#enable-improved-a2hs](chrome://flags#enable-improved-a2hs)
* [https://devfest-e762d.firebaseapp.com](https://devfest-e762d.firebaseapp.com)

## 7. Users
## 8. Payment
## 9. Candle

```bash
docker run --rm -it -v $(pwd):/data spugachev/wasm make wasm
```