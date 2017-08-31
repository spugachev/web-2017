int arr[100];

void notify(char* str);

int* fib(){
  notify("Hello from WASM");
  
  arr[0] = 0;
  arr[1] = 1;
  
  for(int i=2;i<=100;i++){
    arr[i] = arr[i-1] + arr[i-2];
  }
  
  return &arr[0];
}
