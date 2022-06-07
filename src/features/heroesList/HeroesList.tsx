import './heroesList.scss';

import { FC, ReactElement, useEffect } from 'react';

import HeroesListItem from '../heroListItem/HeroesListItem';
import { useAppSelector, useAppDispatch } from '../../hooks/useTypedSelectorAndDispatch';
import { useHttp } from '../../hooks/http.hook';
import { heroesFetching, fetchHeroesGet, fetchHeroesDelete } from './heroesListSlice';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import { IHeroesList } from '../../types/heroesType';

const HeroesList: FC = (): ReactElement => {
    const heroesList = useAppSelector(state => { //Выводим элементы по значению фильтрации через useTypedSelector
        if (state.heroes.heroesFilter === 'all') {
            return state.heroes.heroesList
        } else {
            return state.heroes.heroesList.filter(item => item.element === state.heroes.heroesFilter)
        }
    });

    const { heroesStatusLoading } = useAppSelector(state => state.heroes);
    const dispatch = useAppDispatch();

    const { request } = useHttp();

    useEffect(() => {
        dispatch(heroesFetching());

        dispatch(fetchHeroesGet(request));
        
        // eslint-disable-next-line
    }, [])

    if (heroesStatusLoading === 'loading') {
        return <Spinner />
    } else if (heroesStatusLoading === 'error') {
        return <ErrorMessage />
    }

    const heroesListFunc = (arr: IHeroesList[]): ReactElement => {
        if (heroesList.length === 0) {
            return <h5 className="text-center mt-5">Героев пока нет...</h5>
        }

        return (
            <>
                {
                    arr.map(({id, name, description, element}) => {
                        return (
                            <HeroesListItem
                                key={id} name={name}
                                description={description}
                                element={element}
                                onDelete={() => dispatch(fetchHeroesDelete(request, id))} />
                        )
                    })
                }
            </>
        )
    }

    const heroesListResult = heroesListFunc(heroesList);

    return (
        <ul>
            {heroesListResult}
        </ul>
    );
};

export default HeroesList;