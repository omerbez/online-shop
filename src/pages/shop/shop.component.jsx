import React from 'react';
import CollectionOverview from '../../components/collection-overview/collection-overview.component';
import { Route } from 'react-router-dom';
import CollectionPage from '../Collection/collection.component';

import { firestore, parseShopCollectionSnapshot } from '../../firebase/firebase.utils';
import { connect } from 'react-redux';
import { updateCollections } from '../../redux/shop/shop.actions';
import WithSpinner from '../../components/with-spinner/with-spinner.component';


//HOC pattern..
const CollectionOverviewWithSpinner = WithSpinner(CollectionOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);


class ShopPage extends React.Component
{
    constructor() {
        super();
        this.unsubscribeFromSnapshot = null;
        this.state = {
            loading: true
        }
    }

    componentDidMount() {
        const collectionRef = firestore.collection("collections");

        //get the collection from firebase
        this.unsubscribeFromSnapshot = collectionRef.onSnapshot(async (snapshot) => {
            const collectionMap = parseShopCollectionSnapshot(snapshot);
            this.props.updateCollections(collectionMap)
            this.setState({loading: false});
        });
    }

    componentWillUnmount() {
        this.unsubscribeFromSnapshot();
    }

    render() {
        const { loading } = this.state;

        return  <div className="shop-page">
                    <Route 
                        //the render property get a function wich recieve the Route component's props..
                        exact path={this.props.match.path}
                        render={(props) => <CollectionOverviewWithSpinner loading={loading} {...props}/>} />

                    <Route 
                        path={`${this.props.match.path}/:collectionId`} 
                        render={(props) => <CollectionPageWithSpinner loading={loading} {...props}/>} />
                </div>
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateCollections: (collectionsData) => dispatch(updateCollections(collectionsData))
    }
}



export default connect(null, mapDispatchToProps)(ShopPage);