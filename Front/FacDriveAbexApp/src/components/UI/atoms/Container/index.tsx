import React, { ReactNode } from 'react';
import { ScrollView } from 'react-native';
import * as Styles from './styles';

type ContainerProps = {
  title: string;
  children: ReactNode;
};

export const Container = ({ title, children }: ContainerProps) => {
  return (
    <Styles.Container>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        {title && <Styles.Title>{title}</Styles.Title>}

        {children}
      </ScrollView>
    </Styles.Container>
  );
};
