import { FC, ReactElement, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { useAppSelector, useAppDispatch } from '../../hooks/useTypedSelectorAndDispatch';
import { useHttp } from '../../hooks/http.hook';
import { filtersFetching, fetchFiltersGet } from './heroesAddFormSlice';
import { fetchHeroesPost } from '../heroesList/heroesListSlice';
import { IFiltersList } from '../../types/heroesAddFormType';
import { IHeroesList } from '../../types/heroesType';

const HeroesAddForm: FC = (): ReactElement => {
    const { filtersList, filtersStatusLoading } = useAppSelector(state => state.filters);
    const dispatch = useAppDispatch();

    const { request } = useHttp();

    useEffect(() => {
        dispatch(filtersFetching());

        dispatch(fetchFiltersGet(request));

        // eslint-disable-next-line
    }, [])

    const filtersListFunc = (arr: IFiltersList[], status: string): ReactElement => {
        if (status === 'loading') {
            return <option value="">Идет загрузка...</option>
        } else if (status === 'error') {
            return <option value="">Oooops, ошибка...</option>
        }


        if (filtersList.length === 0) {
            return <option value="">Фильтры отсутствуют...</option>
        }

        return (
            <>
                {
                    arr.map(({name, label}) => {
                        if (name === 'all') return;

                        return (
                            <option key={label} value={name}>{label}</option>
                        )
                    })
                }
            </>
        )
    }

    let [name, setName] = useState<string>('');
    let [skill, setSkill] = useState<string>('');
    let [elem, setElem] = useState<string>('');

    let id = uuidv4();

    const addHero = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();

        const dataHero: IHeroesList = {
            id: id,
            name: name,
            description: skill,
            element: elem
        }

        dispatch(fetchHeroesPost(request, dataHero));
            
        setName('');
        setSkill('');
        setElem('');
    }

    return (
        <form className="border p-4 shadow-lg rounded" onSubmit={addHero}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                <input 
                    required
                    type="text" 
                    name="name" 
                    className="form-control" 
                    id="name" 
                    placeholder="Как меня зовут?"
                    value={name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)} />
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Описание</label>
                <textarea
                    required
                    name="text" 
                    className="form-control" 
                    id="text" 
                    placeholder="Что я умею?"
                    style={{'height': '130px'}}
                    value={skill}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setSkill(e.target.value)} />
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                <select 
                    required
                    className="form-select" 
                    id="element" 
                    name="element"
                    value={elem}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setElem(e.target.value)} >
                    <option value="">Я владею элементом...</option>
                    {filtersListFunc(filtersList, filtersStatusLoading)}
                </select>
            </div>

            <button type="submit" className="btn btn-primary">Создать</button>
        </form>
    );
};

export default HeroesAddForm;