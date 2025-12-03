# Backend Service Endpoints Documentation

This document lists all backend API endpoints that the SketchMe.AI frontend application uses. These endpoints currently point to Google Cloud Run services and need to be migrated to a VPS-hosted backend.

## Summary

This document catalogs **27 backend endpoints** organized into 8 categories:
- User Management (2 endpoints)
- Model Training (5 endpoints)
- Image Generation (5 endpoints)
- Upscaling (1 endpoint)
- Collection Management (3 endpoints)
- Purchase & Credits (6 endpoints)
- Admin (1 endpoint)
- Contact/Support (1 endpoint)

---

## Current Backend URLs

### Production
- **URL**: `https://sketchmeaibackend-sxgjpzid6q-uk.a.run.app/`
- **Configured in**: `js/helpers/constants.js` (line 22)

### Development
- **URL**: `https://sketchmeaibackend-dev-sxgjpzid6q-uk.a.run.app/`
- **Configured in**: `js/helpers/constants.js` (line 6)

---

## Endpoint Inventory

### 1. User Management Endpoints

#### `POST /users/create`
- **Used in**:
  - `js/pages/auth/auth_page.js` (line 153)
  - `js/pages/purchase/purchase_page.js` (line 140)
- **Purpose**: Create a new user account
- **Request payload**: User information object (email, display name, etc.)

#### `POST /users/delete`
- **Used in**: `js/pages/admin/admin_page.js` (line 70)
- **Purpose**: Delete a user account (admin function)
- **Request payload**: `{ "user_rec_id": string }`

---

### 2. Model Training Endpoints

#### `POST /models`
- **Used in**: `js/pages/console/models/models_page.js` (line 83)
- **Purpose**: Fetch user's trained models (with pagination)
- **Request payload**: `{ "userRecId": string, "lastDocId": string|null }`

#### `POST /models/working`
- **Used in**: `js/pages/console/generate/generate_page.js` (line 661)
- **Purpose**: Fetch user's successfully trained models that are ready to use for generation
- **Request payload**: `{ "userRecId": string }`

#### `POST /model/new`
- **Used in**: `js/pages/console/models/models_page.js` (line 894)
- **Purpose**: Create and start training a new custom model
- **Request payload**: Comprehensive training data object including:
  - model-id, user-rec-id, model-name
  - Training parameters (resolution, network-rank, batch-size, etc.)
  - Training images (base64 encoded)

#### `POST /model/cancel`
- **Used in**: `js/pages/console/models/models_page.js` (line 266)
- **Purpose**: Cancel an in-progress model training job
- **Request payload**: `{ "replicate_prediction_id": string }`

#### `POST /model/delete`
- **Used in**: `js/pages/console/models/models_page.js` (line 1129)
- **Purpose**: Delete a trained model
- **Request payload**: `{ "modelId": string, "replicateName": string, "modelVersion": string, "userRecId": string }`

---

### 3. Image Generation Endpoints

#### `POST /generations`
- **Used in**: `js/pages/console/generate/generate_page.js` (line 759)
- **Purpose**: Fetch user's generated images (with pagination)
- **Request payload**: `{ "userRecId": string, "collectionId": string, "lastDocId": string|null }`

#### `POST /generate/new`
- **Used in**: `js/pages/console/generate/generate_page.js` (line 1555)
- **Purpose**: Create a new image generation request
- **Request payload**: Generation parameters including:
  - prompt, negative_prompt
  - model selection
  - resolution, steps, guidance scale
  - reference images (i2i, ipadapter, controlnet modes)
  - LoRA settings

#### `POST /generate/cancel`
- **Used in**: `js/pages/console/generate/generate_page.js` (line 1621)
- **Purpose**: Cancel an in-progress image generation
- **Request payload**: `{ "replicate_prediction_id": string }`

#### `POST /generate/delete`
- **Used in**: `js/pages/console/generate/generate_page.js` (line 2766)
- **Purpose**: Delete one or more generated images
- **Request payload**: `{ "generationIds": string[], "userRecId": string }`

#### `POST /generations/favorite`
- **Used in**: `js/pages/console/generate/generate_page.js` (line 1789)
- **Purpose**: Toggle favorite status on a generation
- **Request payload**: `{ "userRecId": string, "generationId": string, "favoriteValue": boolean }`

---

### 4. Upscaling Endpoints

#### `POST /upscale/new`
- **Used in**: `js/pages/console/generate/generate_page.js` (line 2688)
- **Purpose**: Create a new image upscaling request
- **Request payload**: `{ "userRecId": string, "generationId": string, "imgUrl": string, "upscaleType": string }`

---

### 5. Collection Management Endpoints

#### `POST /collections`
- **Used in**: `js/pages/console/generate/generate_page.js` (line 2518)
- **Purpose**: Fetch user's generation collections
- **Request payload**: `{ "userRecId": string }`

