import { FC } from 'react';
import { Comment } from '../../pages/book/book-page';
import styles from './book-review.module.scss';
import userReviewImg from '../../assets/user-review.jpg';
import { ReactComponent as IconStarFill } from '../../assets/star-icon.svg';
import { ReactComponent as IconStarUnfill } from '../../assets/star-icon-unfill.svg';

interface IProps {
  comment: Comment;
}

export const BookReview: FC<IProps> = ({ comment }) => (
  <div className={styles.comment}>
    <div className={styles.comment__user}>
      <a href='#'>
        <img src={userReviewImg} alt='comment info' />
      </a>
      <span className={styles.user}>
        <span className={styles.comment__name}>{comment.userName}</span>
        <span className={styles.comment__date}>{comment.date}</span>
      </span>
    </div>
    <ul className={styles.comment__rating}>
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
    {comment.body && <p className={styles.comment__body}>{comment.body}</p>}
  </div>
);
