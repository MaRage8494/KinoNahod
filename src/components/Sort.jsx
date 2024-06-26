import React from 'react';

export const sortList = [
  { name: 'году', sortProperty: 'year' },
  { name: 'стране', sortProperty: 'countries.name' },
  { name: 'возрастному рейтингу', sortProperty: 'ageRating' },
];

export default function Sort({ value, method, onChangeSort, onChangeType }) {
  const [isVisible, setVisible] = React.useState(false);
  const sortRef = React.useRef();

  const onClickListItem = function (obj) {
    onChangeSort(obj);
    setVisible(false);
  };

  const onClickSortType = function (type) {
    onChangeType(type === 1 ? -1 : 1);
  };

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.composedPath().includes(sortRef.current)) {
        setVisible(false);
      }
    };
    document.body.addEventListener('click', handleClickOutside);

    return () => {
      document.body.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <b>
          <svg
            className={`sort__arrow${method === 1 ? '' : '--desc '}`}
            onClick={() => onClickSortType(method)}
            width="10"
            height="6"
            viewBox="0 0 10 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
              fill="#2C2C2C"
            />
          </svg>
          Сортировка по:
        </b>
        <span onClick={() => setVisible(!isVisible)}>{value.name}</span>
      </div>
      {isVisible && (
        <div className="sort__popup">
          <ul>
            {sortList.map((obj, index) => (
              <li
                key={index}
                onClick={() => onClickListItem(obj)}
                className={value.sortProperty === obj.sortProperty ? 'active' : ''}>
                {obj.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
