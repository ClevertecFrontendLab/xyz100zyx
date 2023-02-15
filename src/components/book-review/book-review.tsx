import { FC } from 'react';
import styles from './book-review.module.scss';
import userReviewImg from '../../assets/user-review.jpg';
import { ReactComponent as IconStarFill } from '../../assets/star-icon.svg';
import { ReactComponent as IconStarUnfill } from '../../assets/star-icon-unfill.svg';
import { Review } from '../../types/data.types';
import { getCommentDate } from '../../utils/date.utils';

interface IProps {
  comment: Review;
}

export const BookReview: FC<IProps> = ({ comment }) => (
  <div className={styles.comment}>
    <div className={styles.comment__user}>
      <a href='#'>
        <img src={userReviewImg} alt='comment info' />
      </a>
      <span className={styles.user}>
        <span className={styles.comment__name}>
          {comment.user.firstName} {comment.user.lastName}
        </span>
        <span className={styles.comment__date}>{comment.createdAt}</span>
      </span>
    </div>
    <ul className={styles.comment__rating}>
      {[...Array(5)].map((_, index) =>
        index < Math.round(comment.rating) ? (
          <li key={comment.text[index]}>
            <IconStarFill />
          </li>
        ) : (
          <li>
            <IconStarUnfill key={comment.text[index]}/>
          </li>
        )
      )}
    </ul>
    {comment.text && <p className={styles.comment__body}>{comment.text}</p>}
  </div>
);
