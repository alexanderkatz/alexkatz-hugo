+++

date = "2016-08-14"
title = "Google Analytics Embed API"

+++

The Embed API is a JavaScript library that lets you create custom dashboards for Google Analytics that can be hosted on your own site. Why bother creating a dashboard programmatically when you can just create one using Google’s site? Because you can make a better one, control its styling, and accomplish things that cannot be done through Google Analytics alone.

There is a Google tutorial on the Embed API which I used and and enjoyed. I am borrowing from it, but am filling in gaps and adding sections.

To see the types of dashboards that can be built using the API, check out the Embed API <a title="demos" href="https://ga-dev-tools.appspot.com/demos/embed-api" target="_blank">demos</a>.

<!--more-->

<hr />

<!--GETTING STARTED-->
<h2 class="segment">Creating a Client ID</h2>
The first thing we are going to do is create a Google Client ID. This ID is needed to perform user authorization.

To get a client ID we need to go to the <a title="Google Developers Console" href="https://console.developers.google.com/" target="_blank">Google Developer's Console</a>.

Login to the Console and press the "Create Project" button. Give your project a name and a unique ID.

<img class="alignnone wp-image-298 size-full" src="http://www.alexkatz.me/wp-content/uploads/2014/08/nameproject.png" alt="nameproject" width="515" height="281" />

Now that we have created a project, we can enable the Analytics API.  To do so, click on the <strong>APIs</strong> link, which is nested under <strong>APIs and auth</strong> in the left sidebar.

You should see a list of APIs.  Click on the <strong>off</strong> button to the right of the Analytics API, this will turn it on.

<img class="alignnone wp-image-301 size-full" src="http://www.alexkatz.me/wp-content/uploads/2014/08/Screen-Shot-2014-08-22-at-1.05.18-PM-e1408729119445.png" alt="Screen Shot 2014-08-22 at 1.05.18 PM" width="579" height="267" />

After enabling the Analytics API, click on <strong>Credentials</strong>, which is under <strong>APIs</strong>.

Click the blue, <strong>Create New Client ID</strong>, button.

<img class="alignnone size-full wp-image-304" src="http://www.alexkatz.me/wp-content/uploads/2014/08/Screen-Shot-2014-08-22-at-1.06.25-PM.png" alt="Screen Shot 2014-08-22 at 1.06.25 PM" width="514" height="605" />

You see where it says JavaScript origins. This needs to be set to your domain. Do not include any paths.

If you are using localhost, simply set the origins to http://localhost/.
It is important to type your host address exactly. If your site is accessed through https, you must include https in the address.
Sometimes this can be finicky, so for safe measure include your domain with https, http, and http://www at the beginning.

When this is all set, press <strong>Create Client ID</strong>.

We are all done with the Dev Console, but you should copy the Client ID or leave the window open for future reference.

<hr />

<!--THE CODE-->
<h2 class="segment">The Code</h2>
Finally we can start the fun part. Everything up until this point has been setup. It hasn't been thrilling, but it has been important.

As much as I wanted to wait until the end to give the complete code, it makes more sense for me to do it now and then provide a walkthrough.

{{< highlight html >}}
<!DOCTYPE html>
&lt;html&gt;

&lt;head&gt;
	&lt;title&gt;Embed API Demo&lt;/title&gt;
&lt;/head&gt;

&lt;body&gt;
	&lt;!-- Step 1: Create the containing elements. --&gt;
	&lt;section id="auth-button"&gt;&lt;/section&gt;
	&lt;section id="view-selector"&gt;&lt;/section&gt;
	&lt;section id="timeline"&gt;&lt;/section&gt;

	&lt;!-- Step 2: Load the library. --&gt;
	&lt;script&gt;
		(function (w, d, s, g, js, fjs) {
			g = w.gapi || (w.gapi = {});
			g.analytics = {
				q: [],
				ready: function (cb) {
					this.q.push(cb)
				}
			};
			js = d.createElement(s);
			fjs = d.getElementsByTagName(s)[0];
			js.src = 'https://apis.google.com/js/platform.js';
			fjs.parentNode.insertBefore(js, fjs);
			js.onload = function () {
				g.load('analytics')
			};
		}(window, document, 'script'));
	&lt;/script&gt;

	&lt;script&gt;
		gapi.analytics.ready(function () {

		// Step 3: Authorize the user.
			var CLIENT_ID = 'Insert Your Client-ID here';

			gapi.analytics.auth.authorize({
				container: 'auth-button',
				clientid: CLIENT_ID,
			});

			// Step 4: Create the view selector.
			var viewSelector = new gapi.analytics.ViewSelector({
				container: 'view-selector'
			});
			// Step 5: Create the timeline chart.

			var timeline = new gapi.analytics.googleCharts.DataChart({
				reportType: 'ga',
				query: {
					'dimensions': 'ga:date',
					'metrics': 'ga:sessions',
					'start-date': '30daysAgo',
					'end-date': 'yesterday',
				},
				chart: {
					type: 'LINE',
					container: 'timeline'
				}
			});

			// Step 6: Hook up the components to work together.
			gapi.analytics.auth.on('success', function (response) {
				viewSelector.execute();
			});

			viewSelector.on('change', function (ids) {
				var newIds = {
					query: {
						ids: ids
					}
				}
				timeline.set(newIds).execute();
			});
		});
	&lt;/script&gt;
