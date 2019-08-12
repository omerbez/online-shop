import React from 'react';
import './collection-item.styles.scss';
import CustomButton from '../custom-button/custom-button.component';
import { connect } from 'react-redux';
import { addItem } from '../../redux/cart/cart.actions';

const CollectionItem = (props) => {
    
    //distruct the properties..
    const {name, price, imageUrl} = props.item; 
    
    const inlineStyling = {
        backgroundImage: `url(${imageUrl})`
    }

    return <div className="collection-item">
                <div 
                    className="image"
                    style={inlineStyling}/>
                <div className="collection-footer">
                    <span className="name">{name}</span>
                    <span className="price">{price}</span>
                </div>

                <CustomButton 
                    inverted={true}
                    onClick={()=>props.addCartItem(props.item)}>
                        Add to cart
                </CustomButton>
           </div>
}

const mapDispatchToProps = (dispatch) => (
    {
        //name: action which represent the action in our cart.actions redux file.
        addCartItem: (item) => {return dispatch(addItem(item))}
    }
);

export default connect(null, mapDispatchToProps)(CollectionItem);