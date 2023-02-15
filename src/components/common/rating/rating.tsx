import { FC } from 'react';
import iconStar from '../../../assets/Icon_star.svg';
import iconOutlinedStar from '../../../assets/Icon_unstar.svg';

interface IProps {
  rating: number | null;
}

export const Rating: FC<IProps> = ({ rating }) => (
  <>
    {[...Array(5)].map((_, index) =>
      index < Math.round(rating!) ? (
        <img key={Math.round(index)} src={iconStar} alt='star icon' />
      ) : (
        <img key={Math.round(index)} src={iconOutlinedStar} alt='star icon' />
      )
    )}
  </>
);
