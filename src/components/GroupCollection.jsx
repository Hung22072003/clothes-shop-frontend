import React from 'react';
import list_category from '../data/list_category';
import ItemCollection from './ItemCollection';
const GroupCollection = () => {
    const list_id_category = [8, 9, 10, 11, 15, 16, 17, 19];
    return (
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            {list_id_category.map((id_category) => (
                <div key={id_category}>
                    <ItemCollection id_category={id_category} />
                </div>
            ))}
        </div>
    );
};

export default GroupCollection;
