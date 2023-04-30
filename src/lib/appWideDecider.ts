import customEnvironmentModifier from './customEnvironmentModifier';

const appWideDecider = {
  enableFileLogger: customEnvironmentModifier.offInProduction.onInDevelopment,
};
export default appWideDecider;
