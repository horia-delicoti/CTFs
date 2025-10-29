import React from 'react';
import MDXComponents from '@theme-original/MDXComponents';
import WikiLink from '@site/src/components/WikiLink';

export default {
  ...MDXComponents,
  // Make WikiLink globally available in all MDX files
  WikiLink,
  // Short form for WikiLink
  W: WikiLink,
};