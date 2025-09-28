/***************
* Sample data: products
***************/
const PRODUCTS = [
{
id: 'p1',
name: 'กระเป๋าผ้า Minimal',
price: 290,
desc: 'กระเป๋าผ้าแบบเรียบ ทนทาน เหมาะกับการใช้งานทุกวัน',
img: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400"><rect width="100%" height="100%" fill="%23e8f3ff"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="26" fill="%230b79d0">Bag</text></svg>'
},
{
id: 'p2',
name: 'แก้วเก็บอุณหภูมิ 350ml',
price: 420,
desc: 'แก้วสุญญากาศ เก็บร้อน/เย็น นานหลายชั่วโมง',
img: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400"><rect width="100%" height="100%" fill="%23fff2e6"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="26" fill="%23ff7a00">Cup</text></svg>'
},
{
id: 'p3',
name: 'สมุดบันทึก A5',
price: 120,
desc: 'สมุดปกแข็ง กระดาษหนา 100 แกรม เขียนลื่น',
img: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400"><rect width="100%" height="100%" fill="%23f7f7f7"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="26" fill="%23444444">Notebook</text></svg>'
},
{
id: 'p4',
name: 'เสื้อยืด Cotton',
price: 350,
desc: 'ผ้าคอตตอน 100% ใส่สบาย สีไม่ตก',
img: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400"><rect width="100%" height="100%" fill="%23eefbe7"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="26" fill="%23097a33">T-Shirt</text></svg>'
}
];

/***************
* Utilities: cart management (stored in sessionStorage)
***************/
const CART_KEY = 'samplemart_cart_v1';

function loadCart() {
const raw = sessionStorage.getItem(CART_KEY);
if (!raw) return {};
try { return JSON.parse(raw); } catch (e){ return {}; }
}