&lt;/body&gt;

&lt;/html&gt;
{{< /highlight >}}

<h3>Walkthrough</h3>
We will begin by creating a new html doc and creating three sections with the following ids.
<ul>
	<li>auth</li>
	<li>view-selector</li>
	<li>data-chart</li>
</ul>
These sections will contain an authentication button, a view picker, and a chart.

{{< highlight html >}}
&lt;section id="auth-button"&gt;&lt;/section&gt;
&lt;section id="view-selector"&gt;&lt;/section&gt;
&lt;section id="timeline"&gt;&lt;/section&gt;
{{< /highlight >}}

To load the Embed API, include the following script block.

{{< highlight html >}}
&lt;script&gt;
	(function (w, d, s, g, js, fjs) {
		g = w.gapi || (w.gapi = {});
		g.analytics = {
			q: [],
			ready: function (cb) {
				this.q.push(cb)
			}
		};
		js = d.createElement(s);
		fjs = d.getElementsByTagName(s)[0];
		js.src = 'https://apis.google.com/js/platform.js';
		fjs.parentNode.insertBefore(js, fjs);
		js.onload = function () {
			g.load('analytics')
		};
	}(window, document, 'script'));
&lt;/script&gt;

{{< /highlight >}}

The remaining javascript will be wrapped in the gapi.analytics.ready function. This function is triggered when the API is finished loading.

The first thing we will do is authorize the user using OAUTH 2.0. This will allow the us to display information tied to their google analytics account.

Here is the code for to perform authentication. Make sure to set the CLIENT-ID variable to your Client ID.

{{< highlight javascript >}}
// Step 3: Authorize the user.

var CLIENT_ID = 'Client-ID Goes Here';

gapi.analytics.auth.authorize({
	container: 'auth-button',
	clientid: CLIENT_ID,
});
{{< /highlight >}}

<!--VIEWSELECTOR-->

The following function creates a view selector. The container is set to the id of the viewpicker section.

{{< highlight javascript >}}

// Step 4: Create the view selector.

var viewSelector = new gapi.analytics.ViewSelector({
	container: 'view-selector'
});
{{< /highlight >}}

Here is the code to create the chart. The query specifies what data you want and the chart defines visual aspects.
{{< highlight javascript >}}
// Step 5: Create the timeline chart.

var timeline = new gapi.analytics.googleCharts.DataChart({
	reportType: 'ga',
	query: {
		'dimensions': 'ga:date',
		'metrics': 'ga:sessions',
		'start-date': '30daysAgo',
		'end-date': 'yesterday',
		},
	chart: {
		type: 'LINE',
		container: 'timeline'
	}
});
{{< /highlight >}}
The last block of code ties everything together. The viewSelector onChange function updates the chart when a new view is selected.

{{< highlight javascript >}}
// Step 6: Hook up the components to work together.

gapi.analytics.auth.on('success', function (response) {
	viewSelector.execute();
});

viewSelector.on('change', function (ids) {
	var newIds = {
		query: {
			ids: ids
		}
	}
	timeline.set(newIds).execute();
	});
});
{{< /highlight >}}


<!-- I will be updating this tutorial and providing more tutorials related to the Embed API. -->
Here is a link to <a href="https://developers.google.com/analytics/devguides/reporting/embed/v1/devguide" title="Google's tutorial." target="_blank">Google's tutorial</a> if you are interested in exploring more.
