import React from 'react';
import SHOP_DATA from './shop.data';
import CollectionPreview from '../../components/collection-preview/collection-preview.component';

class ShopPage extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {
            collections: SHOP_DATA
        }
    }

    render() {
        //distruct the state.collections
        const {collections} = this.state;
        
        return <div className="shop-page">
                    {
                        collections.map((item) => (
                            <CollectionPreview 
                                key={item.id} 
                                title={item.title} 
                                items={item.items}/>
                        ))
                    }
               </div>
    }
}

export default ShopPage;