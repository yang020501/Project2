import React, { useState } from 'react'
import SearchIcon from '@mui/icons-material/Search'
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';


const Searchbar = ({ placeholder, data }) => {
 
    const [filteredData, setFilteredData] = useState([]);
    const [wordEntered, setWordEntered] = useState("");

    const handleFilter = (event) => {
        const searchWord = event.target.value;
        setWordEntered(searchWord);
        const newFilter = data.filter((value) => {         
            return normalizeStr(value.title).toLowerCase().includes(normalizeStr(searchWord).toLowerCase());
        });

        if (searchWord === "") {
            setFilteredData([]);
        } else {
            setFilteredData(newFilter);
        }
    };
    // cchuẩn hóa chuỗi về dạng không dấu
    const normalizeStr = (str) => {
        return str.normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/đ/g, 'd').replace(/Đ/g, 'D');
    }

    const clearInput = () => {
        setFilteredData([]);
        setWordEntered("");
    };
    return (
        <div className="search">
            <div className="search-inputs">
                <input
                    type="text"
                    placeholder={placeholder}
                    value={wordEntered}
                    onChange={handleFilter}
                />
                <div className="search-icon">
                    {filteredData.length === 0 ? (
                        <SearchIcon />
                    ) : (
                        <CloseIcon id="clearBtn" onClick={clearInput} />
                    )}
                </div>
            </div>
            <div className={`search-data ${filteredData.length !== 0 ? 'active' : ''}`}>
                {filteredData.length != 0 && (

                    filteredData.slice(0, 15).map((value, key) => {
                        return (
                            <Link key={key} className="search-data-item" to={`/catalog/${value.slug}`}>
                                <p>{value.title} </p>
                            </Link>

                        );
                    })
                )
                }


            </div>
        </div>
    )
}

export default Searchbar
