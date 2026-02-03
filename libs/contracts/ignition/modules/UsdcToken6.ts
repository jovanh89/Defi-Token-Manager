import { buildModule } from '@nomicfoundation/hardhat-ignition/modules';

export default buildModule('UsdcToken6Module', (m) => {
  // UsdcToken6 has no constructor parameters
  const usdcToken6 = m.contract('UsdcToken6', []);
  return { usdcToken6 };
});
