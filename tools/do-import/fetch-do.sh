#!/bin/sh
# Check out the parts of Divinum Officium that the importer reads, and the code
# and tables that da-calendar/build.js runs, at the commit pinned in DO_COMMIT.
# Usage: fetch-do.sh [checkout directory]
# The default directory is divinum-officium/ next to this repository.
set -e
here=$(cd "$(dirname "$0")" && pwd)
dir=${1:-$(git -C "$here" rev-parse --show-toplevel)/../divinum-officium}
commit=$(cat "$here/DO_COMMIT")

if [ ! -d "$dir/.git" ]; then
  git clone --filter=blob:none --no-checkout --sparse \
    https://github.com/DivinumOfficium/divinum-officium "$dir"
fi
git -C "$dir" sparse-checkout set --no-cone \
  'LICENSE' \
  'web/www/horas/*/Psalterium/' \
  'web/www/horas/*/Ordinarium/' \
  'web/www/horas/*/Sancti/08-06.txt' \
  'web/www/horas/*/Sancti/10-DU.txt' \
  'web/www/horas/*/Sancti/11-02.txt' \
  'web/www/horas/*/Commune/C9.txt' \
  'web/www/horas/*/Tempora/Epi1-0.txt' \
  'web/www/horas/*/Tempora/Pasc0-0.txt' \
  'web/www/horas/*/Tempora/Quad6-4.txt' \
  'web/www/horas/*/Tempora/Quad6-5.txt' \
  'web/cgi-bin/' \
  'web/www/Tabulae/' \
  '/web/www/horas/horas.dialog' \
  '/web/www/horas/horas.setup' \
  '/web/www/horas/psaltery.ind' \
  'web/www/horas/Latin/' \
  'web/www/horas/English/'
git -C "$dir" cat-file -e "$commit^{commit}" 2>/dev/null || git -C "$dir" fetch origin
git -C "$dir" -c advice.detachedHead=false checkout "$commit"
echo "Divinum Officium $commit is checked out in $dir"
