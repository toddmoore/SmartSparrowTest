## Smart Sparrow Coding Task

#### Overview

-------
##### Docker
I've been meaning to try out docker for awhile so I thought I'd give it a shot with this coding task and hey, it's great! If you want to fire up the docker server, then you just need to install [docker](https://docs.docker.com/installation/) and [docker compose](https://docs.docker.com/compose/install/).

Once you have the docker VM running you can run:

    docker-compose build

And then once that is complete:

    docker-compose up

That will get the development ubuntu container going (Docker will let you know what IP to use).

-------
##### bin

If you're super busy though and don't have time for that (why would you?) then I have included a compiled version of the project in app/bin. You should be able to open that using file protocol (not Chrome, canvas and images has a same origin policy issue), or, if you want, python SimpleHTTPServer (recommended).

    python -m SimpleHTTPServer

------
##### Browser Support

I've tested it for the following:

  - Android 4.4+
  - iOS 6+
  - Safari 7+
  - Firefox Latest
  - IE10+ (I wanted to use a native range input)
  - Chrome Latest

I does "work" on Android 4.3 native browser, but the canvas filter is a bit yuk. I figured though for the purposes of this test it's probably fine. If however I had to support 4.3 and below, I would probably remove easelJS and implement a pure canvas approach testing the effect of an image filter as I went on those devices.

#### Approach
-----
##### ReactJS & Canvas

I decided to use React and Canvas together as I've used this combo once before and I found it pretty powerful. I could have taken a pure Canvas approach, but like the API easelJS/createJS offers, so I decided to use that.

I also could have done away with React entirely and just done plain javascript, but, why not use a great tool? I'm still learning React, but so far I'm pretty impressed.

##### SystemJS and JSPM + ES6/7

I'm a big fan of SystemJS and JSPM. The solution is elegant and not having to build for dev is a dream. I've starting using ES6/7 APIs earlier this year and I haven't looked back. I think the code readability is awesome and it removes the need for sugar like coffeescript or dart. 

##### No Unit Tests
I decided not to implement unit tests here, which on reflection may have been a mistake. I'll discuss shortcomings next, but I think that tests would have been helpful around the scaling functions.

##### Application Structure

    /app
      |-- lib (js & jsx)
        `-- bootstrap (entry point)
          `-- app.jsx
            `-- Application
              `-- RangeComponent
                |-- VelocityInput
                |-- Canvas
          |-- utils
            `-- Utilies
              |-- debounce
            |-- ImageLoader



#### Improvements
-----
My main improvement would be understanding log scaling and exponential scaling more. I was a little lost when I got done to the scaling functions. Also, the colorFilter in easelJS wasn't great, and it took me a while to get it to work close to what we wanted. If the colors where more detailed (i.e. a rainbow), I'd be in a lot of trouble and would have had to abandon that approach as it wouldn't be flexible at all.

I also note that the Velocity input was read only.

-----
#### Docker Notes for future reference

Running through a clean install of OSX Yosemite with docker and docker compose.
