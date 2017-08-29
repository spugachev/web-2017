// https://goo.gl/KAVoaV

/*
5:   00000101
5*4: 00010100
3:   00000011
*/

unsigned int half(unsigned int num){
    return num/2;
}
  
int calc(int x){
    return 3 + (x*4);
}

/*
(module
  (table 0 anyfunc)
  (memory $0 1)
  (export "memory" (memory $0))
  (export "half" (func $half))
  (export "calc" (func $calc))
  (func $half (param $0 i32) (result i32)
    (i32.shr_u
      (get_local $0)
      (i32.const 1)
    )
  )
  (func $calc (param $0 i32) (result i32)
    (i32.or
      (i32.shl
        (get_local $0)
        (i32.const 2)
      )
      (i32.const 3)
    )
  )
)
*/