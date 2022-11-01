import Joi from "joi"

const productSchema = Joi.object({
    code: Joi.string(),
    status: Joi.string(),
    imported_t: Joi.date(),
    url: Joi.string(),
    creator: Joi.string(),
    created_t: Joi.string(),
    last_modified_t: Joi.string(),
    product_name: Joi.string(),
    quantity: Joi.string(),
    brands: Joi.string(),
    categories: Joi.string(),
    labels: Joi.string(),
    cities: Joi.string(),
    purchase_places: Joi.string(),
    stores: Joi.string(),
    ingredients_text: Joi.string(),
    traces: Joi.string(),
    serving_size: Joi.string(),
    serving_quantity: Joi.string(),
    nutriscore_score: Joi.string(),
    nutriscore_grade: Joi.string(),
    main_category: Joi.string(),
    image_url: Joi.string().uri(),
})

export default productSchema