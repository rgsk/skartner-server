import { evaluateCustomEnvironmentModifier } from './customEnvironmentModifier';

const productionOrDisableModifierBehaviour = (
  customEnvironmentModifier: ReturnType<
    typeof evaluateCustomEnvironmentModifier
  >
) => {
  expect(customEnvironmentModifier.offInProduction.offInDevelopment).toBe(
    false
  );
  expect(customEnvironmentModifier.offInProduction.onInDevelopment).toBe(false);
  expect(customEnvironmentModifier.onInProduction.offInDevelopment).toBe(true);
  expect(customEnvironmentModifier.onInProduction.onInDevelopment).toBe(true);
};
test('customEnvironmentModifier works correctly if NODE_ENV and envNameForCustomBehaviour are different', () => {
  let customEnvironmentModifier = evaluateCustomEnvironmentModifier({
    NODE_ENV: 'production',
    disableModifier: false,
    envNameForCustomBehaviour: 'development',
  });
  productionOrDisableModifierBehaviour(customEnvironmentModifier);
  customEnvironmentModifier = evaluateCustomEnvironmentModifier({
    NODE_ENV: 'production',
    disableModifier: true,
    envNameForCustomBehaviour: 'development',
  });
  productionOrDisableModifierBehaviour(customEnvironmentModifier);
});

test('customEnvironmentModifier works correctly if NODE_ENV and envNameForCustomBehaviour are same', () => {
  const customEnvironmentModifier = evaluateCustomEnvironmentModifier({
    NODE_ENV: 'development',
    disableModifier: false,
    envNameForCustomBehaviour: 'development',
  });
  expect(customEnvironmentModifier.offInProduction.offInDevelopment).toBe(
    false
  );
  expect(customEnvironmentModifier.offInProduction.onInDevelopment).toBe(true);
  expect(customEnvironmentModifier.onInProduction.offInDevelopment).toBe(false);
  expect(customEnvironmentModifier.onInProduction.onInDevelopment).toBe(true);
});

test('customEnvironmentModifier works correctly if NODE_ENV and envNameForCustomBehaviour are same but we have disabled modifier', () => {
  const customEnvironmentModifier = evaluateCustomEnvironmentModifier({
    NODE_ENV: 'development',
    disableModifier: true,
    envNameForCustomBehaviour: 'development',
  });
  productionOrDisableModifierBehaviour(customEnvironmentModifier);
});
