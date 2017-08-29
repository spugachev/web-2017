export EMCC_DEBUG=0

app.js: main.c
	emcc -s WASM=1 -s ONLY_MY_CODE=1 -s EXPORTED_FUNCTIONS="['_fib']" -o app.js *.c

clean:
	rm *.js *.wasm