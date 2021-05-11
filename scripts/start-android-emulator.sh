#!/usr/bin/env bash

# Install AVD files
echo "y" | $ANDROID_HOME/tools/bin/sdkmanager --install "system-images;android-${API_LEVEL};google_apis;x86_64"
echo "y" | $ANDROID_HOME/tools/bin/sdkmanager "platforms;android-${API_LEVEL}" >/dev/null
echo "y" | $ANDROID_HOME/tools/bin/sdkmanager "build-tools;30.0.3" >/dev/null
echo "y" | $ANDROID_HOME/tools/bin/sdkmanager "platform-tools" >/dev/null
# Create emulator
echo "no" | $ANDROID_HOME/tools/bin/avdmanager create avd -n "${AVD_NAME}" -k "system-images;android-${API_LEVEL};google_apis;x86_64" --device "${PROFILE}" --force --sdcard 512M

# increase memory size to 2048M to avoid error "System UI is not responding"
cat ~/.android/avd/${AVD_NAME}.avd/config.ini
echo "hw.ramSize=2048" >> ~/.android/avd/${AVD_NAME}.avd/config.ini
cat ~/.android/avd/${AVD_NAME}.avd/config.ini

echo "Starting emulator"

# Start emulator in background
nohup $ANDROID_HOME/emulator/emulator -avd ${AVD_NAME} -no-snapshot -noaudio -wipe-data > /dev/null 2>&1 &
$ANDROID_HOME/platform-tools/adb wait-for-device shell 'while [[ -z $(getprop sys.boot_completed | tr -d '\r') ]]; do sleep 1; done; input keyevent 82'

$ANDROID_HOME/platform-tools/adb devices

echo "Emulator started"
