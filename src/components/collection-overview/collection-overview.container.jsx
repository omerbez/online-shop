import { connect } from 'react-redux';
import WithSpinner from '../with-spinner/with-spinner.component';
import CollectionOverview from './collection-overview.component';
import { selectIsFetching } from '../../redux/shop/shop.selectors'

/** HOC Container pattern, the props injected stright to the component
 *  instead of passing through the shop-page component (which has not any use
 *  of those props..) 
 */

const mapStateToProps = (rootReducer) => {
    return {
        isFetching: selectIsFetching(rootReducer)
    }
}

//HOC pattern..
const CollectionOverviewWithSpinner = WithSpinner(CollectionOverview);

const CollectionOverviewContainer = connect(mapStateToProps)(CollectionOverviewWithSpinner)

export default CollectionOverviewContainer;
