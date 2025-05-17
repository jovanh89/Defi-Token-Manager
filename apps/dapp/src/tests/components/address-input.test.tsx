import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AddressInput from '../../components/inputs/address-input';

describe('AddressInput', () => {
  it('should render the input', () => {
    render(
      <AddressInput
        targetAddress=""
        selectedToken="DAI"
        disabled={false}
        setTargetAddress={() => null}
        setIsValidAddress={() => null}
      />
    );

    expect(screen.getByText('DAI Target Address')).toBeInTheDocument();
  });

  it('should show an error if the address is invalid', async () => {
    render(
      <AddressInput
        targetAddress="0xinvalid"
        selectedToken="DAI"
        disabled={false}
        setTargetAddress={() => null}
        setIsValidAddress={() => null}
      />
    );

    fireEvent.change(screen.getByTestId('address-input'), {
      target: { value: '0xinvalid' },
    });

    await waitFor(() => {
      expect(
        screen.getByText(
          'Invalid address, must be hexadecimal and 42 characters long'
        )
      ).toBeInTheDocument();
    });
  });

  it('should show an error if the address is missing', async () => {
    render(
      <AddressInput
        targetAddress=""
        selectedToken="DAI"
        disabled={false}
        setTargetAddress={() => null}
        setIsValidAddress={() => null}
      />
    );

    fireEvent.change(screen.getByTestId('address-input'), {
      target: { value: '' },
    });

    await waitFor(() => {
      expect(screen.getByText('Address is required')).toBeInTheDocument();
    });
  });

  it('should show an error if the address is missing the 0x prefix', async () => {
    render(
      <AddressInput
        targetAddress="invalid"
        selectedToken="DAI"
        disabled={false}
        setTargetAddress={() => null}
        setIsValidAddress={() => null}
      />
    );

    fireEvent.change(screen.getByTestId('address-input'), {
      target: { value: 'invalid' },
    });

    await waitFor(() => {
      expect(
        screen.getByText('Address must start with 0x')
      ).toBeInTheDocument();
    });
  });

  it('should not show an error if the address is valid', async () => {
    render(
      <AddressInput
        targetAddress="0x1234567890123456789012345678901234567890"
        selectedToken="DAI"
        disabled={false}
        setTargetAddress={() => null}
        setIsValidAddress={() => null}
      />
    );

    fireEvent.change(screen.getByTestId('address-input'), {
      target: { value: '0x1234567890123456789012345678901234567890' },
    });

    await waitFor(() => {
      expect(
        screen.queryByText(
          'Invalid address, must be hexadecimal and 42 characters long'
        )
      ).not.toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.queryByText('Address is required')).not.toBeInTheDocument();
    });

    await waitFor(() => {
      expect(
        screen.queryByText('Address must start with 0x')
      ).not.toBeInTheDocument();
    });

    expect(screen.queryByText('DAI Target Address')).toBeInTheDocument();
  });
});
