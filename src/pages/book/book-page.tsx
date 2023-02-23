import {FC, useEffect, useRef, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store/store';
import {fetchBookById} from '../../store/slices/books/async-actions';
import {BookSection} from '../../components';
import {BookReview} from '../../components/widgets/book-review/book-review';
import styles from './book-page.module.scss';
import iconDivider from '../../assets/link-divider.svg';
import {ReactComponent as IconStarFill} from '../../assets/star-icon.svg';
import {ReactComponent as IconStarUnfill} from '../../assets/star-icon-unfill.svg';
import {ReactComponent as IconChevronVisible} from '../../assets/icon_chevron_visible.svg';
import {useThunkDispatch} from '../../hooks/redux/dispatchers';
import {nullableStatus} from '../../store/slices/books/book-slice';
import {getCategoryName, getCurrentCategoryId} from '../../utils/categories.utils';
import {fetchGenres} from '../../store/slices/nav/async-actions';
import {changeInputValue, changeActiveGenre} from '../../store/slices/filter/filter-slice';

export const BookPage: FC = () => {
    const [isVisibleComments, setVisibleComments] = useState(true);

    const isNeedFirstUpdate = useRef(true);
    const isNeedSecondUpdate = useRef(true);

    const {booksId, category} = useParams();
    const {genres} = useSelector((state: RootState) => state.nav);
    const navStatus = useSelector((state: RootState) => state.nav.status)
    const {book, books, status} = useSelector((state: RootState) => state.books);
    const {activeGenre} = useSelector((state: RootState) => state.filter)
    const thunkDispatch = useThunkDispatch();
    const dispatch = useDispatch();

    const onLinkClick = () => {
        dispatch(nullableStatus());
    }

    /* eslint-disable react-hooks/exhaustive-deps */

    useEffect(() => {
        if (isNeedFirstUpdate.current === true) {
            thunkDispatch(fetchBookById(Number(booksId!)));
            dispatch(changeInputValue(''))

            if (navStatus === 'rejected' || navStatus === null) {
                thunkDispatch(fetchGenres())
            }

            isNeedFirstUpdate.current = false;
        }
    }, [booksId, dispatch, thunkDispatch]);

    useEffect(() => {
        if (isNeedSecondUpdate.current === true) {
            dispatch(changeInputValue(''))
            if (!books.length) {
                dispatch(changeActiveGenre(getCurrentCategoryId(category!, genres)!))
            }
            isNeedSecondUpdate.current = false;
        }
    }, [genres])

    return status === 'fulfilled' ? (
        <section className={styles.page}>
            <div className={styles.nav}>
        <span className={styles.nav__links}>
          <Link data-test-id="breadcrumbs-link" onClick={onLinkClick} to={`/books/${category}`}
                className={styles.nav__link}>
            {(activeGenre === 0 && books.length) ? 'Все книги' : getCategoryName(category!, genres)}
          </Link>
          <img src={iconDivider} alt="link divider"/>
          <a data-test-id="book-name" className={styles.nav__link} href="#">
            {book?.title}
          </a>
        </span>
            </div>
            <BookSection book={book!}/>
            <div
                className={
                    book?.images && book?.images.length < 2
                        ? `${styles.page__rating}`
                        : `${styles.page__rating} ${styles.page__rating__with}`
                }
            >
                <h5 className={styles.section__label}>Рейтинг</h5>
                {/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */}
                <ul className={styles.rating}>
                    {book?.rating
                        ? [...Array(5)].map((_, index) =>
                            index < Math.round(book?.rating!) ? (
                                <IconStarFill key={book?.ISBN[index]}/>
                            ) : (
                                <IconStarUnfill key={book?.ISBN[index]}/>
                            )
                        )
                        : [...Array(5)].map((_, index) => <IconStarUnfill
                            key={book?.ISBN[index]}/>)}
                </ul>
                <h5 className={styles.rating__text}>{book?.rating || 'ещё нет оценок'}</h5>
            </div>
            <div className={styles.detailed}>
                <h5 className={styles.section__label}>Подробная иформация</h5>
                <div className={styles.detailed__info}>
                    <ul className={styles.detailed__left}>
                        <li>
                            <span className={styles.detailed__key}>Издательство</span>
                            <span className={styles.detailed__value}>{book?.publish}</span>
                        </li>
                        <li>
                            <span className={styles.detailed__key}>Год издания</span>
                            <span className={styles.detailed__value}>{book?.issueYear}</span>
                        </li>
                        <li>
                            <span className={styles.detailed__key}>Страниц</span>
                            <span className={styles.detailed__value}>{book?.pages}</span>
                        </li>
                        <li>
                            <span className={styles.detailed__key}>Переплёт</span>
                            <span className={styles.detailed__value}>{book?.cover}</span>
                        </li>
                        <li>
                            <span className={styles.detailed__key}>Формат</span>
                            <span className={styles.detailed__value}>{book?.format}</span>
                        </li>
                    </ul>
                    <ul className={styles.detailed__right}>
                        <li>
                            <span className={styles.detailed__key}>Жанр</span>
                            <span className={styles.detailed__value}>{book?.categories[0]}</span>
                        </li>
                        <li>
                            <span className={styles.detailed__key}>Вес</span>
                            <span className={styles.detailed__value}>{book?.weight} г</span>
                        </li>
                        <li>
                            <span className={styles.detailed__key}>ISBN</span>
                            <span className={styles.detailed__value}>{book?.ISBN}</span>
                        </li>
                        <li>
                            <span className={styles.detailed__key}>Изготовитель</span>
                            <span className={styles.detailed__value}>{book?.producer}</span>
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
                        Отзывы<span>{book?.comments?.length}</span>
                    </p>
                    <div
                        data-test-id="button-hide-reviews"
                        role="presentation"
                        onClick={() => setVisibleComments((prev) => !prev)}
                    >
                        <IconChevronVisible/>
                    </div>
                </h5>
                {isVisibleComments && book?.comments && (
                    <ul className={styles.reviews__list}>
                        {book?.comments?.map((comment) => (
                            <BookReview key={comment.id} comment={comment}/>
                        ))}
                    </ul>
                )}
            </div>
            <button data-test-id="button-rating" type="button" className={styles.button}>
                ОЦЕНИТЬ КНИГУ
            </button>
        </section>
    ) : (
        <div/>
    );
};
