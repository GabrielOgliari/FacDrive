import { Text } from 'react-native';

type Param = {
    space: number;
};

export const HorisontalSeparator = ({ space }: Param) => {
    return <Text style={{ marginRight: space, marginLeft: space }}>-</Text>;
};
