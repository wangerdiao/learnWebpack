import { sum, sub } from './module1';
import { data, girlFriend } from './module2';
import friend from './module3';
import liukai from '../json/lk.json';
import '../css/demo.css';
import '../css/demo2.less';
import '../css/iconfont.css';

sum(1, 3);
sub(3, 1);
// eslint-disable-next-line
console.log(data, girlFriend);
// eslint-disable-next-line
console.log(friend);
// eslint-disable-next-line
console.log(1111111111, liukai);
const p = new Promise((resolve) => {
  setTimeout(() => {
    resolve(900);
  }, 1000);
});
p.then(
  (value) => { console.log(value); },
  (reason) => { console.log(reason); },
);
