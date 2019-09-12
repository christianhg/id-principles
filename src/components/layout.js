import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import { Header } from './header';
import { Navigation } from './navigation';

import './index.css';

export const Layout = ({ children, location, slideIndex }) => (
  <StaticQuery
    query={graphql`
      query IndexQuery {
        allSlide {
          edges {
            node {
              id
            }
          }
        }
      }
    `}
    render={data => {
      const slidesLength = data.allSlide.edges.length;
      return (
        <Navigation
          location={location}
          slideIndex={slideIndex}
          slidesLength={slidesLength}
        >
          <Header />
          <div id="slide" style={{ width: '100%' }}>
            {children}
          </div>
        </Navigation>
      );
    }}
  />
);
