import path from 'path'
import { renderToString } from 'react-dom/server'
import { ServerStyleSheet } from 'styled-components'
import { ChunkExtractor } from '@loadable/server'

import { ReactNode } from 'react'
import { IState } from '../types/redux'

export default function template (el: ReactNode, state: IState): string {
  const statsFile: string = path.resolve('./build/assets/loadable-stats.json')
  const extractor: ChunkExtractor = new ChunkExtractor({ statsFile })
  const sheet: ServerStyleSheet = new ServerStyleSheet()
  const html: string = renderToString(extractor.collectChunks(sheet.collectStyles(el)))
  const scriptTags: string = extractor.getScriptTags()
  const linkTags: string = extractor.getLinkTags()
  const styleTags: string = extractor.getStyleTags()
  const styledComponentTags: string = sheet.getStyleTags()

  return (
    `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="Cinema viewier with rating and hiding ability">
    <title>Cinema Viewer</title>
    ${styleTags}
    ${styledComponentTags}
    ${linkTags}
  </head>
  <body>
    <div id="root">${html}</div>
    <script>
      window.__PRELOADED_STATE__ = ${JSON.stringify(state)};
    </script>
    ${scriptTags}
  </body>
</html>`
  )
}
