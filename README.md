# Stock Ticker Taskbar

A mini stock ticker that docks within your taskbar

<img width="300" alt="Stock Ticker Taskbar"
src="https://cloud.githubusercontent.com/assets/656630/21601000/823339aa-d152-11e6-9e24-7bb5557183f3.gif" />

## Challenge

1. **Trays only allow image content** -- the ticker cannot be comprised of any UI elements. The tray will only display a single image, and that's it.
2. There are two processes: the "main process" (the ticker) and the "rendering process" (the window when tapping the tray icon). These need to communicate

## Solution

To achieve a **scrolling stock ticker** we have to create a series of images that will act as frames. We create an image that contains the entire ticker output -- think of this as an entire film strip. Then we create a series of frames -- a subset of the entire strip. Think of these as the individual parts of a film strip. We build a collection of all the frames, and then with a timer, we update the tray's icon with the next frame. This will give the illusion that the ticker is "ticking". But in reality, we're just creating sprites and replaying these frames to create an animation effect.


_Description of inter process communication coming soon_.

Summary: We create a Redux middleware that will send a message to the native side. We create a second middleware that will observe messages from the native side and then dispatch them as actions into the Redux pipeline.

In essence - **the native process is able to dispatch Redux actions into our UI process.**
