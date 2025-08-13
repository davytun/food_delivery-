$ pnpm start



> food-delivery@1.0.0 start C:\Users\Davytun\Desktop\react-native\food-delivery

> expo start



Starting project at C:\Users\Davytun\Desktop\react-native\food-delivery

Starting Metro Bundler

▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄

█ ▄▄▄▄▄ █▀▄█▀ ██ ▄█ ▄▄▄▄▄ █

█ █ █ █▄ ▄██ █ █ █ █

█ █▄▄▄█ █ ▀█▀██▀ ██ █▄▄▄█ █

█▄▄▄▄▄▄▄█ ▀▄█ █▄█▄█▄▄▄▄▄▄▄█

█▄▄▀ ▀█▄▄▀█ ▀█▄▀▄▄▀ ▄▀▄▄▀█

█▄█ ▄█▄▄▄██ ▀▄▄▀ ▀▀█▄▄█

█▄▀▄▄▀▄▄▄█▀▀▀ ▄ █▀█ ▄█ ██▀█

█▄▀▀ ▀▄▄▄▀█▄█ ▀██ ▄▄ ▀▀██▄█

█▄▄██▄█▄█ ▄▄▄██▄ ▄▄▄ █ ▄ █

█ ▄▄▄▄▄ █▄ ▀██▄ █▄█ ▀▄ █

█ █ █ █▀▀█ ▀▀▄ ▄▄ █▀█▄█

█ █▄▄▄█ █▀▀▀ ▄█ █▄ ▄█▄█

█▄▄▄▄▄▄▄█▄██▄▄█▄█▄███▄▄█▄▄█



› Metro waiting on exp://192.168.1.30:8081

› Scan the QR code above with Expo Go (Android) or the Camera app (iOS)



› Web is waiting on http://localhost:8081



› Using Expo Go

› Press s │ switch to development build



› Press a │ open Android

› Press w │ open web



› Press j │ open debugger

› Press r │ reload app

› Press m │ toggle menu

› shift+m │ more tools

› Press o │ open project code in your editor



› Press ? │ show all commands



Logs for your project will appear below. Press Ctrl+C to exit.

› Reloading apps

Android Bundled 3649ms node_modules\expo-router\entry.js (1318 modules)











import { Redirect, Slot } from "expo-router";



export default function _Layout() {

const isAuthenticated = false;



console.log("Is Authenticated:", isAuthenticated);



if (!isAuthenticated) {

console.log("User not authenticated. Redirecting to /sign-in...");

return <Redirect href="/(auth)/sign-in" />;

}



console.log("User authenticated. Rendering Slot...");

return <Slot />;

}







is not redirecting have try all possible way





$ ls

app/      babel.config.js  eslint.config.js  metro.config.js      package.json    tailwind.config.js

app.json  components/      expo-env.d.ts     nativewind-env.d.ts  pnpm-lock.yaml  tsconfig.json

assets/   constants/       images.d.ts       node_modules/        README.md



Davytun@DESKTOP-3C3ANJ7 MINGW64 ~/Desktop/react-native/food-delivery (master)

$ ls app

'(auth)'/  '(tabs)'/   _layout.tsx   global.css   index.tsx



Davytun@DESKTOP-3C3ANJ7 MINGW64 ~/Desktop/react-native/food-delivery (master)

$ ls app/(auth)











         (auth)

bash: syntax error near unexpected token `('



Davytun@DESKTOP-3C3ANJ7 MINGW64 ~/Desktop/react-native/food-delivery (master)

$ ls app/"(auth)"

_layout.tsx  sign-in.tsx  sign-up.tsx



Davytun@DESKTOP-3C3ANJ7 MINGW64 ~/Desktop/react-native/food-delivery (master)

$ ls app/"(tabs)"

_layout.tsx  cart.tsx  profile.tsx  search.tsx



Davytun@DESKTOP-3C3ANJ7 MINGW64 ~/Desktop/react-native/food-delivery (master)

$ 







the code is in C:\Users\Davytun\Desktop\react-native\food-delivery\app\(tabs)\_layout.tsx@


please dont tell me is moving the code to app/_layout.tsx because am wacth tutorial and that is what the guy ask me to do

(tabs)\_layout.tsx not app\_layout.tsx