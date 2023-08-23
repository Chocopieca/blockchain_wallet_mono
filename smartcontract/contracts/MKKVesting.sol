pragma solidity ^0.8.18;

import "@openzeppelin/contracts/finance/VestingWallet.sol";

contract MKKVesting is VestingWallet {
    address beneficiaryAddress;
    constructor(
        address beneficiaryAddress_,
        uint64 startTimestamp_,
        uint64 durationMonth_
    ) VestingWallet(
        beneficiaryAddress_,
        startTimestamp_,
        durationMonth_ * 30 * 24 * 60 * 60
    ) {
    }
}
