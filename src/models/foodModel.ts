export default class Food {
    code: string
    status: string
    imported_t: string
    url: string
    creator: string
    created_t: string
    last_modified_t: string
    product_name: string
    quantity: string
    brands: string
    categories: string
    labels: string
    cities: string
    purchase_places: string
    stores: string
    ingredients_text: string
    traces: string
    serving_size: string
    serving_quantity: string
    nutriscore_score: string
    nutriscore_grade: string
    main_category: string
    image_url: string

    
    
    
    
    constructor(code: string, status: string, imported_t: string, url: string, creator: string, created_t: string, last_modified_t: string, product_name: string, quantity: string, brands: string, categories: string, labels: string, cities: string, purchase_places: string, stores: string, ingredients_text: string, traces: string, serving_size: string, serving_quantity: string, nutriscore_score: string, nutriscore_grade: string, main_category: string, image_url: string) {
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