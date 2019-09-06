import React from 'react';
import CustomButton from '../custom-button/custom-button.component';
import { connect } from 'react-redux';
import { addItem } from '../../redux/cart/cart.actions';
import {
    CollectionItemContainer,
    CollectionFooterContainer,
    AddButton,
    BackgroundImage,
    NameContainer,
    PriceContainer
  } from './collection-item.styles';

const CollectionItem = (props) => {
    
    //distruct the properties..
    const {name, price, imageUrl} = props.item; 

    return <CollectionItemContainer>
                <BackgroundImage className='image' imageUrl={imageUrl} />
                <CollectionFooterContainer>
                    <NameContainer>{name}</NameContainer>
                    <PriceContainer>{price}</PriceContainer>
                </CollectionFooterContainer>

                <AddButton  
                    inverted={true}
                    onClick={()=>props.addCartItem(props.item)}>
                        Add to cart
                </AddButton>
            </CollectionItemContainer>
}

const mapDispatchToProps = (dispatch) => (
    {
        //name: action which represent the action in our cart.actions redux file.
        addCartItem: (item) => {return dispatch(addItem(item))}
    }
);

export default connect(null, mapDispatchToProps)(CollectionItem);