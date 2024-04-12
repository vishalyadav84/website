// mini project

const http = require("http");
const fs = require("fs");
const data = fs.readFileSync("./data.json", "utf8");
// console.log(data);
const dataObj = JSON.parse(data);
const products = dataObj.products;

// console.log(dataObj);

const htmlTemplate = `
<!DOCTYPE html>
<html>
<head>
    <link rel="shortcut icon" href="https://www.freeiconspng.com/uploads/product-catalog-icon-15.jpg">
    <title>Product Catalog</title>
    <style>
    body {
        background-color: rgb(243, 224, 204);
        font-family: Arial, sans-serif;
        padding: 20px;
    }
    .product-card {
        background-color: bisque;
        max-width: 400px;
        padding: 24px;
        margin: 20px auto;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
    }
    .product-card img {
        max-width: 100%;
        height: auto;
        display: block;
        margin: 0 auto 16px;
        border-radius: 8px;
    }
    .product-card:hover {
        transform: scale(1.05); /* Zoom in effect on hover */
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2); /* Add a stronger shadow on hover */
    }
    #product-container {
        flex-wrap: wrap;
        display: flex;
        justify-content: space-between;
    }
    h3 {
        text-decoration: underline;
        text-align: center;
        font-size: 40px;
        color:red;
    }
    .product-card h4 {
        margin-top: 0;
        color: #333;
    }

</style>
</head>
<body>
    <h3>Welcome to Our Product Catalog</h3>
    <div id="product-container">
        _PRODUCT_CARDS_
    </div>
</body>
</html>
`;
const cardTemplate = `
<div class='product-card'>
    <h2>_id_</h2>
    <h4>_TITLE_</h4>
    <p>_DESCRIPTION_</p>
    <p>Brand: __BRAND__</p>
    <p>Category: __CATEGORY__</p>
    <img src="__IMAGE__" alt="_TITLE_ Image">
    <img src="__thumbnail__" alt="_TITLE_ Image">
    <p>Price: $__PRICE__</p>
    <p>DiscountPercentage: __discountPercentage__</p>
    <p>Stock: __stock__</p>
    <p>Rating: __rating__</p>
    <a href="">Read Me</a>
</div>
`;
const allCards = products.map((product) => {
  let newCard = cardTemplate;
  newCard = newCard.replace("_id_", product.id);
  newCard = newCard.replace("_TITLE_", product.title);
  newCard = newCard.replace("_DESCRIPTION_", product.description);
  newCard = newCard.replace("__BRAND__", product.brand);
  newCard = newCard.replace("__CATEGORY__", product.category);
  newCard = newCard.replace("__IMAGE__", product.images[0]);
  newCard = newCard.replace("__thumbnail__", product.thumbnail);
  newCard = newCard.replace("__PRICE__", product.price);
  newCard = newCard.replace("__discountPercentage__", product.discountPercentage);
  newCard = newCard.replace("__stock__", product.stock);
  newCard = newCard.replace("__rating__", product.rating);
  return newCard;
});

const page = htmlTemplate.replace("_PRODUCT_CARDS_", allCards);

const server = http.createServer((req, res) => {
  console.log(req.url);
  res.writeHead(200, {
    "content-type": "text/html",
  });

  res.end(page);
});

server.listen(14000, () => {
  console.log("............Server Start..........");
});

//start command:- npx nodemon script.js
//npx nodemon file name
// install packeg command:-  npm i nodemon  
