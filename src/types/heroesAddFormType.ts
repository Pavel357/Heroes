export interface IFiltersList {
    name: string;
    label: string;
    className: string;
}

export interface IFiltersState {
    filtersList: IFiltersList[];
    filtersStatusLoading: string;
}