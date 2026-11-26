PY’s Wallet 3.20 — Release candidate maintenance

BEFORE UPGRADING
Export a JSON backup from the current wallet and keep it somewhere private. Do not clear Safari website data or remove the existing installation. The local storage key remains pywallet2. The original and V2 GitHub Pages paths are separate installations; do not assume their data is shared.

DEPLOYMENT
1. Extract the ZIP in Files on iPhone.
2. In https://github.com/pykhong-a11y/purple-wallet-v2 upload index.html, manifest.json, sw.js and icon.png to the main branch root, replacing old copies.
3. Preserve the logos/ directory and upload all six PNG files inside it. If using GitHub on iPhone, open the logos folder and upload the images there; create the folder first if missing.
4. Commit changes and wait for GitHub Pages deployment. Open https://pykhong-a11y.github.io/purple-wallet-v2/ in Safari while online, close and reopen the wallet, and check Settings for 3.20. The updated service worker removes older wallet cache entries within its own scope. It does not clear transaction storage.
5. Check existing records and export/import using sample data before relying on the new build.
README.txt and supabase-setup.sql are setup references, not required on the public website.

CLOUD (OPTIONAL)
In your own Supabase project run supabase-setup.sql once in SQL Editor (skip if already configured), create an email/password user in Authentication, and enter the project URL and public anon key in Wallet settings. Never use a service-role key. Test with dummy records. Backups are not end-to-end encrypted. Sync runs only while open and authenticated; first sync requires matching copies. Conflicts stop synchronisation. Export before any manual restore. Live Supabase testing remains outstanding.

FEATURE NOTES
Eight themes, custom colours, six supplied bank/eWallet images (Grab uses the general Grab brand mark), shaded SVG icons, recurring payments, goals, instalments, claims, CSV import, albums, receipt OCR, split bills, spending map and foreign-currency tracking are retained. OCR and street maps require internet; maps disclose viewed areas to the map service. The PIN is a privacy screen, not encryption. The ledger is MYR-based; exchange rates are manual and fees are separate entries. Shortcuts can open receipt entry; native share-sheet integration is not provided. No voice recognition.

TESTING
3.20 corrects version metadata, replaces outdated instructions and adds scoped offline cache cleanup. JavaScript syntax and archive integrity checks are performed; actual iPhone and live Supabase tests are not performed. This is a release candidate, not a fully validated production release.
Original wallet: https://pykhong-a11y.github.io/purple-wallet/

3.20: Native opening amounts and transaction legs are persisted; existing records are estimated once using their legacy rate. Account totals use current valuation rates; income/expense reports retain booked MYR. Set up a new empty account before assigning a foreign currency. Back up before upgrading. Artwork is shaded SVG, not rendered 3D.

3.20: Logos embedded in index.html; upload root files directly. Separate budget, category and backup screens.
