import React, { useState } from 'react';
import { ModalDropdown } from './components/Modal';
import * as Style from './styles';

export type DropdownProps = {
  placeholder?: string;
  options: { label: string; value: any }[];
  onChange: (value: any) => void;
};

export const Dropdown = ({ placeholder, options, onChange }: DropdownProps) => {
  const [visible, setVisible] = useState(false);
  const [label, setLabel] = useState(placeholder ?? 'Selecione uma Opção');

  const handlePressOptionButton = ({
    label,
    value,
  }: {
    label: string;
    value: any;
  }) => {
    setLabel(label);
    onChange(value);
    setVisible(false);
  };

  return (
    <Style.DropdownContainer>
      <Style.DropdownButton onPress={() => setVisible(true)}>
        <Style.DropdownText $isBlackColor={placeholder !== label}>
          {label}
        </Style.DropdownText>
      </Style.DropdownButton>

      <ModalDropdown
        options={options}
        setVisible={setVisible}
        visible={visible}
        onChange={handlePressOptionButton}
      />
    </Style.DropdownContainer>
  );
};
