import React, { PropTypes } from 'react';
import PlusImg from './plus.png';
import MinusImg from './minus1.png';
import { Modal } from 'react-bootstrap';

function WalletRow (props) {

  return <tr>
                <td>
                    <a  onClick={()=>{props.onAddButtonClick(props.symbol)}}>  <span className="plus"><img src={PlusImg} alt="GlobalCoinDex" /></span></a>
                    <a onClick={()=>{props.onMinusButtonClick(props.symbol)}}> <span className="minus1"><img src={MinusImg} alt="GlobalCoinDex" /></span></a>
                </td>
                <td>{props.currencyName}</td>
                <td>{props.symbol}</td>
                <td>{props.availableBalance}</td>
                <td>{props.pendingDeposit}</td>
                <td>{props.reserved}</td>
                <td>{props.total}</td>
                <td>{props.estValue}</td>
                <td>{props.change}</td>
            </tr>

          };

          // We require the use of src and alt, only enforced by react in dev mode


export default WalletRow;
