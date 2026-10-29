#!/bin/bash
# Brings the cordova branch up to the latest gh-pages release, in this checkout:
#
#   npm run update-cordova
#
# Run it on master once the release is in gh-pages: `npm version patch` (whose postversion builds
# dist/), then commit and push dist/.  It checks out cordova, merges origin/gh-pages into www/,
# and commits the version from www/version.json into config.xml and package.json, leaving you on
# cordova to run ./build.sh.
set -euo pipefail

fail() {
  echo "update-cordova: $1" >&2
  exit 1
}

# All in a function, so bash has read every line before checking out cordova removes this file.
main() {
  cd "$(git rev-parse --show-toplevel)"
  git diff --quiet HEAD || fail "commit or stash your changes first"
  if [ -e dist/.git ] && [ -n "$(git -C dist status --porcelain)" ]; then
    fail "dist/ has changes; commit the release to gh-pages and push it first"
  fi

  git fetch origin
  if git rev-parse -q --verify refs/heads/gh-pages >/dev/null &&
      [ "$(git rev-parse gh-pages)" != "$(git rev-parse origin/gh-pages)" ]; then
    fail "gh-pages and origin/gh-pages differ; push the release to gh-pages first"
  fi

  git checkout cordova
  git merge --ff-only origin/cordova
  # gh-pages is the root of the site, which is www/ on cordova.
  git merge --no-edit -X subtree=www origin/gh-pages

  local version
  version="$(node -p 'require("./www/version.json").version')"
  node -e 'require("./hooks/sync-config-version.js")({opts: {projectRoot: process.cwd()}})'
  npm version "$version" --no-git-tag-version --allow-same-version >/dev/null
  git add config.xml package.json package-lock.json
  git diff --cached --quiet || git commit -q -m "$version"

  echo
  echo "cordova is at $version. Next:"
  echo "  ./build.sh"
  echo "  git push origin cordova"
  echo "  git checkout master"
}

main "$@"
exit
