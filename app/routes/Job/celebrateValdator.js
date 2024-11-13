import { celebrate, Joi, Segments } from "celebrate";

const createjob = celebrate({
  [Segments.BODY]: Joi.object().keys(
    {
      title: Joi.string().required(),
      seniority_level: Joi.string().required(),
      city: Joi.string().required(),
      country: Joi.string().required(),
      company: Joi.string().required(),
      description: Joi.string().required(),
      salary_range: Joi.string().required(),
      date_posted: Joi.string().required(),
    },
    { warnings: true }
  ),
});

export { createjob };
