import { buildModule } from '@nomicfoundation/hardhat-ignition/modules';

export default buildModule('TucuTokenModule', (m) => {
  // TucuToken has no constructor parameters
  const tucuToken = m.contract('TucuToken', []);
  return { tucuToken };
});
