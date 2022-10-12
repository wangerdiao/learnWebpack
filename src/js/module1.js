// 使用分别暴露的方式
export function sum(a, b) {
// eslint-disable-next-line
  console.log(a + b);
}
export function sub(a, b) {
// eslint-disable-next-line
  console.log(a - b);
}
const obj = { a: () => { console.log(111); } };
const { a } = obj;
a();
