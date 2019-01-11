import { renderToString } from 'react-dom/server'
import { ServerStyleSheet } from 'styled-components'

export default (el, state) => {
  const sheet = new ServerStyleSheet()
  const html = renderToString(sheet.collectStyles(el))
  const styleTags = sheet.getStyleTags()

  return (
    `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="A starter project for react and redux">
    <title>React-Redux Starter Todo Example</title>
    ${styleTags}
  </head>
  <body>
    <div id="root">${html}</div>
    <script>
      window.INITIAL_STATE = ${JSON.stringify(state)};
    </script>
    <script src="/assets/bundle.js"></script>
  </body>
</html>`
  )
}
