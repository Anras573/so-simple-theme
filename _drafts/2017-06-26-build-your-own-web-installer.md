---
layout: post
title: Build Your Own Web Installer
excerpt: "In this post, we will explore how we can use C# and WPF to build a small modern web installer."
categories: tutorials
tags: [tutorial, C#, WPF]
image:
  feature: so-simple-sample-image-1.jpg
comments: true
share: true
---

In this post, we will explore how we can use C# and WPF to build a small modern web installer.

Recently at work we discussed the possibility to create a small installer so the user shouldn't have to wait a long time before he can start installing our software. The way we decided to solve this issue, was to create a web installer. It's a small installer, only meant for downloading the real installer, but in the meantime to give the user a sense of progress.

What's required to follow this guide?
* Visual Studio or Visual Studio Code.
* Graphic art, that we will use as our brand. Preferably in .ico format.
* Some knowledge of C# is assumed.
* An internet connection.
