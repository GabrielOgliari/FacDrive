import { View } from 'react-native';

type Param = {
    space: number;
};

export const Separator = ({ space }: Param) => {
    return <View style={{ marginTop: space }}></View>;
};
