#!/bin/bash
#rm -rf www
#cp ../dist www
cordova build --release --device
/Applications/Xcode.app/Contents/Applications/Application\ Loader.app/Contents/Frameworks/ITunesSoftwareService.framework/Versions/A/Support/altool --upload-app -f platforms/ios/build/device/Compline.ipa -u bhb.123@gmail.com