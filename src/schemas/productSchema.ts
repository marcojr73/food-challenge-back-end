import Joi from "joi"

const productSchema = Joi.object({
    code: Joi.string().required(),
    status: Joi.string().required(),
    imported_t: Joi.date().required(),
    url: Joi.string().required(),
    creator: Joi.string().required(),
    created_t: Joi.string().required(),
    last_modified_t: Joi.string().required(),
    product_name: Joi.string().required(),
    quantity: Joi.string().required(),
    brands: Joi.string().required(),
    categories: Joi.string().required(),
    labels: Joi.string().required(),
    cities: Joi.string().required(),
    purchase_places: Joi.string().required(),
    stores: Joi.string().required(),
    ingredients_text: Joi.string().required(),
    traces: Joi.string().required(),
    serving_size: Joi.string().required(),
    serving_quantity: Joi.string().required(),
    nutriscore_score: Joi.string().required(),
    nutriscore_grade: Joi.string().required(),
    main_category: Joi.string().required(),
    image_url: Joi.string().required().uri(),
})

export default productSchema