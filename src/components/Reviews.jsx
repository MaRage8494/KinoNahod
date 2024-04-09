import { ListGroup } from 'react-bootstrap';
import React from 'react';
import axios from '../conf/axios.js';
import sanitizeHtml from 'sanitize-html';

import Pagination from './MyPagination.jsx';

function Reviews({ reviews, pages, movieId }) {
  const [reviewsData, setReviews] = React.useState(reviews);
  const [isLoading, setLoading] = React.useState(true);
  const [currentPage, setCurrentPage] = React.useState(1);

  const cleanHTML = (html) => {
    return sanitizeHtml(html, {
      allowedTags: ['b', 'i', 'em', 'strong', 'p', 'br'], // Разрешенные теги
      allowedAttributes: {}, // Разрешенные атрибуты
    });
  };

  console.log(reviews);
  console.log(reviewsData);

  React.useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const reviewsResponse = await axios.get(
          `review?page=${currentPage}&limit=5&movieId=${movieId}`,
        );
        setReviews(reviewsResponse.data);
      } catch (error) {
        console.error('Ошибка при получении данных:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage, movieId]);

  console.log(reviews);

  if (!reviewsData || !Array.isArray(reviewsData.docs) || reviewsData.docs.length === 0) {
    return <h2 className="stub">Нет информации об отзывах пользователей</h2>;
  }

  const uniqueReviews = Array.from(new Set(reviewsData.docs.map((item) => item.id))).map((id) => {
    return reviewsData.docs.find((item) => item.id === id);
  });

  const visibleReviews = uniqueReviews;
  console.log(visibleReviews);

  return (
    <>
      {isLoading ? (
        <h2>Загрузка...</h2>
      ) : (
        <div className="reviews">
          {!reviewsData ? (
            <h2>Нет информации об отзывах</h2>
          ) : (
            <ListGroup className="reviews__list">
              {visibleReviews.map((review) => (
                <ListGroup.Item
                  className={`reviews__list-item reviews--${
                    review.type === 'Нейтральный'
                      ? 'neutral'
                      : review.type === 'Позитивный'
                      ? 'positive'
                      : 'negative'
                  }`}
                  key={review.id}>
                  <div className="reviews__header">
                    <h2 className="reviews__header__title">{review.title || 'Без заголовка'}</h2>
                    <div className="reviews__header__author">
                      <p>Пользователь: {review.author || 'аноним'}</p>
                      <p>(Рейтинг: {review.userRating || '0'})</p>
                    </div>
                  </div>
                  <p
                    className="reviews__text"
                    dangerouslySetInnerHTML={{ __html: cleanHTML(review.review) }}></p>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </div>
      )}
      <Pagination
        pages={pages}
        currentPage={currentPage}
        setCurrentPage={(page) => setCurrentPage(page)}
      />
    </>
  );
}

export default Reviews;
