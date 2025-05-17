import React from 'react';
import { ACTIONS, ActionType } from '@defi-token/blockchain';
import { Button } from '@defi-token/ui';
import Card from '../cards/card';
import { environment } from '../../utils/constants';

interface ActionSelectorProps {
  selectedAction: ActionType;
  setSelectedAction: (token: ActionType) => void;
  disabled: boolean;
}

const ActionSelector: React.FC<ActionSelectorProps> = ({
  selectedAction,
  setSelectedAction,
  disabled,
}) => {
  return (
    <Card isLoading={disabled}>
      <div className="sm:flex sm:space-x-4">
        {ACTIONS.map((action, index) => {
          if (action === 'MINT' && environment !== 'develop') return null;
          return (
            <Button
              key={index}
              onClick={() => (disabled ? null : setSelectedAction(action))}
              className="w-full sm:mb-0 mb-4"
              size="mini"
              variant={selectedAction === action ? 'solid' : 'ghost'}
              disabled={disabled}
            >
              {action}
            </Button>
          );
        })}
      </div>
    </Card>
  );
};

export default ActionSelector;
