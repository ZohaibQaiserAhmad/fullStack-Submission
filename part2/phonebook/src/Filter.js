import React from 'react'


const Filter = (props) => {

    const { setFilter, filter } = props;

    //handle filter
    const handleFilter = (event) => {
        //set filter
        let filter = event.target.value;
        setFilter(filter);
    }


    return (
        <div>filters shown with <input value={filter} onChange={handleFilter} /></div>
    )

}

export default Filter;