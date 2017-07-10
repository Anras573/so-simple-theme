---
layout: post
title: Fractal Tree in JavaScript
excerpt: "In this post, we will explore how we can use JavaScript to draw a fractal tree, and we'll even throw in a slider, so you can edit the angle from the page!."
categories: tutorials
tags: [tutorial, JS, JavaScript]
comments: true
share: true
---

In this post, we will explore how we can use JavaScript to draw a fractal tree, and we'll even throw in a slider, so you can edit the angle from the page!

Once we're done the tree is going to look like this:

<canvas id="canvas" width="800" height="600" style="width: 100%; height: auto;"></canvas>
<script src="{{ site.url }}/assets/js/fractal_tree/animate.js" type="text/javascript"></script>

First lets talk about Fractal trees, and what they are.  
A Fractal tree is a tree drawn recursively. If you wanted to explain a tree to a friend, you might say that a tree consist of the trunk an two branches.
But wait! The branches each consist of two more branches and so on and so forth.
