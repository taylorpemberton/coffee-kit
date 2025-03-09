# CoffeeKit Backend API

This is the Django REST Framework backend for the CoffeeKit application.

## Setup

1. Create a virtual environment:
   ```
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

2. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

3. Run migrations:
   ```
   python manage.py migrate
   ```

4. Create a superuser:
   ```
   python manage.py createsuperuser
   ```

5. Run the development server:
   ```
   python manage.py runserver
   ```

## API Endpoints

### Authentication

- `POST /api-token-auth/`: Obtain an authentication token
  - Request body: `{"username": "your_username", "password": "your_password"}`
  - Response: `{"token": "your_auth_token"}`

### Equipment

- `GET /api/equipment/`: List all equipment for the authenticated user
- `POST /api/equipment/`: Create a new equipment item
- `GET /api/equipment/{id}/`: Retrieve a specific equipment item
- `PUT /api/equipment/{id}/`: Update a specific equipment item
- `DELETE /api/equipment/{id}/`: Delete a specific equipment item
- `POST /api/equipment/{id}/add_retailer/`: Add a retailer link to an equipment item
- `DELETE /api/equipment/{id}/remove_retailer/`: Remove a retailer link from an equipment item

### Retailer Links

- `GET /api/retailer-links/`: List all retailer links for the authenticated user's equipment
- `POST /api/retailer-links/`: Create a new retailer link
- `GET /api/retailer-links/{id}/`: Retrieve a specific retailer link
- `PUT /api/retailer-links/{id}/`: Update a specific retailer link
- `DELETE /api/retailer-links/{id}/`: Delete a specific retailer link

## Authentication

All API endpoints (except for obtaining a token) require authentication. You can authenticate by including the token in the Authorization header:

```
Authorization: Token your_auth_token
```

## Example Requests

### Create an Equipment Item

```
POST /api/equipment/
Authorization: Token your_auth_token
Content-Type: application/json

{
  "name": "Breville Barista Express",
  "category": "Espresso Machine",
  "price": 699.99,
  "description": "Semi-automatic espresso machine with built-in grinder",
  "image": "https://example.com/image.jpg",
  "purchase_date": "2023-01-15",
  "purchase_location": "Amazon",
  "link": "https://example.com/product"
}
```

### Add a Retailer Link

```
POST /api/equipment/1/add_retailer/
Authorization: Token your_auth_token
Content-Type: application/json

{
  "retailer_id": "amazon",
  "price": 649.99,
  "url": "https://amazon.com/product",
  "affiliate_code": "coffeekit-20"
}
``` 