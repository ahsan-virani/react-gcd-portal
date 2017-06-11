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


export {
	selectWallet,
	makeShowModal,
	makeCoinType,
	makeModalType
};
