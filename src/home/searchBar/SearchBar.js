import React, { useState } from 'react';
import home from '../home.module.scss';
import styles from './SearchBar.module.scss';


const SearchBar = () => {
    const [searchValue, setSearchValue] = useState('');

    const onSearch = (event) => {
        event.preventDefault();
        const searchUrl = 'https://www.google.com/search?q=';
        window.open(searchUrl + searchValue, '_self');
        setSearchValue('');
    };

    const handleChange = (event) => {
        setSearchValue(event.target.value);
    };

    return (
        <section className={`${home.search_bar} ${styles.search_bar}`}>
            <form>
                <input type="text" placeholder="Google..." value={searchValue} onChange={handleChange} />
                <button type="submit" onClick={onSearch}>Search</button>
            </form>
        </section>
    );
};

export default SearchBar; 