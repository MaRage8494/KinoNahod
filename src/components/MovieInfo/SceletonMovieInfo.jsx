import React from 'react';
import ContentLoader from 'react-content-loader';

const SceletonMovieInfo = (props) => (
  <ContentLoader
    speed={2}
    width={1260}
    height={1500}
    viewBox="0 0 1260 1500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}>
    <rect x="0" y="15" rx="5" ry="5" width="300" height="400" />
    <rect x="350" y="15" rx="5" ry="5" width="800" height="50" />
    <rect x="350" y="100" rx="5" ry="5" width="800" height="320" />
    <rect x="0" y="450" rx="5" ry="5" width="1150" height="150" />
    <rect x="0" y="630" rx="5" ry="5" width="1150" height="150" />
    <rect x="0" y="820" rx="5" ry="5" width="750" height="400" />
    <rect x="850" y="820" rx="5" ry="5" width="300" height="400" />
    <rect x="0" y="1270" rx="5" ry="5" width="1150" height="150" />
  </ContentLoader>
);

export default SceletonMovieInfo;
