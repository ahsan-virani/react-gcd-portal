import { createSelector } from 'reselect';

const selectWallet = (state) => state.get('wallet');

const makeShowModal = () => createSelector(
	selectWallet,
	(walletState) => walletState.get('showModal')
);

const makeModalType = () => createSelector(
	selectWallet,
	(walletState) => walletState.get('modalType')
);

const makeCoinType = () => createSelector(
	selectWallet,
	(walletState) => walletState.get('coinType')
);

const makeCoinList = () => createSelector(
	selectWallet,
	(walletState) => walletState.get('coins')
);

const makeAddress = () => createSelector(
	selectWallet,
	(walletState) => walletState.get('address')
);

const makeAmount = () => createSelector(
	selectWallet,
	(walletState) => walletState.get('amount')
);

const makeSendingAddress = () => createSelector(
	selectWallet,
	(walletState) => walletState.get('sendingAddress')
);

const makeSendCoinResponse = () => createSelector(
	selectWallet,
	(walletState) => {
		return {
			resultResponseStatus: walletState.get('resultResponseStatus'),
			resultResponse: walletState.get('resultResponse')
		}
	}
);

const makeSendCoinInProgress = () => createSelector(
	selectWallet,
	(walletState) => walletState.get('sendCoinInProgress')
);



export {
	selectWallet,
	makeShowModal,
	makeCoinType,
	makeModalType,
	makeCoinList,
	makeAddress,
	makeAmount,
	makeSendingAddress,
	makeSendCoinResponse,
	makeSendCoinInProgress,

};
