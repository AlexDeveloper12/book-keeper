import React from 'react';
import { DotIndicator } from 'react-native-indicators';

const Loader = ({ animating }) => <DotIndicator animating={animating} color="white" />;

export default Loader;
