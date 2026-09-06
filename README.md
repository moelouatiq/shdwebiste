# SHD Immobilier

Application immobilière multilingue (FR / EN / AR avec RTL) prête pour Vercel : site public, catalogue filtrable, MongoDB, import Excel, contacts Resend et administration protégée.

## Déploiement rapide sur Vercel

1. Dans Vercel, cliquez **Add New > Project** et importez `moelouatiq/shdwebiste`.
2. Conservez le framework détecté **Next.js** et les commandes par défaut.
3. Ajoutez les cinq variables décrites ci-dessous dans **Settings > Environment Variables** pour `Production`, `Preview` et `Development` selon vos besoins.
4. Lancez **Deploy**. Après toute modification des variables, relancez un déploiement.
5. Ouvrez `/admin` (ou `/admin.html`) sur votre domaine Vercel, saisissez `ADMIN_TOKEN`, puis importez `modele-biens-shd.xlsx`.

## Variables d’environnement

| Variable | Obligatoire | Description |
|---|---:|---|
| `MONGODB_URI` | Oui | URI MongoDB Atlas avec le nom de base, par exemple `...mongodb.net/shd_immobilier?...` |
| `ADMIN_TOKEN` | Oui | Secret long et aléatoire utilisé dans `x-admin-token` |
| `RESEND_API_KEY` | Oui pour l’email | Clé API Resend (`re_...`) |
| `RESEND_FROM_EMAIL` | Oui pour l’email | Expéditeur vérifié, ex. `SHD Immobilier <contact@shdimmobilier.ma>` |
| `CONTACT_TO_EMAIL` | Oui pour l’email | Adresse qui reçoit les demandes |
| `NEXT_PUBLIC_BOOKING_ENGINE_URL` | Quand le moteur est prêt | URL publique du moteur de réservation. Sans valeur, le bouton reste visible mais désactivé. |

Copiez `.env.example` vers `.env.local` uniquement pour le développement local. `.env.local` est ignoré par Git. Ne commitez jamais de secret.

## Créer MongoDB Atlas

1. Créez un projet et un cluster sur [MongoDB Atlas](https://www.mongodb.com/atlas/database).
2. Dans **Database Access**, créez un utilisateur avec un mot de passe fort et le droit lecture/écriture sur la base.
3. Dans **Network Access**, autorisez l’accès depuis Vercel. Pour un MVP serverless, Atlas propose souvent `0.0.0.0/0`; compensez avec un utilisateur dédié et un mot de passe robuste. Une configuration réseau plus restrictive est préférable si votre offre le permet.
4. Dans **Connect > Drivers**, copiez l’URI et remplacez `<password>`. Ajoutez `/shd_immobilier` avant les paramètres de requête.
5. Enregistrez l’URI complète comme `MONGODB_URI` dans Vercel.

Les collections `properties`, `contacts` et `import_logs` ainsi que l’index unique sur `properties.reference` sont créés automatiquement. La connexion est mise en cache entre les invocations serverless réutilisées.

## Configurer Resend

1. Créez un compte sur [Resend](https://resend.com/).
2. Dans **Domains**, ajoutez votre domaine d’envoi et recopiez chez votre registrar les enregistrements DNS demandés (SPF/DKIM).
3. Attendez que le domaine soit marqué **Verified**. `RESEND_FROM_EMAIL` doit utiliser ce domaine vérifié.
4. Créez une clé API et placez-la uniquement dans `RESEND_API_KEY` sur Vercel.
5. Définissez `CONTACT_TO_EMAIL=shdimmobillier@gmail.com`. Le visiteur est automatiquement configuré en `replyTo`.

Les prix ne sont pas affichés sur le site public. Quand le lien du moteur de réservation est disponible, ajoutez-le dans `NEXT_PUBLIC_BOOKING_ENGINE_URL` sur Vercel puis redéployez le projet.

Le contact est d’abord enregistré dans MongoDB. Si Resend échoue, il reste enregistré avec `emailDelivery.status = failed` et l’erreur est visible dans l’administration.

## Importer et mettre à jour les biens

Le modèle se trouve à la racine : **`modele-biens-shd.xlsx`**. Les colonnes `images` et `equipements` acceptent plusieurs valeurs séparées par `;`.

- `reference` est obligatoire et unique.
- Un nouvel import avec la même `reference` met à jour le bien existant (upsert MongoDB), sans doublon.
- `publie = oui` rend le bien visible sur le site public.
- `mis_en_avant = oui` l’affiche dans la section de la page d’accueil (s’il est également publié).
- Taille maximale : 5 Mo et 1 000 lignes par import.
- En cas de lignes invalides, l’import est rejeté avec les numéros de lignes à corriger.

Depuis `/admin`, vous pouvez aussi publier/dépublier un bien et activer/désactiver sa mise en avant sans réimporter le fichier.

## Administration

- URL principale : `https://VOTRE-DOMAINE/admin`
- Alias : `https://VOTRE-DOMAINE/admin.html`
- Le token est saisi manuellement et conservé dans `sessionStorage` seulement pour l’onglet courant.
- Toutes les API admin vérifient le header `x-admin-token` côté serveur.
- `ADMIN_TOKEN` n’est jamais envoyé au bundle public depuis une variable de build.

L’administration permet l’import Excel, la consultation des biens, le contrôle publication/mise en avant, la consultation des contacts et le passage des statuts `new` → `processing` → `closed`.

## API

- `GET /api/properties?city=&type=&maxPrice=&featured=true&lang=fr`
- `GET /api/property?reference=...&lang=fr`
- `POST /api/contact`
- `POST /api/admin/import-properties` (multipart `file`)
- `GET|PATCH /api/admin/properties`
- `GET|PATCH /api/admin/contacts`

## Développement local

```bash
npm install
cp .env.example .env.local
npm run dev
```

Puis ouvrez `http://localhost:3000/fr` et `http://localhost:3000/admin`.
