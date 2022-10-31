export default class Food {
    code: Number
    status: String
    imported_t: Date
    url: String
    creator: String
    created_t: String
    last_modified_t: String
    product_name: String
    quantity: String
    brands: String
    categories: String
    labels: String
    cities: String
    purchase_places: String
    stores: String
    ingredients_text: String
    traces: String
    serving_size: String
    serving_quantity: Number
    nutriscore_score: Number
    nutriscore_grade: String
    main_category: String
    image_url: String

    constructor(code, status, imported_t, url, creator, created_t, last_modified_t, product_name, quantity, brands, categories, labels, cities, purchase_places, stores, ingredients_text, traces, serving_size, serving_quantity, nutriscore_score, nutriscore_grade, main_category, image_url) {
        this.code = code,
        this.status = status,
        this.imported_t = imported_t,
        this.url = url,
        this.creator = creator,
        this.created_t = created_t,
        this.last_modified_t = last_modified_t,
        this.product_name = product_name,
        this.quantity = quantity,
        this.brands = brands,
        this.categories = categories,
        this.labels = labels,
        this.cities = cities,
        this.purchase_places = purchase_places,
        this.stores = stores,
        this.ingredients_text = ingredients_text,
        this.traces = traces,
        this.serving_size = serving_size,
        this.serving_quantity = serving_quantity,
        this.nutriscore_score = nutriscore_score,
        this.nutriscore_grade = nutriscore_grade,
        this.main_category = main_category,
        this.image_url = image_url
    }
}