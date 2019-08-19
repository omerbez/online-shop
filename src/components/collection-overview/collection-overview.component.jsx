import React from 'react';
import './collections-overview.styles.scss';
import CollectionPreview from '../../components/collection-preview/collection-preview.component';
import { connect } from 'react-redux';
import { selectCollectionsForPreview } from '../../redux/shop/shop.selectors';


const CollectionOverview = (props) => (
    <div className="collection-overview">
        {
            props.collections.map((item) => (
                <CollectionPreview 
                    key={item.id} 
                    title={item.title} 
                    items={item.items}/>
            ))
        }
    </div>
);

const mapStateToProps = (rootReducer) => {
    return {
        collections: selectCollectionsForPreview(rootReducer)
    }
}

export default connect(mapStateToProps)(CollectionOverview);