import { render, screen } from '@testing-library/react';
import AmountInput from '../../components/inputs/amount-input';
import { WagmiProviderMocked } from '../__mocks__';

describe('AmountInput', () => {
  it('should render the input', () => {
    render(
      <WagmiProviderMocked>
        <AmountInput
          amount=""
          selectedToken="DAI"
          disabled={false}
          setAmount={() => null}
          setIsValidAmount={() => null}
        />
      </WagmiProviderMocked>
    );

    expect(screen.getByText('DAI Amount')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('0.00')).toBeInTheDocument();
    expect(screen.getByTestId('amount-input')).toBeInTheDocument();
    expect(screen.getByTestId('dai-icon')).toBeInTheDocument();
  });

  it('should render the input with USDC icon', () => {
    render(
      <WagmiProviderMocked>
        <AmountInput
          amount=""
          selectedToken="USDC"
          disabled={false}
          setAmount={() => null}
          setIsValidAmount={() => null}
        />
      </WagmiProviderMocked>
    );

    expect(screen.getByText('USDC Amount')).toBeInTheDocument();
    expect(screen.getByTestId('usdc-icon')).toBeInTheDocument();
  });

  it('should validate input: Amount is required', () => {
    render(
      <WagmiProviderMocked>
        <AmountInput
          amount=""
          selectedToken="DAI"
          disabled={false}
          setAmount={() => null}
          setIsValidAmount={() => null}
        />
      </WagmiProviderMocked>
    );

    expect(screen.getByText('Amount is required')).toBeInTheDocument();
  });

  it('should validate input: Amount must be greater than 0', () => {
    render(
      <WagmiProviderMocked>
        <AmountInput
          amount="0"
          selectedToken="DAI"
          disabled={false}
          setAmount={() => null}
          setIsValidAmount={() => null}
        />
      </WagmiProviderMocked>
    );

    expect(
      screen.getByText('Amount must be greater than 0')
    ).toBeInTheDocument();
  });
});
