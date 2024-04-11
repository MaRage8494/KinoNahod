import React from 'react';
import ContentLoader from 'react-content-loader';

const SceletonReviews = (props) => (
  <ContentLoader
    speed={2}
    width={1150}
    height={300}
    viewBox="0 0 1150 300"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}>
    <rect x="0" y="0" rx="5" ry="5" width="1150" height="300" />
  </ContentLoader>
);

export default SceletonReviews;
