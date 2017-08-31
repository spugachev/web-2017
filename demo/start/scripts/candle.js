const lnkCandle = document.getElementById('lnkCandle');
lnkCandle.addEventListener('click', manageCandle);

let encoder = new TextEncoder('utf-8');
let decoder = new TextDecoder('utf-8');
const CANDLE_SERVICE_UUID = 0xFF02;
const CANDLE_DEVICE_NAME_UUID = 0xFFFF;
const CANDLE_COLOR_UUID = 0xFFFC;
const CANDLE_EFFECT_UUID = 0xFFFB;
const CANDLE_BLOW_NOTIFICATIONS_UUID = 0x2A37;

async function manageCandle(){
  let options = {filters:
    [{
        services:[ CANDLE_SERVICE_UUID ]
    }],
    optionalServices: ['battery_service']};

  const device = await navigator.bluetooth.requestDevice(options);
  const server = await device.gatt.connect();
  const service = await server.getPrimaryService(CANDLE_SERVICE_UUID);
  const effectChar = await service.getCharacteristic(CANDLE_EFFECT_UUID);
  const colorChar = await service.getCharacteristic(CANDLE_COLOR_UUID);

  console.log(device);

  let r = 254;
  let g = 0;
  let b = 0;

  let data = [0x00, r, g, b, 0x05, 0x00, 0x01, 0x00];
  await effectChar.writeValue(new Uint8Array(data));

  setInterval(async ()=>{
    data = [0x00, r, g, b];
    await colorChar.writeValue(new Uint8Array(data));

    r -= 5;
    g += 5;
  }, 100)
}