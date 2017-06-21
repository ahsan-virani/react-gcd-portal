/*
 * HomeConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const ADD_COIN = 'gcd/Wallet/ADD_COIN';
export const WITHDRAW_COIN = 'gcd/Wallet/WITHDRAW_COIN';
export const MODAL_ADD_COIN = 'gcd/Wallet/MODAL_ADD_COIN';
export const MODAL_WITHDRAW_COIN = 'gcd/Wallet/MODAL_WITHDRAW_COIN';
export const REQUEST_ADDRESS = 'gcd/Wallet/REQUEST_ADDRESS';
export const COIN_LIST = 'gcd/Wallet/COIN_LIST';
export const COIN_LIST_RECIEVED = 'gcd/Wallet/COIN_LIST_RECIEVED';
export const ADDRESS_RECIEVED = 'gcd/Wallet/ADDRESS_RECIEVED';
export const CHANGE_FORM = 'gcd/Wallet/CHANGE_FORM';
export const SEND_COIN = 'gcd/Wallet/SEND_COIN';
export const SEND_COIN_RESPONSE = 'gcd/Wallet/SEND_COIN_RESPONSE';
export const SEND_COIN_RESPONSE_SUCCESS = 'gcd/Wallet/SEND_COIN_RESPONSE_SUCCESS';
