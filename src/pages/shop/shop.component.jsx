import React from 'react';
import CollectionOverview from '../../components/collection-overview/collection-overview.component';
import { Route } from 'react-router-dom';
import CollectionPage from '../Collection/collection.component';


const ShopPage = (props) => {
    return  <div className="shop-page">
                <Route exact path={props.match.path} component={CollectionOverview}/>
                <Route path={`${props.match.path}/:collectionId`} component={CollectionPage} />
            </div>
}



export default ShopPage;