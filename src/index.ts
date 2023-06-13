import React from 'react'
import * as Kdu from 'kdu'

const defaultPassProps = <T = any>(props: T): T => props

export default <TProps = any>(
  Component: any,
  { passProps = defaultPassProps } = {}
) => {
  return (props: TProps) => {
    const el = React.useRef(null)

    React.useEffect(() => {
      // @ts-expect-error
      if (Kdu.createApp) {
        // @ts-expect-error
        const app = Kdu.createApp({
          render: () => Kdu.h(Component, (passProps && passProps(props)) || {})
        })
        app.mount(el.current)

        return () => app.unmount()
      } else if (Kdu.default) {
        const app = new Kdu.default({
          // @ts-expect-error
          el: el.current,
          render: h =>
            h(Component, { props: passProps ? passProps(props) : {} })
        })

        return () => app.$destroy()
      }
    })

    return React.createElement(
      'div',
      null,
      React.createElement('div', { ref: el })
    )
  }
}
