import React, { PropTypes } from 'react';
import PlusImg from './plus.png';
import MinusImg from './minus1.png';
import { Modal } from 'react-bootstrap';

function WalletRow (props) { return <tr>
                <td>
                    <a  onClick={()=>{props.onAddButtonClick(props.name)}}><span className="plus"><img src={PlusImg} alt="GlobalCoinDex" /></span></a>
                    <a ><span className="minus1"><img src={MinusImg} alt="GlobalCoinDex" /></span></a>
                </td>
                <td>{props.name}</td>
                <td>{props.sum}</td>
                <td>{props.bal}</td>
                <td>0.000007</td>
                <td>0.000007</td>
                <td>0.0000058</td>
                <td>0.0000058</td>
                <td>12.5%</td>
            </tr>

          };

          // We require the use of src and alt, only enforced by react in dev mode


export default WalletRow;
