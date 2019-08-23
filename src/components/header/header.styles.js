import styled, { css } from 'styled-components';
import {Link} from 'react-router-dom';

//for sharing the same style to multiple elements..
//there is a second way, make only one of the options (div or Link)
//and use the "as" attribute on the component props..
const OptionStyle = css`
    padding: 10px 15px;
    cursor: pointer;
`;

export const HeaderDivContainer = styled.div`
    height: 70px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 25px;
`;

export const LogoLinkContainer = styled(Link)`
    height: 100%;
    width: 70px;
    padding: 25px;
`;

export const OptionsDivContainer = styled.div`
    width: 50%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
`;

export const OptionLink = styled(Link)`
    ${OptionStyle}
`;

export const OptionDiv = styled.div`
    ${OptionStyle}
`;
