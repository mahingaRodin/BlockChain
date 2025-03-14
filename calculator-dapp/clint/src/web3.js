import Web3 from 'web3';
import detectEthereumProvider from '@metamask/detect-provider';

const web3 = new Web3(detectEthereumProvider());

export default web3;
