import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import debounce from 'lodash.debounce';

import { addToSearchHistory, setSearchValue } from '../redux/slices/sortSlice';

export const Search = () => {
  const [isVisible, setVisible] = React.useState(false);
  const [value, setValue] = React.useState('');
  const { searchValue, searchHistory } = useSelector((state) => state.sortReducer);

  console.log('HISTORY', searchHistory);

  const dispatch = useDispatch();
  const inputRef = React.useRef();

  const onClickClear = () => {
    dispatch(setSearchValue(''));
    setValue('');
    inputRef.current.focus();
  };

  const updateSearchValue = React.useMemo(
    () =>
      debounce((str) => {
        dispatch(setSearchValue(str));
        if (str !== '') {
          dispatch(addToSearchHistory(str));
        }
      }, 1000),
    [dispatch],
  );

  const onClickSearchItem = function (item) {
    setVisible(false);
    dispatch(setSearchValue(item));
    setValue(item);
    inputRef.current.focus();
    console.log(item);
  };

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.composedPath().includes(inputRef.current)) {
        setVisible(false);
      }
    };
    document.body.addEventListener('click', handleClickOutside);

    return () => {
      document.body.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const onChangeInput = (event) => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
  };

  const filteredSuggestions = searchHistory.filter(
    (item) => item.toLowerCase().includes(value.toLowerCase()) && item !== value,
  );

  console.log(searchValue);
  return (
    <div className="header__search">
      <svg
        className="header__search__logo"
        height="512px"
        id="Layer_1"
        enableBackground="new 0 0 512 512"
        version="1.1"
        viewBox="0 0 512 512"
        width="512px"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M344.5,298c15-23.6,23.8-51.6,23.8-81.7c0-84.1-68.1-152.3-152.1-152.3C132.1,64,64,132.2,64,216.3  c0,84.1,68.1,152.3,152.1,152.3c30.5,0,58.9-9,82.7-24.4l6.9-4.8L414.3,448l33.7-34.3L339.5,305.1L344.5,298z M301.4,131.2  c22.7,22.7,35.2,52.9,35.2,85c0,32.1-12.5,62.3-35.2,85c-22.7,22.7-52.9,35.2-85,35.2c-32.1,0-62.3-12.5-85-35.2  c-22.7-22.7-35.2-52.9-35.2-85c0-32.1,12.5-62.3,35.2-85c22.7-22.7,52.9-35.2,85-35.2C248.5,96,278.7,108.5,301.4,131.2z"
          fill="#111111"
        />
      </svg>
      <input
        ref={inputRef}
        value={value}
        onClick={() => setVisible(true)}
        onChange={(event) => onChangeInput(event)}
        className="header__search__input"
        placeholder="Поиск фильма/сериала..."
      />
      {value && (
        <svg
          onClick={onClickClear}
          className="header__search__close"
          height="512px"
          version="1.1"
          viewBox="0 0 512 512"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M437.5,386.6L306.9,256l130.6-130.6c14.1-14.1,14.1-36.8,0-50.9c-14.1-14.1-36.8-14.1-50.9,0L256,205.1L125.4,74.5  c-14.1-14.1-36.8-14.1-50.9,0c-14.1,14.1-14.1,36.8,0,50.9L205.1,256L74.5,386.6c-14.1,14.1-14.1,36.8,0,50.9  c14.1,14.1,36.8,14.1,50.9,0L256,306.9l130.6,130.6c14.1,14.1,36.8,14.1,50.9,0C451.5,423.4,451.5,400.6,437.5,386.6z"
            strokeWidth="1"
          />
        </svg>
      )}
      {filteredSuggestions.length > 0 && isVisible ? (
        <div className="header__search__popup">
          <ul>
            {filteredSuggestions.map((obj, index) => (
              <li key={index} onClick={() => onClickSearchItem(obj)}>
                {obj}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default Search;
