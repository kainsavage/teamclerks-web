import React from 'react';
import marked from 'marked';

import highlight from 'highlight.js';
import 'highlight.js/styles/default.css';

import './css/markdown.css';

/**
 * Set our markdown options.
 */
marked.setOptions({
  highlight: code => {
    return highlight.highlightAuto(code).value;
  }
});

/**
 * Helper constant for rendering markdown'd content.
 */
export const Markdown = ({ content, ...rest }) => {
  return (
    <div {...rest} dangerouslySetInnerHTML={{ __html: marked(content) }}></div>
  );
};