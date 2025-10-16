# WooCommerce Product Segmentation System

Full-stack microservices application for WooCommerce product ingestion and segmentation.

## 🚀 Live Demo

- **Frontend**: https://client-0m6m.onrender.com/
- **API Gateway**: https://gateway-jmmp.onrender.com
- **Product Service**: https://product-service-wloe.onrender.com
- **Segment Service**: https://segment-service-w0jn.onrender.com

## 🏗️ Architecture

```
Frontend (React) → Gateway → Product Service + Segment Service → MongoDB
```

**Microservices:**

- **Gateway**: API routing
- **Product Service**: WooCommerce ingestion & get products
- **Segment Service**: Rule-based filtering
- **Frontend**: React + Tailwind CSS

## 🛠️ Tech Stack

- React, Node.js, Express, MongoDB, Mongoose
- node-cron, http-proxy-middleware, Tailwind CSS

## ⚡ Quick Start

### Installation

```bash
# Clone and install
git clone <repo-url>
cd woocommerce-segmentation

# Install each service
cd product-service && npm install
cd ../segment-service && npm install
cd ../gateway && npm install
cd ../client && npm install
```

### Environment Setup

**product-service/.env**

```env
PORT=3001
MONGODB_URI=mongo_uri
WOOCOMMERCE_BASE_URL=url
WOOCOMMERCE_CONSUMER_KEY=key
WOOCOMMERCE_CONSUMER_SECRET=secret
CRON_SCHEDULE=0 */6 * * *
```


## 🎯 Segmentation Rules

**Syntax:** `field operator value` (one per line)

**Operators:** `>`, `<`, `>=`, `<=`, `=`, `!=`

**Example Rules:**

```
price > 1000
stock_status = instock
on_sale = true
category = Electronics
stock_quantity >= 10
```

All conditions use AND logic.

## 🔄 Ingestion Logic

**Source:** WooCommerce REST API  
**Endpoint:** `GET /wp-json/wc/v3/products`  
**Auth:** Consumer Key & Secret  
**Schedule:** Every 6 hours (cron)

**Data Mapping:**

| Local Field    | WooCommerce Field  | Type    |
| -------------- | ------------------ | ------- |
| id             | id                 | Number  |
| title          | name               | String  |
| price          | price              | String  |
| stock_status   | stock_status       | String  |
| stock_quantity | stock_quantity     | Number  |
| category       | categories[0].name | String  |
| tags           | tags[].name        | Array   |
| on_sale        | on_sale            | Boolean |
| created_at     | date_created       | String  |

**Process:** Fetch → Transform → Upsert to MongoDB

## 📁 Project Structure

```
woocommerce-segmentation/
├── product-service/      # Product ingestion & CRUD
├── segment-service/      # Rule evaluation
├── gateway/              # API routing
└── client/               # React frontend
```


Built with microservices architecture | Node.js + React + MongoDB
