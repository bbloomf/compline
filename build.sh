#!/bin/bash
export ANDROID_HOME=~/Library/Android/sdk
PATH="/usr/bin:$PATH:$ANDROID_HOME/cmdline-tools/latest/bin:$ANDROID_HOME/platform-tools:$ANDROID_HOME/build-tools:$ANDROID_HOME/emulator"
export JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk-17.jdk/Contents/Home
cordova build --release --device
ALTOOL_PW="$(cat appid-secret.key)" xcrun altool --upload-app --show-progress -f platforms/ios/build/Release-iphoneos/Compline.ipa -u bhb123@gmail.com -p @env:ALTOOL_PW
open platforms/android/app/build/outputs/apk/release
sh open-new-release.sh
