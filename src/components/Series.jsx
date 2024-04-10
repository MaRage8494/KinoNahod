import MyPagination from './MyPagination';
import React from 'react';

function Series({ seriesInfo }) {
  const [currentPage, setCurrentPage] = React.useState(1);

  if (!seriesInfo || !Array.isArray(seriesInfo) || seriesInfo.length === 0) {
    return <h2 className="stub">Нет информации об сезонах и сериях</h2>;
  }

  const visibleSeasons = seriesInfo.slice((currentPage - 1) * 5, currentPage * 5);
  console.log(seriesInfo.length / 5);
  const pages = Math.ceil(seriesInfo.length / 5);
  console.log(pages);
  console.log(seriesInfo);

  return (
    <>
      <div className="series__content">
        {visibleSeasons.map((obj, index) => (
          <div key={index + 1} className="series__content__item">
            <h3 key={obj.number}>Сезон {obj.number}</h3>
            <p key={index}>Количество серий: {obj.episodesCount}</p>
          </div>
        ))}
      </div>
      <MyPagination
        pages={pages}
        currentPage={currentPage}
        setCurrentPage={(page) => {
          setCurrentPage(page);
        }}
      />
    </>
  );
}

export default Series;
