pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Capped.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MKKToken is ERC20Capped, Ownable {
    uint8 private decimalsVal;
    constructor(
        string memory name_,
        string memory symbol_,
        uint8 decimals_,
        uint256 cap_,
        uint totalSupply_
    ) ERC20(name_, symbol_) ERC20Capped(cap_) {
        decimalsVal = decimals_;
        _mint(msg.sender, totalSupply_);
    }
    function decimals() public view virtual override returns (uint8) {
        return decimalsVal;
    }
    function mint(address account, uint256 amount) public onlyOwner {
        super._mint(account, amount);
    }
    function burn(uint256 amount) public {
        _burn(_msgSender(), amount);
    }
    function burnFrom(address account, uint256 amount) public onlyOwner {
        _spendAllowance(account, _msgSender(), amount);
        _burn(account, amount);
    }
}
