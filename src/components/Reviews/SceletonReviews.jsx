import React from 'react';
import ContentLoader from 'react-content-loader';

const SceletonReviews = (props) => (
  <ContentLoader
    speed={2}
    width={'100%'}
    height={'100%'}
    viewBox="0 0 1150 300"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}>
    <rect x="0" y="0" rx="5" ry="5" width="98.5%" height="100%" />
  </ContentLoader>
);

export default SceletonReviews;
