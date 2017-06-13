import styled from 'styled-components';
import btn from './submit.png';

module.exports.FooterClass = styled.div `
padding: 75px 0 65px 0;
    border-bottom: 1px solid #2b2f33;
`;

module.exports.FooterH1 = styled.h1 `
font-size: 20px;
    color: #c0c0c0;
    font-weight: 300;
    margin-bottom: 35px;
    text-transform: uppercase;
`;

module.exports.Foot1 = styled.div `
float: left;
    width: 30%;
`;

module.exports.FootLogo = styled.div `

`;

module.exports.FootSocial = styled.div `
text-align: center;
    margin-top: 20px;
`;

module.exports.FootSocialLi = styled.li `
display: inline-block;
    color: #fff;
    margin-right: 5px;
`;

module.exports.FootSocialLiA = styled.a `
    &:first-child{
      padding: 10px 14px;
    }

    border: 1px solid #158dd3;
    border-radius: 50px;
    color: #158dd3;
    display: block;
    font-size: 14px;
    padding: 10px 11px;
`;

module.exports.FooterBtn = styled.button `
        background: url(${btn}) repeat scroll 0 0;
        border: medium none;
        border-radius: 0;
        cursor: pointer;
        font-size: 0;
        height: 41px;
        margin: 0 0 0 -4px;
        width: 39px;

`;
//
// // module.exports.FooterClass
//
//export default { FooterClass, FooterH1, Foot1, FootLogo, FootSocial, FootSocialLi, FootSocialLiA };
