import React from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import BannerImg from './inner-banner.jpg';
import { FormGroup, ControlLabel, FormControl, Modal, Button, Table, Grid, Row, Col, Clearfix } from 'react-bootstrap';
import './style.css';
import WalletRecordRow from 'components/WalletRow';
import { addCoin, withdrawCoin, requestAddress, coins } from './actions';
import { makeShowModal, makeModalType, makeCoinType, makeCoinList, makeAddress } from './selectors';
import { fromJS } from 'immutable';
import { MODAL_ADD_COIN, MODAL_WITHDRAW_COIN, COIN_LIST } from './constants';



class WalletPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

	getRowForWalletRecord(coin) {
		return (<WalletRecordRow currencyName={coin.get('currencyName')} symbol={coin.get('symbol')} availableBalance={coin.get('availableBalance')}
         pendingDeposit={coin.get('pendingDeposit')} reserved={coin.get('reserved')} total={coin.get('total')} estValue={coin.get('estValue')} change={coin.get('change')}
          onAddButtonClick={this.onRowAddButtonClick.bind(this)} onMinusButtonClick={this.onRowMinusButtonClick.bind(this)} />);
	}

	onRowAddButtonClick(name) {
		console.log('coin Name ', name);
		this.props.onAddCoin(true, name);
	}

	onRowMinusButtonClick(name) {

		console.log(this.props.modalType);
		this.props.onWithdrawCoin(true, name);
	}

	render() {

		var rows = this.props.coins.map((coin) => {
			return this.getRowForWalletRecord(coin);
		});


		var modalContentAdd = (

			<form className="form-horizontal" >
        <FormGroup controlId="formHorizontalEmail">
          <Col componentClass={ControlLabel} sm={2}>
            Address
          </Col>
          <Col sm={8}>
            <FormControl  type="text" value={this.props.address} readOnly/>
          </Col>
        </FormGroup>
      </form>
		);


		var modalContentWithdraw = (
			<form className="form-horizontal" >
        <FormGroup controlId="formHorizontalEmail">
          <Col componentClass={ControlLabel} sm={2}>
            Bitcoin Amount
          </Col>
          <Col sm={8}>
            <FormControl  type="text" value={this.props.email} />
          </Col>
        </FormGroup>
        <FormGroup controlId="formHorizontalEmail">
          <Col componentClass={ControlLabel} sm={2}>
            Address
          </Col>
          <Col sm={8}>
            <FormControl  type="text" value={this.props.email} />
          </Col>
        </FormGroup>
      </form>
		);

		return (

			<div >
        <Modal show={this.props.showModal} onHide={()=>this.props.onAddCoin(false)} backdrop="static">
            <Modal.Header closeButton>
              <Modal.Title>{ this.props.modalType == MODAL_ADD_COIN ?  'Generate Address' : 'Transfer' }</Modal.Title>
            </Modal.Header>
            <Modal.Body>

              { this.props.modalType == MODAL_ADD_COIN ?  modalContentAdd : modalContentWithdraw }

            </Modal.Body>
            <Modal.Footer>
              <Button onClick={()=>this.props.onRequestAddress(this.props.coinType)}>{ this.props.modalType == MODAL_ADD_COIN ?  'Generate Address' : 'Transfer' }</Button>
            </Modal.Footer>
          </Modal>

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


const mapStateToProps = createStructuredSelector({
	showModal: makeShowModal(),
	modalType: makeModalType(),
	coinType: makeCoinType(),
	coins: makeCoinList(),
	address: makeAddress(),
});

export function mapDispatchToProps(dispatch) {
	return {
		onAddCoin: (show, name) => dispatch(addCoin(show, name)),
		onWithdrawCoin: (show, name) => dispatch(withdrawCoin(show, name)),
		onRequestAddress: (coinType) => dispatch(requestAddress(coinType)),
	};
}


// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(WalletPage);
