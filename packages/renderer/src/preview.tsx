import React from 'react'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkReact from 'remark-react'
import RemarkCode from './remark-code'
import { defaultSchema } from 'hast-util-sanitize'
import './preview.css'
import 'github-markdown-css/github-markdown.css'

export type Props = {
  doc: string
}

const schema = {
  ...defaultSchema,
  attributes: {
    ...defaultSchema.attributes,
    code: [...(defaultSchema.attributes?.code || []), 'className']
  }
}

const Preview = ({ doc }: Props) => {
  const markdown = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkReact, {
      createElement: React.createElement,
      sanitize: schema,
      remarkReactComponents: {
        code: RemarkCode
      }
    })
    .processSync(doc).result
  return <div className="preview markdown-body">{markdown}</div>
}

export default Preview
