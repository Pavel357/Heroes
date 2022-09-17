import './app.scss';

import { FC, ReactElement } from 'react';

import HeroesList from '../heroesList/HeroesList';
import HeroesAddForm from '../heroesAddForm/HeroesAddForm';
import HeroesFilters from '../heroesFilters/HeroesFilters';

const App: FC = (): ReactElement => {
    return (
        <main className="app">
            <div className="content">
                <HeroesList />
                <div className="content__interactive">
                    <HeroesAddForm />
                    <HeroesFilters />
                    <p>Тестовый абзац</p>
                </div>
            </div>
        </main>
    );
};

export default App;
