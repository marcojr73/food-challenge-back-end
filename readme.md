# Food chalenge API

<p align="center">
   <img width=350 src="https://notion-emojis.s3-us-west-2.amazonaws.com/prod/svg-twitter/1f355.svg"/>
</p>


- Uma API com sincronização de dados automazidos com a [open food facts](https://br.openfoodfacts.org/data)

- A atualização de dados ocorre todo dia as 3:30 da manhã

- [Veja meu deploy na Heroku desta API aqui](https://geo-quiz-api.herokuapp.com)



## Como usar

Instale meu projeto e suas dependências, configure o .env como no exemplo

```bash
  git clone git@github.com:marcojr73/food-challenge-back-end.git
```

```bash
  npm install
  
  npm run start
```

***

##	 Tecnologias e Conceitos

- Node.js
- TypeScript
- Express
- Layered architecture
- Cron
- MongoDb
- Joi

***
    
## API Reference

#### Request

```
  GET /
```

#### Response

Obtenção de dados da API, se conexão leitura e escritura com a base de dados está OK, horário da última vez que o CRON foi executado, tempo online em ms e dados de uso de memória.

```
    {
	"connectionDb": "ok",
	"lastUpate": "02/10/2022",
	"performance": {
		"timeOriginMs": 1667394356507.819,
		"memoryInfo": {
			"rss": 298074112,
			"heapTotal": 201076736,
			"heapUsed": 160778184,
			"external": 25801107,
			"arrayBuffers": 20134432
		}
    }

```

#### Request

```
  PUT /products/${code}
```

Body:

```
  {
	"code": "8718215180180",
    "status": "published",
    "imported_t": "2022-10-31T22:24:41-03:00",
    "url": "http://world-en.openfoodfacts.org/product/8718215180173/zoetpoeder",
    "creator": "kiliweb",
    "created_t": "1589920675",
    "last_modified_t": "1589920677",
    "product_name": "Zoetpoeder",
    "quantity": "152",
    "brands": "123",
    "categories": "italian",
    "labels": "",
    "cities": "São paulo",
    "purchase_places": "restaurant",
    "stores": "casa da pizza",
    "ingredients_text": "100g de muçarela",
    "traces": "12",
    "serving_size": "5",
    "serving_quantity": "10",
    "nutriscore_score": "100",
    "nutriscore_grade": "50",
    "main_category": "main",
    "image_url": "https://static.openfoodfacts.org/images/products/871/821/518/0173/front_fr.3.400.jpg"
}
```


#### Response

Atualização de um produto no sistema

```
    200 success when to update product
```


#### Request

```
  DELETE /products/:${code}
```

#### Response


atualizar status do produto para "trash"

```
    204 success when to trash product
```

#### Request

```
  GET /products/:${code}
```

#### Response

Obtenção dos dados de um produto a partir de seu código

```
   {
	"product": {
		"_id": "63607559b45802481f2decb5",
		"code": "8718215380313",
		"status": "published",
		"imported_t": "2022-10-31T22:24:41-03:00",
		"url": "http://world-en.openfoodfacts.org/product/8718215380313",
		"creator": "sebleouf",
		"created_t": "1556496916",
		"last_modified_t": "1556497653",
		"product_name": "",
		"quantity": "",
		"brands": "",
		"categories": "",
		"labels": "Organic, EU Organic, NL-BIO-01  , en:vegan",
		"cities": "",
		"purchase_places": "",
		"stores": "Ekoplaza",
		"ingredients_text": "",
		"traces": "",
		"serving_size": "",
		"serving_quantity": "",
		"nutriscore_score": "",
		"nutriscore_grade": "",
		"main_category": "",
		"image_url": "https://static.openfoodfacts.org/images/products/871/821/538/0313/front_nl.18.400.jpg"
	}
}
```

#### Request

```
  GET /products?page=3
```


#### Response

Retorna uma lista de 50 produtos por página

```
    [
        {
		"_id": "636075c0b45802481f2ded75",
		"code": "0073490180286",
		"status": "published",
		"imported_t": "2022-10-31T22:26:24-03:00",
		"url": "http://world-en.openfoodfacts.org/product/0073490180286/absolutely-gluten-free-classic-coconut-macaroons-toasted-coconut-royal-wine-corporation",
		"creator": "usda-ndb-import",
		"created_t": "1489076300",
		"last_modified_t": "1587588249",
		"product_name": "Absolutely, Gluten Free Classic Coconut Macaroons, Toasted Coconut",
		"quantity": "",
		"brands": "Royal Wine Corporation",
		"categories": "Snacks, Sweet snacks, Biscuits and cakes, Biscuits, Pastries, Coconut Macaroons",
		"labels": "",
		"cities": "",
		"purchase_places": "",
		"stores": "",
		"ingredients_text": "Unsweetened sulfite free coconut, invert sugar, tapioca, egg whites.",
		"traces": "",
		"serving_size": "2 MACAROONS (28 g)",
		"serving_quantity": "28",
		"nutriscore_score": "21",
		"nutriscore_grade": "e",
		"main_category": "en:coconut-macaroons",
		"image_url": ""
	},
    and more 49 items...
    ]
```

