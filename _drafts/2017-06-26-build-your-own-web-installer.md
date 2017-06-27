---
layout: post
title: Build Your Own Web Installer
excerpt: "In this post, we will explore how we can use C# and WPF to build a small modern web installer."
categories: tutorials
tags: [tutorial, C#, WPF]
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

First we'll start by creating a new WPF project in Visual Studio.  
Select File -> New -> Project -> Under Templates -> Visual C# -> Windows Classic Desktop -> WPF App (.NET Framework).  
Name it WebInstaller and place it under a directory of your choosing.

The first view that we'll see is the MainWindow.xaml. This is where we'll create our GUI by writing XML. First we'll give our application a title and a size.

```xml
<Window x:Class="WebInstaller.MainWindow"
        xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
        xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
        xmlns:local="clr-namespace:WebInstaller"
        mc:Ignorable="d"
        Title="Simple Web Installer" Height="100" Width="400"
        ContentRendered="Window_ContentRendered"
        WindowStartupLocation="CenterScreen">
    <Grid>
    </Grid>
</Window>
```

Title is self-explanatory, the same is width and height. ContentRendered and WindowStartupLocation might not be. ContentRendered is the function that will be invoked when the GUI has finish rendered the first time. WindowStartupLocation is where on the screen that our program will show up, in this case, the center of the screen.

Now we'll insert a progressbar and a label telling the user how far along the download is. We'll do this by replacing the grid in the window tag with this:

```xml
<Grid Margin="20">
    <ProgressBar Minimum="0" Maximum="100" Name="progressBar"></ProgressBar>
    <TextBlock Text="{Binding ElementName=progressBar, Path=Value, StringFormat={}{0:0}%}" HorizontalAlignment="Center" VerticalAlignment="Center"></TextBlock>
</Grid>
```

Our progress bar is mostly self explanatory. We set a minimum and a maximum value, then we give it a name, so we can reference it from other GUI components, or from within our .cs file.  
We center align the text block and bind the text to the progress bars value.

In order for our application to even build, we'll have to create the function Window_ContentRendered. This function will we create in the MainWindow.xaml.cs file.

```csharp
private void Window_ContentRendered(Object sender, EventArgs e)
{

}
```

If we run our program now our application will look like this:
<figure>
	<a href="{{ site.url }}/images/build-your-own-installer/001.PNG"><img src="{{ site.url }}/images/build-your-own-installer/001.PNG" alt="image"></a>
</figure>
