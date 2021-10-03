import prod from './prod';
import dev from './dev';

let key;
if (process.env.NODE_ENV === 'production') {
  key = prod;
} else {
  key = dev;
}

export default key;