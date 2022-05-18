# TP1 - Advanced web development

I have helped Tom Mansion, Léandre Becq, Rémy Chagnas and Nathan Pinault.
And these gentle guys helped me too!
Also Alexis Da Costa helped me once.

## Some remarks

### Homepage

About the homepage, it was requested to show the last 10 articles published. I could do that in JavaScript directly by processing list of articles manually. But I'm not sure if it is scalable if we have a lot of items, so that's why the API does this for us instead.

## Encountered difficulties

### List of articles

I didn't know how to organize properly components for Articles page and homepage as they both use the initial `Articles` component. I wanted to prevent repetition as possible.
  - I saw that it was possible to use inheritance between components so I used it.
  - So now we have the original `Articles` which is extended by `SearchableArticles` (with search by title feature) and `HomeArticles` (with 10 latest posts).

### Author page and article creation form

Now that we have a new `Author` interface related to `author` property of `Article`, I had to find a way to connect the author field input in creation form.
The problem is, in database, the foreign key of this property is `authorId`. But in my `Article` interface, it's `author`.
To solve that, I have created a new interface `ArticleCreation`, which matches with the definition in database. Instead of using `Article` when creating an new article, I use this one. I don't know if there is any better way...

---

## Commands

### Run a server locally

```bash
ng serve
```

By default, the app URL is set up on [http://localhost:4200](http://localhost:4200).

### Run API server locally

`baseUrl` in  `src/environnements/environment.ts` must match with the url used by the server.

```bash
json-server --watch db/db.json
```

You can visit and try routes on it on [http://localhost:3000](http://localhost:3000)
