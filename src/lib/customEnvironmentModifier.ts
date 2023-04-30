import environmentVars, { TAppEnvironment } from './environmentVars';

export const evaluateCustomEnvironmentModifier = ({
  NODE_ENV,
  disableModifier,
  envNameForCustomBehaviour,
}: {
  NODE_ENV: TAppEnvironment;
  disableModifier: boolean;
  envNameForCustomBehaviour: TAppEnvironment;
}) => {
  return {
    onInProduction: {
      onInDevelopment: disableModifier
        ? true
        : NODE_ENV !== envNameForCustomBehaviour || true,
      offInDevelopment: disableModifier
        ? true
        : NODE_ENV !== envNameForCustomBehaviour || false,
    },
    offInProduction: {
      onInDevelopment: disableModifier
        ? false
        : NODE_ENV === envNameForCustomBehaviour && true,
      offInDevelopment: disableModifier
        ? false
        : NODE_ENV === envNameForCustomBehaviour && false,
    },
  };
};

// this can help us make decisions regarding
// whether to run something in development or not
const customEnvironmentModifier = evaluateCustomEnvironmentModifier({
  NODE_ENV: environmentVars.NODE_ENV || 'development',
  disableModifier: false,
  envNameForCustomBehaviour: 'development',
});

export default customEnvironmentModifier;
