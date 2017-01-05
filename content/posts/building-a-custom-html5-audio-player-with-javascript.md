+++
weight = -1
date = "2014-05-04"
title = "Building a Custom HTML5 Audio Player With Javascript"
aliases = ["/html5-audio/building-a-custom-html5-audio-player-with-javascript/"]
+++

This tutorial details how JavaScriptpt, HTML, and CSS can be used to make a custom HTML5 audio interface. It is divided into three sections.

1. The Play Button
2. Track Progress
3. Changing Track Position

Here is the code for the audio element that we will be controlling.

{{< highlight html >}}
<audio id="music" controls="controls">
  <source src="music/onlyidreamwithyou1.ogg" type="audio/ogg" />
  <source src="music/onlyidreamwithyou1.mp3" type="audio/mpeg" />
</audio>
{{< /highlight >}}

<!--more-->

## PLAY BUTTON
First we will use HTML to create the play button.We will make two CSS classes, play and pause.

1. Play – the background property is a play icon
2. Pause – the background property is a pause icon

CODE FOR CLASSES AND BUTTON
{{< highlight html >}}

<style>
#pButton{
	height:60px;
	width: 60px;
	border: none;
	background-size: 50% 50%;
	background-position: center;
}
.play{background: url('../images/play.png') no-repeat;}
.pause{background: url('../images/pause.png') no-repeat;}
</style>

<button id="pButton" class="play" onclick="playAudio()"></button>
{{< /highlight >}}

To make our play button function, we write onclick="playAudio" inside the button’s opening tag. This means the playAudio function is called whenever pButton is clicked. The function toggles between the .play and .pause classes and plays and pauses the audio.

{{< highlight javascript >}}
// variable to store HTML5 audio element
var music = document.getElementById('music');

function playAudio() {
	if (music.paused) {
		music.play();
		pButton.className = "";
		pButton.className = "pause";
	} else {
		music.pause();
		pButton.className = "";
		pButton.className = "play";
	}
}
{{< /highlight >}}

The playAudio function checks if the audio is paused. If the audio is paused we call the audio element’s play function. We clear pButton’s classes and add the pause class.
If the audio is playing we pause it and change pButton’s class to play.

That is all the code you need to make a play button that targets the audio element.

Functions like play and pause are part of the HTMLMediaElement’s interface. If you are interested the API is here.

## TRACK PROGRESS

Before we can start tracking the progress of the audio, we should modify our HTML. Instead of just having a play button, we will create an audio player. We will nest the button, a timeline, and a playhead inside of a div whose id will be audioplayer.

Here is the HTML and CSS. You should also add the float:left property to the play button.

{{< highlight html >}}
<style>
#timeline{
	width: 400px;
	height: 20px;
	background: #4200f7;
	margin-top: 20px;
	float: left;
	border-radius: 15px;
}

#playhead{
	width: 18px;
	height: 18px;
	border-radius: 50%;
	margin-top: 1px;
	background: rgba(0, 255, 196, 0.82);
}
</style>

<div id="audioplayer">
	<button id="pButton" class="play" onclick="play()"></button>
	<div id="timeline">
		<div id="playhead"></div>
	</div>
</div>
{{< /highlight >}}

The audio player should look something like this

## Image Goes Here

The next step is to write JavaScript that will move the playhead as the track advances. This is accomplished by adding an event listener for timeupdate that triggers a function that moves the playhead the appropriate amount. In order for time update to work we will also need to get the duration of the audio file. The code is also below.

{{< highlight javascript >}}
var duration;
var music = document.getElementById('playhead');
music.addEventListener("timeupdate", timeUpdate, false);

function timeUpdate() {
	var playPercent = 100 * (music.currentTime / duration);
	playhead.style.marginLeft = playPercent + "%";
}

// Gets audio file duration
music.addEventListener("canplaythrough", function () {
	duration = music.duration;
}, false);
{{< /highlight >}}

## CHANGING TRACK POSITION

There are two ways that we will allow users to change the track position.

- Clicking on the timeline
- Dragging the playhead

The first method is accomplished by listening for clicks on the timeline, calculating the click’s position as a percent of the timeline’s width, and updating the playhead and track positions.

{{< highlight javascript >}}
//Makes timeline clickable
timeline.addEventListener("click", function (event) {
	moveplayhead(event);
	music.currentTime = duration * clickPercent(event);
}, false);

// returns click as decimal (.77) of the total timelineWidth
function clickPercent(e) {
	return (e.pageX - timeline.offsetLeft) / timelineWidth;
}

function moveplayhead(e) {
	var newMargLeft = e.pageX - timeline.offsetLeft;

	if (newMargLeft = 0 amp;amp; newMargLeft = timelineWidth) {
		playhead.style.marginLeft = newMargLeft + "px";
	}
	if (newMargLeft  0) {
		playhead.style.marginLeft = "0px";
	}
	if (newMargLeft  timelineWidth) {
		playhead.style.marginLeft = timelineWidth + "px";
	}
}
{{< /highlight >}}

The code above adds an event listener to the timeline. If the timeline is clicked, this function fires which moves the playhead to the click position and updates the track’s current time.

The moveplayhead function works by changing the playhead’s left margin. The left margin controls the space between the left side of the timeline and the playhead. To calculate the correct left margin value, the x-coordinate of the click event is subtracted by the timeline’s left offset.

The conditionals are necessary if the you want to support playhead dragging. If you don’t, just set the playhead’s left margin to newMarginLeft, as any click will be inside the timeline.

The codepen below puts everything together.

<p data-height="330" data-theme-id="5580" data-slug-hash="Kfgix" data-default-tab="result" data-user="katzkode" data-embed-version="2" data-pen-title="HTML5 Audio Player" class="codepen">See the Pen <a href="http://codepen.io/katzkode/pen/Kfgix/">HTML5 Audio Player</a> by Alex Katz (<a href="http://codepen.io/katzkode">@katzkode</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>

If you are interested in using multiple audio players on the same page, you can check out my code here – <a href="/posts/multiple-html5-audio-players">Multiple HTML5 Audio Players</a>.
