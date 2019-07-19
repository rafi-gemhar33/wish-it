
## **Models**:
### **Users:**
const userSchema = new Schema({
    "email": {type: String, required: true},
    "username": {type: String, required: true},
    "password": {type: String, required: true},
    "bio": {type: String},
    "image": {type: String},
    "events": {type: [Schema.Types.ObjectId], ref: "Event"},
    "UserAddress": {type: Schema.Types.ObjectId, ref: "Address"},
});

### **Event**
const eventSchema = new Schema({
    "slug":{type: String, required: true},
    "occasion": {type: String, required: true},
    "eventname": {type: String, required: true},
    "date": {type: Date, required: true},
    "gifts":{type: [Schema.Types.ObjectId], ref: "Gift"},
    "user": {type: Schema.Types.ObjectId, ref: "User"},
    "eventAddress": {type: Schema.Types.ObjectId, ref: "Address"},
});

const giftSchema = new Schema({
    "name": {type: String, required: true},
    "itemURL": {type: String, required: true},
    "price": {type: Date, required: true},
    "isGifted":{type: Boolean, default:false},
    "event": {type: Schema.Types.ObjectId, ref: "Event"},
});

const addressSchema = new Schema({
    "name": {type: String, required: true},
    "phone": {type: Number, required: true},
    "pin": {type: Number, required: true},
    "line1": {type: String, required: true},
    "line2": {type: String, required: true},
    "city": {type: String, required: true},
    "state": {type: String, required: true},
});


## **Routes, End Points:**
### **Users:**

Register:
POST /api/users/user

Login:
POST /api/users/login

#### **Authentication required**

Get Current User
GET /api/users/user

Update User
PUT /api/users/user

### **Event**

Get Event
GET /api/events/:slug

Update Event
Patch /api/events/:slug

#### **Authentication required**
Get all the Events
GET /api/events/:userId

Create Event
POST /api/events

Update Event
PUT /api/events/:slug

Delete Event
DELETE /api/events/:slug

### **Gift**

Get Gifts from an Event
GET /api/gifts/:slug

#### **Authentication required**

Add Gifts to an Event
POST /api/events/:slug/gifts

Update Gift
PUT /api/gifts/:id

Delete Gift
DELETE /api/events/:slug/gifts/:id


### **Address**

#### **Authentication required**

Add Address to an Event
POST /api/events/:slug/gifts

Update Address
PUT /api/gifts/:id

Delete Address
DELETE /api/events/:slug/gifts/:id

