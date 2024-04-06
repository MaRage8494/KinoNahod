import React from 'react';
import ContentLoader from 'react-content-loader';

const SceletonMovie = (props) => (
  <ContentLoader
    speed={2}
    width={260}
    height={600}
    viewBox="0 0 260 600"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}>
    <rect x="10" y="426" rx="3" ry="3" width="250" height="20" />
    <rect x="10" y="455" rx="1" ry="1" width="118" height="20" />
    <rect x="10" y="28" rx="0" ry="0" width="260" height="390" />
  </ContentLoader>
);

export default SceletonMovie;
