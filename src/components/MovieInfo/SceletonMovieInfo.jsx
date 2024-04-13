import React from 'react';
import ContentLoader from 'react-content-loader';

const SkeletonMovieInfo = (props) => (
  <ContentLoader
    speed={2}
    width="100%"
    height="100%"
    viewBox="0 0 1260 1500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}>
    <rect x="0" y="15" rx="5" ry="5" width="25%" height="26.67%" />
    <rect x="35%" y="15" rx="5" ry="5" width="63.5%" height="3.33%" />
    <rect x="35%" y="100" rx="5" ry="5" width="63.5%" height="21.33%" />
    <rect x="0" y="450" rx="5" ry="5" width="98.5%" height="10%" />
    <rect x="0" y="630" rx="5" ry="5" width="98.5%" height="10%" />
    <rect x="0" y="820" rx="5" ry="5" width="65%" height="26.67%" />
    <rect x="70%" y="820" rx="5" ry="5" width="28.5%" height="26.67%" />
    <rect x="0" y="1270" rx="5" ry="5" width="98.5%" height="10%" />
  </ContentLoader>
);

export default SkeletonMovieInfo;
