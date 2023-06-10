import { z } from 'zod';
import { fromZodError } from 'zod-validation-error';

const zodReadableErrorMessage = () => {
  // create zod schema
  const zodSchema = z.object({
    id: z.number().int().positive(),
    email: z.string().email(),
  });

  // parse some invalid value
  try {
    zodSchema.parse({
      id: -1,
      email: 'rahul', // note: invalid email
    });
  } catch (err: any) {
    const validationError = fromZodError(err);
    // the error now is readable by the user
    // you may print it to console
    // or return it via an API
    console.log(validationError.message);
  }
};

const objectValidation = () => {
  const person = z.object({
    name: z.string(),
  });

  console.log(
    person.safeParse({
      name: 'bob dylan',
      extraKey: 61,
    })
  );
  // => { name: "bob dylan" }
  // extraKey has been stripped

  // Instead, if you want to pass through unknown keys, use .passthrough()
  console.log(
    person.passthrough().safeParse({
      name: 'bob dylan',
      extraKey: 61,
    })
  );
  // => { name: "bob dylan", extraKey: 61 }

  const person2 = z
    .object({
      name: z.string(),
    })
    .strict();

  console.log(
    person2.safeParse({
      name: 'bob dylan',
      extraKey: 61,
    })
  );
  // => throws ZodError
};

export const runZodPractice = () => {
  objectValidation();
};
