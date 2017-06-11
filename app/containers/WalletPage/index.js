import React from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import BannerImg from './inner-banner.jpg';
import { Table ,Grid, Row ,Col,Clearfix } from 'react-bootstrap';
import './style.css';
import WalletRecordRow from 'components/WalletRow';



export default class WalletPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

     getRowForWalletRecord(name, sum, bal){
     var rows = [];
     for (var i =0; i<5; i++){
       rows.push(<WalletRecordRow name={name} sum={sum} bal={bal}/>)
     }
     return rows;
   }

  render() {

    var rows = this.getRowForWalletRecord("abc", "abc", "anc");

    return (
      <div >
        <Helmet
          title="Wallet"
          meta={[
            { name: 'description', content: 'Cryptocurrency trading platform' },
          ]}
        />
      <img className="bannerImg" src={BannerImg} alt="GlobalCoinDex" />

        <div className="captionBanner">
            <h2>WALLET </h2>
        </div>

        <Grid>
          <Row className="show-grid balances">
            <h1>ACCOUNT BALANCES (ESTIMATED VALUE: 0.00000000 BTC) </h1>

              <Table responsive>
                <thead>
                  <tr>
                    <th>+</th>
                    <th>Currency Name</th>
                    <th>SYMBOL</th>
                    <th>AVAILABLE BALANCE</th>
                    <th>PENDING DEPOSIT</th>
                    <th>RESERVED</th>
                    <th>TOTAL</th>
                    <th>EST. BTC VALUE</th>
                    <th>% CHANGE</th>
                  </tr>
                </thead>
                {rows}
              </Table>

          </Row>


        <Row className="show-grid pending">
              <Col md={6} sm={12} lg={6} className="pwithdrawls">
                  <h1>PENDING WITHDRAWALS</h1>
                  <table>
                      <tr>
                          <td>+</td>
                          <td>DATE</td>
                          <td>CURRENCY</td>
                          <td>UNITS</td>
                          <td>+</td>
                      </tr>
                      <tr>
                          <td colSpan="5">You have no pending withdrawals.</td>
                      </tr>
                  </table>
              </Col>

              <Col md={6} sm={12} lg={6} className="pdeposits">
                  <h1>PENDING DEPOSITS</h1>
                  <table>
                      <tr>
                          <td>+</td>
                          <td>DATE</td>
                          <td>CURRENCY</td>
                          <td>UNITS</td>
                          <td>+</td>
                      </tr>
                      <tr>
                          <td colSpan="5">You have no pending withdrawals.</td>
                      </tr>
                  </table>
              </Col>
              <Clearfix ></Clearfix>

            <Col md={6} sm={12} lg={6} className="hwithdrawls">
                  <h1>WITHDRAWAL HISTORY</h1>
                  <table>
                      <tr>
                          <td>+</td>
                          <td>DATE</td>
                          <td>CURRENCY</td>
                          <td>UNITS</td>
                          <td>+</td>
                      </tr>
                      <tr>
                          <td colSpan="5">You have no pending withdrawals.</td>
                      </tr>
                  </table>
              </Col>
              <Col md={6} sm={12} lg={6} className="hdeposits">
                  <h1>DEPOSIT HISTORY</h1>
                  <table>
                      <tr>
                          <td>+</td>
                          <td>DATE</td>
                          <td>CURRENCY</td>
                          <td>UNITS</td>
                          <td>+</td>
                      </tr>
                      <tr>
                          <td colSpan="5">You have no pending withdrawals.</td>
                      </tr>
                  </table>
              </Col>
              <Clearfix></Clearfix>

        </Row>

        </Grid>
    </div>
    );
  }


}
