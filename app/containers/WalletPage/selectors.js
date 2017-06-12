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


export {
	selectWallet,
	makeShowModal,
	makeCoinType,
	makeModalType,
	makeCoinList,
	makeAddress,
};
