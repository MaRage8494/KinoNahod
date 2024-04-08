function MovieInfo({ poster, name, rating, description }) {
  let grade = 'normal';
  if (rating > 5 && rating < 7) {
    grade = 'normal';
  } else if (rating >= 7 && rating <= 10) {
    grade = 'high';
  } else {
    grade = 'low';
  }
  return (
    <div className="info-wrapper">
      {poster === '' ? (
        <h2>Нет информации о постере</h2>
      ) : (
        <img className="info-poster" src={poster} alt={name} />
      )}
      <div className="description">
        <div className="info">
          <h4 className="info__title">{name}</h4>
          <div className={`info__rating info__rating--${grade}`}>
            {rating % 1 === 0 ? `${rating}.0` : rating}
          </div>
        </div>
        <div className="info-description">
          <h4 className="info-description__title">Описание</h4>
          {!description || description === '' ? (
            <h2>Нет информации об описании</h2>
          ) : (
            <span className="info-description__text">{description}</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default MovieInfo;
