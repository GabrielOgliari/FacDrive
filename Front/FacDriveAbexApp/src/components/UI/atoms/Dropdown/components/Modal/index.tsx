import { Dispatch, SetStateAction, useState } from 'react';
import { Modal } from 'react-native';
import * as Style from './styles';

type ModalDropdownProps = {
  options: { label: string; value: any }[];
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
  onChange: ({ label, value }: { label: string; value: any }) => void;
};

export const ModalDropdown = ({
  options,
  visible,
  setVisible,
  onChange,
}: ModalDropdownProps) => {
  const [optionSelected, setOptionSelected] = useState('');

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={() => setVisible(false)}
    >
      <Style.ModalOverlay onPress={() => setVisible(false)}>
        <Style.ModalContent>
          {options.map(({ label, value }) => {
            const optionName = `${label}-${value}`;

            return (
              <Style.Option
                key={optionName}
                $isSelected={optionName === optionSelected}
                onPress={() => {
                  setOptionSelected(optionName);
                  onChange({ label, value });
                }}
              >
                <Style.OptionText>{label}</Style.OptionText>
              </Style.Option>
            );
          })}
        </Style.ModalContent>
      </Style.ModalOverlay>
    </Modal>
  );
};
