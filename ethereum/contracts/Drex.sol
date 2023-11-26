// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

interface IERC20 {
    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function transfer(address recipient, uint256 amount) external returns (bool);
    function allowance(address owner, address spender) external view returns (uint256);
    function approve(address spender, uint256 amount) external returns (bool);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);   
    event Traansfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
}

contract RealDigital is IERC20 {
    string public constant name = "Real Digital";
    string public constant symbol = "DREX";
    uint8 public constant decimals = 6;

    address public owner;
    mapping(address => uint256) balances;
    mapping(address => mapping(address => uint256)) allowed;
    uint256 totalSupply_;

    constructor(uint256 initialSupply) {
        owner = msg.sender;
        totalSupply_ = initialSupply;
        balances[owner] = totalSupply_;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Somente o proprietario pode executar essa funcao");
        _;
    }

    function mint(uint256 _amount) public onlyOwner {
        totalSupply_ += _amount;
        balances[owner] += _amount;
        emit Transfer(address(0), owner, _amount);
    }

    function totalSupply() public override view returns (uint256) {
        return totalSupply_;
    }

    function balanceOf(address _tokenOwner) public override view returns (uint256) {
        return balances[_tokenOwner];
    }

    function transfer(address _receiver, uint256 _numTokens) public override returns (bool) {
        require(_numTokens <= balances[msg.sender]);
        balances[msg.sender] = balances[msg.sender] - _numTokens;
        balances[_receiver] = balances[_receiver] + _numTokens;
        emit Transfer(msg.sender, _receiver, _numTokens);
        return true;
    }

    function approve(address _delegate, uint256 _numTokens) public override returns (bool) {
        allowed[msg.sender][_delegate] = _numTokens;
        emit Approval(msg.sender, _delegate, _numTokens);
        return true;
    }

    function allowance(address _owner, address _delegate) public override view returns (uint) {
        return allowed[_owner][_delegate];
    }

    function transferFrom(address _owner, address _buyer, uint256 _numTokens) public override returns (bool) {
        require(_numTokens <= balances[_owner]);
        require(_numTokens <= allowed[_owner][msg.sender]);

        balances[_owner] = balances[owner] - _numTokens;
        allowed[_owner][msg.sender] = allowed[owner][msg.sender] - _numTokens;
        balances[_buyer] = balances[_buyer] + _numTokens;
        emit Transfer(_owner, _buyer, _numTokens);
        return true;
    }
}
