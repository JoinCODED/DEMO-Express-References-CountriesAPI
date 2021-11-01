### Country Model

1. Let's add some fields to our `City` model that represents the country that's selling this state.

   ```javascript
   {
       name: {
         type: String,
         required: false
       },
       countryName: {
         type: String,
         required: false
       },
       countryImage: {
         type: String,
         required: false
       },
     },

   ```

2. Does this make sense? To add those fields to the `State` model? A country can have 100 different states, does that mean that those fields will be repeated in all 100 rows?! Nonsense! What we need to do is create a `Country` model, then link it to the `State` model.

3. Let's start by creating a file called `Country.js` in the `models` folder.

4. Create your model and move the relevant fields from `State`:

   ```javascript
   const CountrySchema = new Schema({
     name: String,
     image: String,
   });
   ```

5. Setup your slug by `require`ing `mongoose-slug-plugin`

   ```javascript
   const mongooseSlugPlugin = require("mongoose-slug-plugin");
   ```

6. **Right before returning** `Shop`, set your slug source to `name`.

   ```javascript
     const CountrySchema = new Schema({
        ...
       });

   CountrySchema.plugin(mongooseSlugPlugin, { tmpl: '<%=name%>' });

   module.exports = model('Country', CountrySchema);
   };
   ```

### Country Routes

1. Let's create list and create methods for our countries! The easiest way to do this is to copy the `stateController` and `state` route and change the naming.

2. Then in `app.js`, create a route for the country routes:

   ```javascript
   const countryRoutes = require("./apis/countries/routes");
   ```

   ```javascript
   app.use("/countries", countryRoutes);
   ```

### State Has a Country

1. Now let's create the relationship between our two models, `State` and `Country`. Let's think about it, every country can have _many_ states, but every state can have _one_ country only.

2. We will define our relationships first in `models/Country.js` as a field. Let's translate the following phrase to code "A country has many states". So our country has a field of type array because it `hasMany` States.

   ```javascript
   const CountrySchema = new Schema({
     name: String,
     image: String,
     states: [{ type: Schema.Types.ObjectId, ref: "State" }],
   });
   ```

3. Next, We will define our relationships from the other side in `models/State.js`:

   ```javascript
   const StateSchema = new Schema({
     name: String,
     image: String,
     country: { type: Schema.Types.ObjectId, ref: "Country" },
   });
   ```

4. Then let's add some states, note that a field called `country` was added! Let's try this in Postman. Fetch all `states`. The field `country` is there, but it's set to `empty`.

### StateCreate Betrays States

So now whenever we create a new state we need to add the country \_id. The easiest way to do that is to pass the country \_id in the request body. But that's not the correct convention, we agreed before that IDs are passed in the request's URL.

1. So we will change our `createState` route to `/countries/:countryId/states`. Since it starts with `countries`, we will move the `createState` route and controller to the country's routes and controllers files.

2. Since `createState` has `countryId` as a route param, we will save it in `req.body` before passing it to `State.create`.

   ```javascript
   try {
       [...]
       req.body.country = req.params.countryId;
       const newState = await State.create(req.body);
       [...]
     }
   ```

3. Then, we will add the new State to its own country using mongoose `$push` query which adds an element in an array

```javascript
await Bakery.findOneAndUpdate(
  { _id: req.params.countryId },
  { $push: { states: newState._id } }
);
```

4. Let's try creating another state, Wowwwww!!! Amaaazinng!

### Country List

1. Let's fetch the list of countries in Postman. Okay, nothing special about it. But what if we can add to every country the list of its states!

2. To do that we will pass it to a function called `populate()` and pass it your field:

   ```javascript
   Country.find().populate("states");
   ```

3. Test. Yaas all is working properly!!

### State List

We'll fix our states list to return all states, but to also add the country's name to display it in the state list.

1. Now let's include the country details in the states list! In `stateController`:

   ```javascript
   State.find().populate("country");
   ```

2. Let's try fetching our list of states again. It works!
