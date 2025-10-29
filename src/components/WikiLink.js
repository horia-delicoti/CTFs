import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

const WikiLink = ({ path, children }) => {
  const { siteConfig } = useDocusaurusContext();
  const wikiUrl = siteConfig.customFields.wikiUrl;
  
  return (
    <a 
      href={`${wikiUrl}${path}`} 
      target="_blank" 
      rel="noopener noreferrer"
      style={{ textDecoration: '' }} // You can customize the style as needed: none, underline, bold, italic, etc.
    >
      {children}
    </a>
  );
};

export default WikiLink;