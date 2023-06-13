# kdu-to-react

This works for both Kdu 2 and Kdu 3.

## Install

```bash
# npm
npm install @nkduy/kdu-to-react
# or yarn
yarn add @nkduy/kdu-to-react
```

## Usage

```js
import React from 'react'
import { render } from 'react-dom'
import toReact from '@nkduy/kdu-to-react'

const KduComponent = {
  data() {
    return {
      count: 0
    }
  },

  render(h) {
    return h(
      'button',
      {
        on: {
          click: () => this.count++
        }
      },
      [this.count]
    )
  }
}

const ReactComponent = toReact(KduComponent)

render(<ReactComponent />, document.getElementById('app'))
```

### Passing Props

By default we pass all props from React to Kdu:

```js
const Counter = toReact({
  props: ['initialCount'],
  render(h) {
    return h('button', {}, [this.initialCount])
  }
})

const App = <Counter initialCount={0} />
```

However you can customize how the props are passed to Kdu with the `passProps` option:

```js
toReact(KduComponent, {
  // Only pass `initialCount` prop
  passProps: props => ({ initialCount: props.initialCount }),
  // Or disable props
  passProps: false
})
```

## License

[MIT](./LICENSE) License.
