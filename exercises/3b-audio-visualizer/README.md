# HW - Audio Visualizer - Part I

## I. Overview
In part I of this HW, you will be learning about the HTML5 [WebAudio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API), and how to utilize it to create an audio visualizer. Topics explored:

1. [Audio Routing Graph](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Basic_concepts_behind_Web_Audio_API#Audio_graphs)

![image](_images/audio-routing-graph.jpg)

2. [AnalyzerNode](https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode)
  - sampling & bins
  - frequency data - `analyserNode.getByteFrequencyData(data);`
  - waveform data  - `analyserNode.getByteTimeDomainData(data);`
  
3. [JavaScript Typed Arrays](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays) - frequency and waveform data is passed *by reference* to these non-resizable typed arrays.

4. [CORS Restrictions](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) - ("Cross-origin Resource Sharing") means that you can't run the visualizer start files locally off of your hard drive. You might see an error message like this:

**`MediaElementAudioSource outputs zeroes due to CORS access restrictions for file:///Users/...../soundfile.mp3`**

**Solutions to CORS issues:**
- Run the code off of a web server, which you can do by uploading your code to Banjo
- Use an IDE like [Brackets](http://brackets.io) - which creates a local web server for you to run your code on
- [You can also create a web server using Python](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/set_up_a_local_testing_server) on your local machine
- [Firefox Developer Edition](https://www.mozilla.org/en-US/firefox/developer/) turns off CORS by default, so you don't need a web server

## II. Submission
- the instructions are here: [Audio-Viz-ICE-1.pdf](https://github.com/tonethar/IGME-330-Master/blob/master/notes/_files/Audio-Viz-ICE-1.pdf) 
- the start files are zipped up in mycourses
- also see the mycourses.rit.edu dropboxes for due date

***

# HW - Audio Visualizer - Part II

## I. Overview
In part II of this HW we will look at grabbing RGBa data from the canvas, and performing manipulations on it:
- [`ctx.getImageData(x,y,width,height)`](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/getImageData) returns an [ImageData](https://developer.mozilla.org/en-US/docs/Web/API/ImageData) object
- [`ImageData.data`](https://developer.mozilla.org/en-US/docs/Web/API/ImageData/data) is a typed array - in this case a [`Uint8ClampedArray`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8ClampedArray)
- "Photoshop-like" color manipulations we will do:
  - tint
  - invert
  - emboss
- Other effects
  - motion detection
  - object recognition

## II. Links from Exercise

**The examples that rely on a Webcam only work in Chrome:**

- Video Filters Example: http://igm.rit.edu/~acjvks/courses/2014-spring/450/code/getImageData-putImageData-demo/video-image-data-demo-3.html
- Web Cam Example: https://igm.rit.edu/~acjvks/courses/2014-spring/450/code/video/webcam-image-data-demo.html
- Web Cam plus Motion Detect Example: https://igm.rit.edu/~acjvks/courses/2014-spring/450/code/video/webcam-image-data-demo-2.html
- Web Cam plus Face Detect Example: https://igm.rit.edu/~acjvks/courses/2014-spring/450/code/video/webcam-image-data-demo-3.html
- Web Cam sunglasses app: https://igm.rit.edu/~acjvks/courses/2014-spring/450/code/video/JS-Object-Detect/js-objectdetect-master/examples/example_sunglasses_jquery.htm
- Web Cam head tracker app:  https://igm.rit.edu/~acjvks/courses/2014-spring/450/code/headtracker/headtracker2.html

## III. Submission
- the instructions are here: [Audio-Viz-ICE-2.pdf](https://github.com/tonethar/IGME-330-Master/blob/master/notes/_files/Audio-Viz-ICE-2.pdf)
- see the mycourses.rit.edu dropboxes for due date

***

# HW - Audio Visualizer - Part III

## I. Overview
In part III of this HW, you will continue to work with the HTML5 [WebAudio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API) - topics:
- how to add a [DelayNode](https://developer.mozilla.org/en-US/docs/Web/API/DelayNode) to your visualizer's audio graph - this gives a "reverb" effect

## II. Submission
- the instructions are here: [Audio-Viz-ICE-3.pdf](https://github.com/tonethar/IGME-330-Master/blob/master/notes/_files/Audio-Viz-ICE-3.pdf) 
- see the mycourses.rit.edu dropboxes for due date