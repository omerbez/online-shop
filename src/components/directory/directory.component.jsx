import React from 'react';
import "../menu-item/menu-item.component";
import "./directory.styles.scss";
import MenuItem from '../menu-item/menu-item.component';
import { connect } from 'react-redux';
import { selectDirectorySections } from '../../redux/directory/directory.selectors';

const Directory = (props) => {
    return <div className="directory-menu">
                {props.sections.map((item) => {
                    return <MenuItem 
                                key={item.id}
                                title={item.title}
                                imageURL={item.imageUrl}
                                size={item.size}
                                linkUrl={item.linkUrl}/>
                    })};
            </div>
}

const mapStateToProps = (rootReducer) => {
    return {
        sections: selectDirectorySections(rootReducer)
    }
};

export default connect(mapStateToProps)(Directory);