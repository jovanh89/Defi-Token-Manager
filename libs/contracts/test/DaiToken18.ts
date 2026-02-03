import { expect } from 'chai';
import hre from 'hardhat';

const ethers = hre.ethers;

describe('DaiToken18', function () {
  it('Should deploy and have correct name and symbol', async function () {
    const DaiToken18 = await ethers.getContractFactory('DaiToken18');
    const dai = await DaiToken18.deploy();
    expect(await dai.name()).to.equal('DaiToken18');
    expect(await dai.symbol()).to.equal('TUCUDAI');
  });

  it('Should mint tokens to an address', async function () {
    const [owner, addr1] = await ethers.getSigners();
    const DaiToken18 = await ethers.getContractFactory('DaiToken18');
    const dai = await DaiToken18.deploy();
    await dai.mint(addr1.address, 1000);
    expect(await dai.balanceOf(addr1.address)).to.equal(1000);
  });
});