#### `POST /collections/create`
- **Used in**: `js/pages/console/generate/generate_page.js` (line 2475)
- **Purpose**: Create a new collection
- **Request payload**: `{ "collectionName": string, "userRecId": string }`

#### `POST /collections/rename`
- **Used in**: `js/pages/console/generate/generate_page.js` (line 2579)
- **Purpose**: Rename an existing collection
- **Request payload**: `{ "collectionName": string, "collectionId": string, "userRecId": string }`

---

### 6. Purchase & Credits Endpoints

#### `POST /create-checkout-session`
- **Used in**: `js/pages/purchase/purchase_page.js` (line 807)
- **Purpose**: Create a Stripe checkout session for purchasing credits
- **Request payload**: Query parameters: `?price-id={priceId}`

#### `POST /stripe_checkout_session/credits/new`
- **Used in**: `js/pages/console/console.js` (line 290)
- **Purpose**: Create a Stripe checkout session for credits purchase from console
- **Request payload**: Query parameters: `?source-page-url={url}&unit-amount={amount}&newForm={boolean}`

#### `POST /purchase/credits/save`
- **Used in**: `js/pages/console/console.js` (line 222)
- **Purpose**: Save successful credit purchase record
- **Request payload**: `{ "user_rec_id": string, "product_name": string, "quantity": number, "unit_amount": number }`

#### `POST /purchase/validate`
- **Used in**: `js/pages/purchase/purchase_page.js` (line 193)
- **Purpose**: Validate a previous purchase and get delivery state
- **Request payload**: `{ "purchase_rec_id": string, "user_rec_id": string }`

#### `POST /purchase/save`
- **Used in**: `js/pages/purchase/purchase_page.js` (line 219)
- **Purpose**: Save/validate a purchase
- **Request payload**: `{ "user_rec_id": string, "price_id": string, "quantity": number }`

#### `POST /purchase/product_info`
- **Used in**: `js/pages/purchase/purchase_page.js` (line 756)
- **Purpose**: Get product information for a given price ID
- **Request payload**: `{ "price_id": string }`

---

### 7. Admin Endpoints

#### `POST /admin/health`
- **Used in**: `js/pages/admin/admin_page.js` (line 46)
- **Purpose**: Health check and admin dashboard data
- **Request payload**: `{}`

---

### 8. Contact/Support Endpoints

#### `POST /contact_us/new`
- **Used in**: `js/pages/home/home_page.js` (line 110)
- **Purpose**: Submit contact form from homepage
- **Request payload**: `{ "userName": string, "userEmail": string, "userMessage": string }`

---

## Migration Checklist

To complete the migration from Google Cloud to VPS, the following steps are required:

### Backend Configuration Update

1. **Update `js/helpers/constants.js`**:
   - [ ] Replace production `BACKEND_URL` (line 22) with new VPS endpoint
   - [ ] Replace development `BACKEND_URL` (line 6) with new dev VPS endpoint (if applicable)

### Files That Reference Backend Endpoints

The following files make direct HTTP requests to backend endpoints and should be reviewed after migration:

- [ ] `js/pages/console/generate/generate_page.js` - 10 different endpoint calls
- [ ] `js/pages/console/models/models_page.js` - 4 endpoint calls  
- [ ] `js/pages/purchase/purchase_page.js` - 5 endpoint calls
- [ ] `js/pages/console/console.js` - 2 endpoint calls
- [ ] `js/pages/auth/auth_page.js` - 1 endpoint call
- [ ] `js/pages/home/home_page.js` - 1 endpoint call
- [ ] `js/pages/admin/admin_page.js` - 2 endpoint calls

### Testing Requirements

After migration, test the following functionality:

- [ ] User registration and authentication
- [ ] Model training workflow (create, monitor, cancel, delete)
- [ ] Image generation with various settings (basic, i2i, controlnet)
- [ ] Generation management (favorite, delete)
- [ ] Collection management (create, rename, list)
- [ ] Upscaling functionality
- [ ] Credit purchases via Stripe
- [ ] Contact form submission
- [ ] Admin functions

### Additional Considerations

- **CORS Configuration**: Ensure the new VPS backend has proper CORS headers configured for:
  - `https://sketchme.ai`
  - `https://dev.sketchme.ai`
  
- **Firebase Configuration**: The frontend also uses Firebase for:
  - Authentication
  - Real-time listeners (Firestore) for model and generation status updates
  - These may or may not need changes depending on your backend architecture

- **Webhook Configuration**: If using Stripe webhooks, update webhook URLs in Stripe dashboard

- **SSL/HTTPS**: Ensure the VPS backend is served over HTTPS with valid certificates

---

## Notes

- All endpoints use `POST` method with JSON payloads
- Most endpoints require user authentication (userRecId parameter)
- Real-time updates for long-running operations (model training, image generation) are handled via Firebase Firestore listeners, not polling these endpoints
- The backend service appears to integrate with Replicate API for actual ML model training and inference

