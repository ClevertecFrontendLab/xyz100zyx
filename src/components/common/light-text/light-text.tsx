import styles from './styles.module.scss';

/* eslint-disable react/jsx-no-useless-fragment */

export const LightText = (filter: string, text: string, dataTestId: string, isForLoginForm = false) => {
  if (!filter) return <>{text}</>;
  const regExp = new RegExp(filter, 'ig');
  const matchValues = text.match(regExp);
  if (matchValues) {
    return text.split(regExp).map((str, index, array) => {
      if (index < array.length - 1) {
        const colored = matchValues.shift();
        return (
          <>
            {str}
            <span data-test-id={dataTestId} className={!isForLoginForm ? styles.colored : styles.colored__form}>
              {colored}
            </span>
          </>
        );
      }
      return <>{str}</>;
    });
  }
  return <>{text}</>;
};
