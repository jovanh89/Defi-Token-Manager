import { expect } from 'chai';
import hre from 'hardhat';

const ethers = hre.ethers;

describe('TucuToken', function () {
  it('Should deploy and have correct name and symbol', async function () {
    const TucuToken = await ethers.getContractFactory('TucuToken');
    const tucu = await TucuToken.deploy();
    expect(await tucu.name()).to.equal('TucuToken');
    expect(await tucu.symbol()).to.equal('TUCU');
  });

  it('Should mint tokens to an address', async function () {
    const [owner, addr1] = await ethers.getSigners();
    const TucuToken = await ethers.getContractFactory('TucuToken');
    const tucu = await TucuToken.deploy();
    await tucu.mint(addr1.address, 1000);
    expect(await tucu.balanceOf(addr1.address)).to.equal(1000);
  });
});
