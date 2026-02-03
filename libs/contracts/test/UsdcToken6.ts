import { expect } from 'chai';
import hre from 'hardhat';

const ethers = hre.ethers;

describe('UsdcToken6', function () {
  it('Should deploy and have correct name and symbol', async function () {
    const UsdcToken6 = await ethers.getContractFactory('UsdcToken6');
    const usdc = await UsdcToken6.deploy();
    expect(await usdc.name()).to.equal('UsdcToken6');
    expect(await usdc.symbol()).to.equal('TUCUSDC');
  });

  it('Should mint tokens to an address', async function () {
    const [owner, addr1] = await ethers.getSigners();
    const UsdcToken6 = await ethers.getContractFactory('UsdcToken6');
    const usdc = await UsdcToken6.deploy();
    await usdc.mint(addr1.address, 1000);
    expect(await usdc.balanceOf(addr1.address)).to.equal(1000);
  });
});
