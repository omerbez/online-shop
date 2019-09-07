import React, {lazy, Suspense} from 'react';
import Spinner from '../../components/spinner/spinner.component';
import { Route } from 'react-router-dom';

import { connect } from 'react-redux';
import { notifyFetchStart } from '../../redux/shop/shop.actions';

const CollectionOverviewContainer = lazy(() => import("../../components/collection-overview/collection-overview.container"))
const CollectionPageContainer = lazy(() => import("../Collection/collection.container"));


class ShopPage extends React.Component
{
    componentDidMount() {
        //This will notify our saga which listener to that notification..
        this.props.fetchCollectionsData();
    }

    render() {

        return  <div className="shop-page">
                    <Suspense fallback={<Spinner/>}>
                        <Route 
                            exact path={this.props.match.path}
                            component={CollectionOverviewContainer}/> 

                        <Route 
                            path={`${this.props.match.path}/:collectionId`} 
                            component={CollectionPageContainer} />
                    </Suspense>
                </div>
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        fetchCollectionsData: () => dispatch(notifyFetchStart())
    }
}

export default connect(null, mapDispatchToProps)(ShopPage);