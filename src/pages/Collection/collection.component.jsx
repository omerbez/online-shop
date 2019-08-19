import React from 'react';
import './collection.styles.scss';
import CollectionItem from '../../components/collection-item/collection-item.component';
import { selectCollection } from '../../redux/shop/shop.selectors';
import { connect } from 'react-redux';


const CollectionPage = (props) => (
    <div className="collection-page">
        <h2 className="title">{props.collection.title}</h2>
        <div className="items">
            {
                props.collection.items.map((item) => <CollectionItem key={item.id} item={item}/>)
            }
        </div>
    </div>
);


const mapStateToProps = (rootReducer, ownProps) => {
    return {
        //first we invoke the selectCollection function, and then the selector which it return
        collection: selectCollection(ownProps.match.params.collectionId)(rootReducer)
    }
}

export default connect(mapStateToProps)(CollectionPage);