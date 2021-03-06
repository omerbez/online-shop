import React from 'react';
import './collection-preview.styles.scss';
import CollectionItem from '../collection-item/collection-item.component';

const CollectionPreview = (props) => (
    <div className="collection-preview">
        <h1 className="title">{props.title.toUpperCase()}</h1>
        <div className="preview">
            {
                props.items.filter((item, index) => {return index < 4;})
                     .map(item => (<CollectionItem 
                                        key={item.id}
                                        item={item}/>))
            }
        </div>
    </div>
)
    
export default CollectionPreview;


