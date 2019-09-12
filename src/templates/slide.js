import React from 'react';
import { graphql } from 'gatsby';
import { Layout } from '../components/layout';

export default ({ data, location, transition }) => (
  <Layout location={location} slideIndex={data.slide.index}>
    <div style={{ width: '100%' }}>
      <div
        style={transition && transition.style}
        dangerouslySetInnerHTML={{ __html: data.slide.html }}
      />
    </div>
  </Layout>
);

export const query = graphql`
  query SlideQuery($index: Int!) {
    slide(index: { eq: $index }) {
      html
      index
    }
  }
`;
