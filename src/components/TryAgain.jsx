function TryAgain({ action, attempts, incrementFunction }) {
  const refreshHandler = (action) => {
    action();
    incrementFunction();
  };

  return (
    <div className="try-again">
      <h2>Не удалось выполнить запрос</h2>
      {attempts === 3 ? (
        <div className="button button--back">
          <span>Превышено количество попыток</span>
        </div>
      ) : (
        <div className="button button--back" onClick={() => refreshHandler(action)}>
          <span>Повторить</span>
        </div>
      )}
    </div>
  );
}

export default TryAgain;
