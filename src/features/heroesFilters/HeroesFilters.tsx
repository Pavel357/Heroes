import { FC, ReactElement, useEffect } from 'react';
import classNames from 'classnames';

import { useAppSelector, useAppDispatch } from '../../hooks/useTypedSelectorAndDispatch';
import { useHttp } from '../../hooks/http.hook';
import { filtersFormFetching, fetchFiltersForm } from './heroesFiltersSlice';
import { IFiltersFormList } from '../../types/heroesFiltersType';
import { heroesFilter } from '../heroesList/heroesListSlice';

const HeroesFilters: FC = (): ReactElement => {
    const { filtersFormList, filtersFormStatusLoading } = useAppSelector(state => state.filtersFormSlice);

    const dispatch = useAppDispatch();

    const { request } = useHttp(); 

    useEffect(() => {
        dispatch(filtersFormFetching());

        dispatch(fetchFiltersForm(request));
        
        // eslint-disable-next-line
    }, [])

    const heroesFilterActive = useAppSelector(state => state.heroes.heroesFilter); //1. Получаем state фильтра для изменения активного класса

    const onFilter = (e: React.MouseEvent<HTMLButtonElement>, name: string): void => { //2. Создаем функцию, которая будет изменять значение фильтра
        dispatch(heroesFilter(name))
    }

    const filterFormListFunc = (arr: IFiltersFormList[], loading: string): ReactElement => {
        if (loading === 'loading') {
            return <div>Идет загрузка...</div>
        } else if (loading === 'error') {
            return <div>Ooops, ошибка...</div>
        }

        if (filtersFormList.length === 0) {
            return <h5 className="text-center mt-5">Фильтры отсутствуют...</h5>
        }

        let btnClass: string;

        return (
            <>
                {
                    arr.map(({name, label, className}) => {
                        btnClass = classNames('btn', className, { 'active': name === heroesFilterActive}); //3. Устанавливаем активный класс, в зависимости от state фильтра

                        return (
                            <button
                                key={name}
                                id={name}
                                className={btnClass}
                                onClick={(e) => onFilter(e, name)} >
                                    {label}
                            </button>
                        )
                    })
                }
            </>
        )
    }

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    { filterFormListFunc(filtersFormList, filtersFormStatusLoading) }
                </div>
            </div>
        </div>
    );
};

export default HeroesFilters;