# TP2 - Advanced web development

Again, I have helped Tom Mansion, Léandre Becq, Rémy Chagnas and Nathan Pinault.
And these gentle guys helped me too!

---

## Commands

### Run a server locally

#### With Service Worker enabled

```bash
ng build
```

Then set up a server using `http-server` :

```bash
http-server -p {port} -c-1 dist/simple-app/
```

You can access to it in [http://localhost:port](http://localhost:port). 

#### Without Service Worker

```bash
ng serve
```

By default, the app URL is set up on [http://localhost:4200](http://localhost:4200).

### Run API server locally

`baseUrl` in  `src/environnements/environment.ts` must match with the url used by the server.

```bash
json-server --watch db/db.json
```

You can visit and try routes on it on [http://localhost:3000](http://localhost:3000).
