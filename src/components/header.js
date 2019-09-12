import React from 'react';
import Helmet from 'react-helmet';
import { Link, graphql, StaticQuery } from 'gatsby';

export const Header = () => (
  <StaticQuery
    query={graphql`
      query HeaderQuery {
        site {
          siteMetadata {
            name
            title
            date
          }
        }
      }
    `}
    render={data => {
      const { date, name, title } = data.site.siteMetadata;
      return (
        <>
          <Helmet title={`${title} — ${name}`} />
          <header>
            <Link to="/0">
              <span>{name}</span> — {title}
            </Link>
            <time>{date}</time>
          </header>
        </>
      );
    }}
  />
);
