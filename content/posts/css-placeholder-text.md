+++
title = "CSS Placeholder Text"
date = "2017-03-10T11:35:29-05:00"
+++

How can you find all empty elements on a web page and populate them with placeholder text?

My first thought was to use JavaScript, loop through each element, and populate the empty ones. This approach works, but CSS provides a simple solution.

{{< highlight css >}}
*:empty::before{ 
    content: "Please Add Information"; 
}
{{< /highlight >}}

Using the empty selector and the pseudo element before, placeholder text can be defined using the CSS `content` property. The `:before` element is used because the `content` property only works with pseudo elements.

### My Use Case

I am working on an application that allows researchers to create and manage personas. 

- To create a new persona a user enters data into a form. 
- A page is generated for each persona that displays their associated data.

Because research is an ongoing process, not all of the data fields are filled when a persona is created. Because of this, certain persona pages had a number of blank sections. Instead of hiding blank sections, I used CSS to insert a "call to action" that prompted researches to update personas with their latest findings.

<p data-height="487" data-theme-id="5580" data-slug-hash="vxxzjN" data-default-tab="result" data-user="katzkode" data-embed-version="2" data-pen-title="Placeholder Text Using CSS" class="codepen">See the Pen <a href="http://codepen.io/katzkode/pen/vxxzjN/">Placeholder Text Using CSS</a> by Alex Katz (<a href="http://codepen.io/katzkode">@katzkode</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>

