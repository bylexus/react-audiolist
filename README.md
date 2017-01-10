react-audiolist
===============

> A simple component to render a playlist for audio files and controls for playing them

The goal of react-audiolist is to offer a simple audio playlist for a given set of
audio files. I created this component to properly offer my music files on my private site, https://alexi.ch/music/.

The component is not yet finished, a first use case is shown in the following HTML snippet:

```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8" />
        <title>ReactAudiolist Test</title>
    </head>

    <body>
        <div id="container"></div>
        <script src="dist/react-audiolist-debug.js"></script>
        <script type="text/javascript">
ReactAudioList(
        document.getElementById('container'),
        [
        {title: 'Lexus first song', url: 'https://alexi.ch/site/assets/files/1066/lexus_first_song.mp3'},
        {title: 'Easy Flow', url: 'https://alexi.ch/site/assets/files/1067/easy_flow.mp3'},
        {title: 'Holiday', url: 'https://alexi.ch/site/assets/files/1068/holiday.mp3'},
        {title: 'Wood Song 1', url: 'https://alexi.ch/site/assets/files/1069/wood_song_1.mp3'},
        {title: 'In the garage', url: 'https://alexi.ch/site/assets/files/1070/in_the_garage.mp3'},
        {title: 'Taureg Moon Base', url: 'https://alexi.ch/site/assets/files/1071/taureg_moon_base.mp3'},
        {title: 'Retro Short Shot', url: 'https://alexi.ch/site/assets/files/1072/retro_short_shot.mp3'},
        {title: 'LogicExperiment', url: 'https://alexi.ch/site/assets/files/1073/logicexperiment.mp3'}
        ]);
        </script>
    </body>
</html>
```

More options and documentation as this project grows.
