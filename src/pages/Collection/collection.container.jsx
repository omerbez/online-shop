import CollectionPage from '../Collection/collection.component';
import { connect } from 'react-redux';
import WithSpinner from '../../components/with-spinner/with-spinner.component';
import { selectIsFetching } from '../../redux/shop/shop.selectors'



const mapStateToProps = (rootReducer) => {
    return {
        isFetching: selectIsFetching(rootReducer)
    }
}

const CollectionPageContainer = connect(mapStateToProps)(WithSpinner(CollectionPage))

export default CollectionPageContainer;