import { FC, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BookSection } from '../../components';
import { BookReview } from '../../components/book-review/book-review';
import styles from './book-page.module.scss';
import { Book } from '../../types/data.types';
import iconDivider from '../../assets/link-divider.svg';
import { ReactComponent as IconStarFill } from '../../assets/star-icon.svg';
import { ReactComponent as IconStarUnfill } from '../../assets/star-icon-unfill.svg';
import { ReactComponent as IconChevronVisible } from '../../assets/icon_chevron_visible.svg';
import { books } from '../../components/books-list/books-list';

export type Comment = { userName: string; body?: string; date: string };

interface IProps {
  book: Book;
}

export const BookPage: FC<IProps> = ({ book }) => {
  const [comments, setComments] = useState<Comment[]>([
    {
      userName: 'Иван Иванов',
      date: '5 января 2019',
    },
    {
      userName: 'Николай Качков',
      date: '20 июня 2018',
      body: `Учитывая ключевые сценарии поведения, курс на социально-ориентированный национальный проект не оставляет шанса для анализа существующих паттернов поведения. Для современного мира внедрение современных методик предоставляет широкие возможности для позиций, занимаемых участниками в отношении поставленных задач. Как уже неоднократно упомянуто, сделанные на базе интернет-аналитики выводы будут в равной степени предоставлены сами себе. Вот вам яркий пример современных тенденций — глубокий уровень погружения создаёт предпосылки для своевременного выполнения сверхзадачи. И нет сомнений, что акционеры крупнейших компаний, инициированные исключительно синтетически, превращены в посмешище, хотя само их существование приносит несомненную пользу обществу.`,
    },
    {
      userName: 'Екатерина Беляева',
      date: '18 февраля 2018',
    },
  ]);

  const [isVisibleComments, setVisibleComments] = useState(true);

  const { booksId } = useParams();
  const actualBook = books.find((item) => String(item.id) === booksId);

  return (
    <section className={styles.page}>
      <div className={styles.nav}>
        <span className={styles.nav__links}>
          <a className={styles.nav__link} href='#'>
            Бизнес книги
          </a>
          <img src={iconDivider} alt='link divider' />
          <a className={styles.nav__link} href='#'>
            Грокаем алгоритмы. Иллюстрированное пособие для программистов и любопытствующих
          </a>
        </span>
      </div>
      <BookSection book={actualBook!} />
      <div
        className={
          actualBook!.picture.length < 2
            ? `${styles.page__rating}`
            : `${styles.page__rating} ${styles.page__rating__with}`
        }
      >
        <h5 className={styles.section__label}>Рейтинг</h5>
        <ul className={styles.rating}>
          <li>
            <IconStarFill />
          </li>
          <li>
            <IconStarFill />
          </li>
          <li>
            <IconStarFill />
          </li>
          <li>
            <IconStarFill />
          </li>
          <li>
            <IconStarUnfill />
          </li>
        </ul>
        <h5>4.3</h5>
      </div>
      <div className={styles.detailed}>
        <h5 className={styles.section__label}>Подробная иформация</h5>
        <div className={styles.detailed__info}>
          <ul className={styles.detailed__left}>
            <li>
              <span className={styles.detailed__key}>Издательство</span>
              <span className={styles.detailed__value}>Питер</span>
            </li>
            <li>
              <span className={styles.detailed__key}>Год издания</span>
              <span className={styles.detailed__value}>2019</span>
            </li>
            <li>
              <span className={styles.detailed__key}>Страниц</span>
              <span className={styles.detailed__value}>288</span>
            </li>
            <li>
              <span className={styles.detailed__key}>Переплёт</span>
              <span className={styles.detailed__value}>Мягкая обложка</span>
            </li>
            <li>
              <span className={styles.detailed__key}>Формат</span>
              <span className={styles.detailed__value}>70x100</span>
            </li>
          </ul>
          <ul className={styles.detailed__right}>
            <li>
              <span className={styles.detailed__key}>Жанр</span>
              <span className={styles.detailed__value}>Компьютерная литература</span>
            </li>
            <li>
              <span className={styles.detailed__key}>Вес</span>
              <span className={styles.detailed__value}>370 г</span>
            </li>
            <li>
              <span className={styles.detailed__key}>ISBN</span>
              <span className={styles.detailed__value}>978-5-4461-0923-4</span>
            </li>
            <li>
              <span className={styles.detailed__key}>Изготовитель</span>
              <span className={styles.detailed__value}>
                ООО «Питер Мейл». РФ, 198 206, г. Санкт-Петербург, Петергофское ш, д. 73, лит. А29
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div className={styles.reviews}>
        <h5
          className={
            isVisibleComments ? `${styles.section__label}` : `${styles.section__label} ${styles.section__label__trans}`
          }
        >
          <p>
            Отзывы<span>2</span>
          </p>
          <div
            data-test-id='button-hide-reviews'
            role='presentation'
            onClick={() => setVisibleComments((prev) => !prev)}
          >
            <IconChevronVisible />
          </div>
        </h5>
        {isVisibleComments && (
          <ul className={styles.reviews__list}>
            {comments.map((comment) => (
              <BookReview key={comment.userName} comment={comment} />
            ))}
          </ul>
        )}
      </div>
      <button data-test-id='button-rating' type='button' className={styles.button}>
        ОЦЕНИТЬ КНИГУ
      </button>
    </section>
  );
};
