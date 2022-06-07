import { FC, ReactElement } from 'react';

interface IHeroesList {
    name: string;
    description: string;
    element: string;
    onDelete?: () => void //1. Добавляем в типизацию
}

const HeroesListItem: FC<IHeroesList> = ({name, description, element, onDelete}): ReactElement => { //2. Передаем в props
    let clazz: string;

    switch (element) {
        case 'fire':
            clazz = 'bg-danger bg-gradient';
            break;
        case 'wind':
            clazz = 'bg-success bg-gradient'
            break;
        case 'water':
            clazz = 'bg-primary bg-gradient'
            break;
        default:
            clazz = 'bg-warning bg-gradient'
    }

    return (
        <li 
            className={`card flex-row mb-4 shadow-lg text-white ${clazz}`}>
            <img src="http://www.stpaulsteinbach.org/wp-content/uploads/2014/09/unknown-hero.jpg" 
                    className="img-fluid w-25 d-inline" 
                    alt="unknown hero" 
                    style={{'objectFit': 'cover'}}/>
            <div className="card-body">
                
                <h3 className="card-title">{name}</h3>
                <p className="card-text">{description}</p>
            </div>
            {/* 3. Вызываем props на элементе при клике */}
            <span onClick={onDelete} className="position-absolute top-0 start-100 translate-middle badge border rounded-pill bg-light">
                <button type="button" className="btn-close btn-close" aria-label="Close"></button>
            </span>
        </li>
    );
};

export default HeroesListItem;