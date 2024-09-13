import React, { ReactNode } from 'react';
import { ScrollView } from 'react-native';
import * as Styles from './styles';

type MainTemplateProps = {
  title: string;
  children: ReactNode;
};

export const MainTemplate = ({ title, children }: MainTemplateProps) => {
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
