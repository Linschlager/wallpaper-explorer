# Wallpaper Scrolling

## What it does

It reads the feed from https://reddit.com/r/wallpaper and displays all the images in full width. If you don't scroll yourself, it will scroll to the next image every 2 seconds (can be adjusted in `SPEED`).

## Known bugs

- Sometimes, the images aren't actually images but links to imgur albums. This may need to be individually implemented to make it work.
- The amount of data actually kept in the react state management is way too much. This can be reduced to just the necessary bits: image link and title
