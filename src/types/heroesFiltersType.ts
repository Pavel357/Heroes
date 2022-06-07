export interface IFiltersFormList {
    name: string;
    label: string;
    className: string;
}

export interface IFiltersFormState {
    filtersFormList: IFiltersFormList[];
    filtersFormStatusLoading: string;
}