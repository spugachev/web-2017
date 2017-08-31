export EMCC_DEBUG=0

fib.js: fib.c
	emcc -s WASM=1 -s ONLY_MY_CODE=1 -s EXPORTED_FUNCTIONS="['_fib']" -o fib.js *.c

clean:
	rm *.js *.wasm