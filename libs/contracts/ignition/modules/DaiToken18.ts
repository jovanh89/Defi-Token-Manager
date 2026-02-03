import { buildModule } from '@nomicfoundation/hardhat-ignition/modules';

export default buildModule('DaiToken18Module', (m) => {
  // DaiToken18 has no constructor parameters
  const daiToken18 = m.contract('DaiToken18', []);
  return { daiToken18 };
});
