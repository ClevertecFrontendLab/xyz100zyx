import {FC, useState} from 'react';
import styles from './main-page.module.scss';
import { FilterBar} from "../../components/filter-bar/filter-bar";
import {BooksList} from "../../components/books-list/books-list";
import { DisplayType } from '../../components/types';

export const MainPage: FC = () => {

    const [listView, setListView] = useState<DisplayType>('linear');

    return (
        <div className={styles.wrapper}>
            <FilterBar displayState={listView} onViewManagerClick={setListView} />
            <BooksList displayTemplate={listView} />
        </div>
    );
}
