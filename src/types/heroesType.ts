export interface IHeroesList {
    id: string | number;
    name: string;
    description: string;
    element: string;
}

export interface IHeroesState {
    heroesList: IHeroesList[];
    heroesStatusLoading: string;
    heroesFilter: string;
}

export interface IHero {
    name: string;
    text: string;
    element: string;
}