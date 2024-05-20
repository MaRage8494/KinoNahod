import { ListGroup } from 'react-bootstrap';
import React from 'react';
import axios from '../../conf/axios.js';
import sanitizeHtml from 'sanitize-html';

import Pagination from '../MyPagination.jsx';
import SceletonReviews from './SceletonReviews.jsx';

function Reviews({ reviews, pages, movieId }) {
  const [reviewsData, setReviews] = React.useState(reviews);
  const [isLoading, setLoading] = React.useState(true);
  const [currentPage, setCurrentPage] = React.useState(1);

  const titleRef = React.useRef();

  const cleanHTML = (html) => {
    html = html.replace(/(?:\r\n|\r|\n)/g, '<br />');
    return sanitizeHtml(html, {
      allowedTags: ['b', 'i', 'em', 'strong', 'p', 'br'], // Разрешенные теги
      allowedAttributes: {}, // Разрешенные атрибуты
    });
  };

  React.useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const reviewsResponse = await axios.get(`/reviews`, {
          params: {
            page: currentPage,
            movieId,
          },
        });
        setReviews(reviewsResponse.data);
      } catch (error) {
        console.error('Ошибка при получении данных:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    titleRef?.current?.scrollIntoView();
  }, [currentPage, movieId]);

  if (!reviewsData || !Array.isArray(reviewsData.docs) || reviewsData.docs.length === 0) {
    return <h2 className="stub">Нет информации об отзывах пользователей</h2>;
  }

  const uniqueReviews = Array.from(new Set(reviewsData.docs.map((item) => item.id))).map((id) => {
    return reviewsData.docs.find((item) => item.id === id);
  });

  const visibleReviews = uniqueReviews;

  return (
    <>
      {isLoading ? (
        <SceletonReviews />
      ) : (
        <div ref={titleRef} className="reviews">
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
                      <p>{review.author || 'аноним'}</p>
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
