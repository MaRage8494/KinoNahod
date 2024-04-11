import React from 'react';
import { Pagination } from 'react-bootstrap';

function MyPagination({ pages, currentPage, setCurrentPage }) {
  const [active, setActive] = React.useState(currentPage);
  console.log(pages);
  console.log(currentPage);

  const renderPaginationItems = () => {
    const items = [];

    if (pages <= 5) {
      items.push(
        <Pagination.Prev
          onClick={() => {
            setCurrentPage(currentPage <= 2 ? 1 : currentPage - 1);
            setActive(currentPage <= 2 ? 1 : currentPage - 1);
          }}
        />,
      );
      for (let i = 1; i <= pages; i++) {
        items.push(
          <Pagination.Item
            key={i}
            active={i === active}
            onClick={() => {
              setCurrentPage(i);
              setActive(i);
            }}>
            {i}
          </Pagination.Item>,
        );
      }
      items.push(
        <Pagination.Next
          onClick={() => {
            setCurrentPage(currentPage === pages ? pages : currentPage + 1);
            setActive(currentPage === pages ? pages : currentPage + 1);
          }}
        />,
      );
    } else {
      items.push(
        <Pagination.First
          onClick={() => {
            setCurrentPage(1);
            setActive(1);
          }}
        />,
        <Pagination.Prev
          onClick={() => {
            setCurrentPage(currentPage <= 2 ? 1 : currentPage - 1);
            setActive(currentPage <= 2 ? 1 : currentPage - 1);
          }}
        />,
        <Pagination.Item
          key={1}
          active={1 === active}
          onClick={() => {
            setCurrentPage(1);
            setActive(1);
          }}>
          {1}
        </Pagination.Item>,
      );
      if (active <= 3) {
        for (let i = 2; i <= 4; i++) {
          items.push(
            <Pagination.Item
              key={i}
              active={i === active}
              onClick={() => {
                setCurrentPage(i);
                setActive(i);
              }}>
              {i}
            </Pagination.Item>,
          );
        }
        items.push(<Pagination.Ellipsis key="ellipsis-2" />);
        items.push(
          <Pagination.Item
            key={pages}
            active={pages === active}
            onClick={() => {
              setCurrentPage(pages);
              setActive(pages);
            }}>
            {pages}
          </Pagination.Item>,
          <Pagination.Next
            onClick={() => {
              setCurrentPage(currentPage === pages ? pages : currentPage + 1);
              setActive(currentPage === pages ? pages : currentPage + 1);
            }}
          />,
          <Pagination.Last
            onClick={() => {
              setCurrentPage(pages);
              setActive(pages);
            }}
          />,
        );
      } else if (currentPage >= pages - 2) {
        items.push(<Pagination.Ellipsis key="ellipsis-2" />);
        for (let i = pages - 3; i <= pages; i++) {
          items.push(
            <Pagination.Item
              key={i}
              active={i === active}
              onClick={() => {
                setCurrentPage(i);
                setActive(i);
              }}>
              {i}
            </Pagination.Item>,
          );
        }
        items.push(
          <Pagination.Next
            onClick={() => {
              setCurrentPage(currentPage === pages ? pages : currentPage + 1);
              setActive(currentPage === pages ? pages : currentPage + 1);
            }}
          />,
          <Pagination.Last
            onClick={() => {
              setCurrentPage(pages);
              setActive(pages);
            }}
          />,
        );
      } else {
        items.push(<Pagination.Ellipsis key="ellipsis-1" />);
        for (let i = Math.max(2, currentPage - 1); i <= Math.min(currentPage + 1, pages - 1); i++) {
          items.push(
            <Pagination.Item
              key={i}
              active={i === active}
              onClick={() => {
                setCurrentPage(i);
                setActive(i);
              }}>
              {i}
            </Pagination.Item>,
          );
        }
        items.push(<Pagination.Ellipsis key="ellipsis-2" />);
        items.push(
          <Pagination.Item
            key={pages}
            active={pages === active}
            onClick={() => {
              setCurrentPage(pages);
              setActive(pages);
            }}>
            {pages}
          </Pagination.Item>,
        );
        items.push(
          <Pagination.Next
            onClick={() => {
              setCurrentPage(currentPage === pages ? pages : currentPage + 1);
              setActive(currentPage === pages ? pages : currentPage + 1);
            }}
          />,
          <Pagination.Last
            onClick={() => {
              setCurrentPage(pages);
              setActive(pages);
            }}
          />,
        );
      }
    }

    return items;
  };

  return <>{pages > 1 ? <Pagination>{renderPaginationItems()}</Pagination> : ''}</>;
}

export default MyPagination;
