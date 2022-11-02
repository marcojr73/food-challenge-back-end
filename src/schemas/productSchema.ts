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
    quantity: Joi.string().min(0).required(),
    brands: Joi.string().min(0).required(),
    categories: Joi.string().min(0).required(),
    labels: Joi.string().min(0).required(),
    cities: Joi.string().min(0).required(),
    purchase_places: Joi.string().min(0).required(),
    stores: Joi.string().min(0).required(),
    ingredients_text: Joi.string().min(0).required(),
    traces: Joi.string().min(0).required(),
    serving_size: Joi.string().min(0).required(),
    serving_quantity: Joi.string().min(0).required(),
    nutriscore_score: Joi.string().min(0).required(),
    nutriscore_grade: Joi.string().min(0).required(),
    main_category: Joi.string().min(0).required(),
    image_url: Joi.string().min(0).required().uri(),
})

export default productSchema