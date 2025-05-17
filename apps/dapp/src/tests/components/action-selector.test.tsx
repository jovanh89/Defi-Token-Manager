import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ActionSelector from '../../components/inputs/action-selector';
import { environment } from '../../utils/constants';
import { ACTIONS } from 'libs/blockchain/src/utils/constants';
import { fn } from 'jest-mock';
import { canvasElementMocked } from '../__mocks__/index';

describe('ActionSelector', () => {
  canvasElementMocked();
  it('should render the action buttons', () => {
    render(
      <ActionSelector
        selectedAction="MINT"
        setSelectedAction={() => null}
        disabled={false}
      />
    );

    ACTIONS.forEach((action) => {
      if (action === 'MINT' && environment !== 'develop') {
        expect(screen.queryByText(action)).not.toBeInTheDocument();
      } else {
        expect(screen.queryByText(action)).toBeInTheDocument();
      }
    });
  });

  it('should call setSelectedAction when clicking a button', () => {
    const setSelectedAction = fn();
    render(
      <ActionSelector
        selectedAction="MINT"
        setSelectedAction={setSelectedAction}
        disabled={false}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: 'TRANSFER' }));
    expect(setSelectedAction).toHaveBeenCalledWith('TRANSFER');
  });

  it('should not call setSelectedAction if disabled is true', () => {
    const setSelectedAction = fn();
    render(
      <ActionSelector
        selectedAction="MINT"
        setSelectedAction={setSelectedAction}
        disabled={true}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: 'TRANSFER' }));
    expect(setSelectedAction).not.toHaveBeenCalled();
  });

  it('should show the loading indicator when disabled is true', () => {
    render(
      <ActionSelector
        selectedAction="MINT"
        setSelectedAction={() => null}
        disabled={true}
      />
    );

    waitFor(() => screen.findByTestId('letter-glitch'));
    expect(screen.getByTestId('letter-glitch')).toBeInTheDocument();
  });
});
