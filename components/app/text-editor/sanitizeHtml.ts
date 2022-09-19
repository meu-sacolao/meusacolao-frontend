import DOMPurify from 'dompurify'

const ALLOWED_TAGS= [
  "img",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "blockquote",
  "p",
  "a",
  "ul",
  "ol",
  "nl",
  "li",
  "b",
  "i",
  "strong",
  "em",
  "strike",
  "code",
  "hr",
  "br",
  "div",
  "pre",
  "font",
  "button",
  'iframe'
]

const ALLOWED_ATTR = [
  'color',
  'href',
  'class',
  'src',
  'title',
  'width',
  'height',
  'size',
  'style',
  'frameborder',
  'allow',
  'target',
  'allowfullscreen'
]

const domPurifyOptions = {
  ALLOWED_TAGS,
  ALLOWED_ATTR,
}

export default (dirty) => {
  return DOMPurify.sanitize(dirty, domPurifyOptions).replace(/\s+/g, " ")
}