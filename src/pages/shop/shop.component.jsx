import React from 'react';
import { Route } from 'react-router-dom';

import { connect } from 'react-redux';
import { notifyFetchStart } from '../../redux/shop/shop.actions';

import CollectionOverviewContainer from '../../components/collection-overview/collection-overview.container';
import CollectionPageContainer from '../Collection/collection.container'


class ShopPage extends React.Component
{
    componentDidMount() {
        //This will notify our saga which listener to that notification..
        this.props.fetchCollectionsData();
    }

    render() {

        return  <div className="shop-page">
                    <Route 
                        exact path={this.props.match.path}
                        component={CollectionOverviewContainer}/> 

                    <Route 
                        path={`${this.props.match.path}/:collectionId`} 
                        component={CollectionPageContainer} />
                </div>
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        fetchCollectionsData: () => dispatch(notifyFetchStart())
    }
}

export default connect(null, mapDispatchToProps)(ShopPage);