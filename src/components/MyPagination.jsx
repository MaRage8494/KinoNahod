import React, { useEffect } from 'react';
import { Pagination } from 'react-bootstrap';

function MyPagination({ pages, currentPage, setCurrentPage }) {
  console.log(pages);
  console.log(currentPage);

  const prevPageRef = React.useRef(currentPage);

  const handlePageChange = React.useCallback(
    (page) => {
      if (page !== currentPage) {
        setCurrentPage(page);
      }
    },
    [currentPage, setCurrentPage],
  );

  const renderPaginationItems = () => {
    const items = [];

    if (pages <= 5) {
      items.push(
        <Pagination.Prev
          key="prev"
          onClick={() => {
            handlePageChange(currentPage <= 2 ? 1 : currentPage - 1);
          }}
        />,
      );
      for (let i = 1; i <= pages; i++) {
        items.push(
          <Pagination.Item
            key={i}
            active={i === currentPage}
            onClick={() => {
              handlePageChange(i);
            }}>
            {i}
          </Pagination.Item>,
        );
      }
      items.push(
        <Pagination.Next
          key="next"
          onClick={() => {
            handlePageChange(currentPage === pages ? pages : currentPage + 1);
          }}
        />,
      );
    } else {
      items.push(
        <Pagination.First
          key="first"
          onClick={() => {
            handlePageChange(1);
          }}
        />,
        <Pagination.Prev
          key="prev"
          onClick={() => {
            handlePageChange(currentPage <= 2 ? 1 : currentPage - 1);
          }}
        />,
        <Pagination.Item
          key={1}
          active={1 === currentPage}
          onClick={() => {
            handlePageChange(1);
          }}>
          {1}
        </Pagination.Item>,
      );
      if (currentPage <= 3) {
        for (let i = 2; i <= 4; i++) {
          items.push(
            <Pagination.Item
              key={i}
              active={i === currentPage}
              onClick={() => {
                handlePageChange(i);
              }}>
              {i}
            </Pagination.Item>,
          );
        }
        items.push(<Pagination.Ellipsis key="ellipsis-2" />);
        items.push(
          <Pagination.Item
            key={pages}
            active={pages === currentPage}
            onClick={() => {
              handlePageChange(pages);
            }}>
            {pages}
          </Pagination.Item>,
          <Pagination.Next
            key="next"
            onClick={() => {
              handlePageChange(currentPage === pages ? pages : currentPage + 1);
            }}
          />,
          <Pagination.Last
            key="last"
            onClick={() => {
              handlePageChange(pages);
            }}
          />,
        );
      } else if (currentPage >= pages - 2) {
        items.push(<Pagination.Ellipsis key="ellipsis-2" />);
        for (let i = pages - 3; i <= pages; i++) {
          items.push(
            <Pagination.Item
              key={i}
              active={i === currentPage}
              onClick={() => {
                handlePageChange(i);
              }}>
              {i}
            </Pagination.Item>,
          );
        }
        items.push(
          <Pagination.Next
            key="next"
            onClick={() => {
              handlePageChange(currentPage === pages ? pages : currentPage + 1);
            }}
          />,
          <Pagination.Last
            key="last"
            onClick={() => {
              handlePageChange(pages);
            }}
          />,
        );
      } else {
        items.push(<Pagination.Ellipsis key="ellipsis-1" />);
        for (let i = Math.max(2, currentPage - 1); i <= Math.min(currentPage + 1, pages - 1); i++) {
          items.push(
            <Pagination.Item
              key={i}
              active={i === currentPage}
              onClick={() => {
                handlePageChange(i);
              }}>
              {i}
            </Pagination.Item>,
          );
        }
        items.push(<Pagination.Ellipsis key="ellipsis-2" />);
        items.push(
          <Pagination.Item
            key={pages}
            active={pages === currentPage}
            onClick={() => {
              handlePageChange(pages);
            }}>
            {pages}
          </Pagination.Item>,
        );
        items.push(
          <Pagination.Next
            key="next"
            onClick={() => {
              handlePageChange(currentPage === pages ? pages : currentPage + 1);
            }}
          />,
          <Pagination.Last
            key="last"
            onClick={() => {
              handlePageChange(pages);
            }}
          />,
        );
      }
    }

    return items;
  };
  useEffect(() => {
    prevPageRef.current = currentPage;
  }, [currentPage]);
  return <>{pages > 1 ? <Pagination>{renderPaginationItems()}</Pagination> : ''}</>;
}

export default MyPagination;
