import { celebrate, Joi, Segments } from "celebrate";

const createUser = celebrate({
  [Segments.BODY]: Joi.object().keys(
    {
      username: Joi.string().required(),
      email: Joi.string().trim().email().required(),
      password: Joi.string().required(),
    },
    { warnings: true }
  ),
});

const login = celebrate({
  [Segments.BODY]: Joi.object().keys(
    {
      email: Joi.string().trim().email().required(),
      password: Joi.string().required(),
    },
    { warnings: true }
  ),
});

export { createUser, login };
