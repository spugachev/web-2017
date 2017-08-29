# Web Assembly

### WebAssembly Explorer

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
$ xxd app.wasm
```

### index.html

```bash
$ npm install -g serve
$ serve 
```

### ECMAScript 2017