# A minimal assertion library

Usage:

```
import { expect } from 'simple-expect'

expect({a: 1}).equal({a: 1});
expect({a: 1}).equal({b: 1}); // -> throw Error
```
