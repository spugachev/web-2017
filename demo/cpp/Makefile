export EMCC_DEBUG=0

main.js: main.cpp
	emcc -s WASM=1 --bind -std=c++11 -o main.js *.cpp

clean:
	rm *.js *.wasm