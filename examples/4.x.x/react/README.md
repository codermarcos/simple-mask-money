# SimpleMaskMoney Example Vue

## Getting started

First, install it.

```shell
  npm i simple-mask-money --save
```

Then, use it as follows:

```jsx
// Example with default configuration
import { useEffect } from 'react';
import { setMask } from 'simple-mask-money';

function InputMoneyComponent() {
  useEffect(() => setMask('#my-input'), [])
  return <input type="text" id="#my-input" />
}
```

Or if you prefer us it from Github CDN:
  
```html
<script src="/simple-mask-money.umd.js"></script>
```

```jsx
// Example with default configuration
import { useEffect } from 'react';

function InputMoneyComponent() {
  useEffect(() => SimpleMaskMoney.setMask('#my-input'), [])
  return <input type="text" id="#my-input" />
}
```
