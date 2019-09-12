const path = require('path');
const crypto = require('crypto');

exports.createPages = ({ actions, createNodeId, graphql }) => {
  const { createPage, createNode } = actions;

  return graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            fileAbsolutePath
            html
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors);
    }

    const subslides = sortSlides(getSlides(result)).flatMap(extractSubslides);

    subslides.forEach(({ parentSlide, subslide }, index) => {
      createNode({
        id: createNodeId(`${parentSlide.id}_${index} >>> Slide`),
        parent: parentSlide.id,
        children: [],
        internal: {
          type: `Slide`,
          contentDigest: getContentDigest(subslide),
        },
        html: subslide,
        index: index,
      });

      createPage({
        path: `/${index}`,
        component: path.resolve(`src/templates/slide.js`),
        context: {
          index: index,
        },
      });
    });
  });
};

function getSlides(result) {
  return result.data.allMarkdownRemark.edges;
}

function sortSlides(slides) {
  return [...slides].sort((slideA, slideB) =>
    slideA.node.fileAbsolutePath > slideB.node.fileAbsolutePath ? 1 : -1,
  );
}

function extractSubslides(slide) {
  const subslides = slide.node.html.split('<hr>');

  return subslides.length > 0
    ? subslides.map(subslide => ({
        parentSlide: slide.node,
        subslide,
      }))
    : [
        {
          parentSlide: slide.node,
          subslide: slide.node.html,
        },
      ];
}

function getContentDigest(html) {
  return crypto
    .createHash(`md5`)
    .update(html)
    .digest(`hex`);
}
