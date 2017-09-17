## Client for the moovel testme tasks

the client for the task was generated using [Create React Native App](https://github.com/react-community/create-react-native-app).

It is a small app which gets the first 10 java developers from __GitHub__ and displays them in a ListView.
With an Click/Touch on one ListItem a Modal with detailed information of the selected user opens.
In this view you have the option to send an email to the user, view is __GitHub__ page or open the user's blog. If any of the information is not provided a alert will inform you about that.

The right header icon allows you to rerun the API call.
The left header icon will show you my profile, which will be called directly from the __GitHub__ API.

If there is no network connection, an error screen will inform you about that.
This screen will also inform you if the rate limit is exceeded.

The fasted way to test the application is to run `npm start` and run the iOS or the Android emulator or use an actual android device.

If you need help you can also read the [DOCUMENTATION](./DOCUMENTATION.md).
