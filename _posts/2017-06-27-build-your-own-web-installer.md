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

What we need to do now, is to download the big installer and continuing updating our progress bar and finally start the installer when it has finished downloaded.

First we'll need two variables. One is the URL from where we'll download the file, and the other is where we'll save the file.  
In this example we'll use thinkbroadband and a 100MB zip file to download a big installer(We could of course have chosen a larger file, but 100MB is enough for this example).

```csharp
private const string DownloadUrl = "http://ipv4.download.thinkbroadband.com/100MB.zip";
private readonly string _downloadedFile = $"{Path.GetTempPath()}file.exe";
```

Now we'll implement our Window_ContentRendered function and we'll do this by creating an instance of a WebClient and listen for some events.

```csharp
private void Window_ContentRendered(object sender, EventArgs e)
{
    var client = new WebClient();
    client.DownloadProgressChanged += Client_DownloadProgressChanged;
    client.DownloadFileCompleted += Client_DownloadFileCompleted;
    client.DownloadFileAsync(new Uri(DownloadUrl), _downloadedFile);
}
```

First we create an instance of the WebClient class, and then we'll listen for whenever the download progress has changed and call our own function Client_DownloadProgressChanged, then we'll listen for whenever the download has been completed and call our own Client_DownloadFileCompleted, Lastely we'll start downloading our file async, by telling the client where to download the file from, and where to download it to.

Whenever the progress has changed on our download, we'll simple update our progress bars value.

```csharp
private void Client_DownloadProgressChanged(object sender, DownloadProgressChangedEventArgs e)
{
    progressBar.Value = e.ProgressPercentage;
}
```

When the download has finished, we'll set the progress bar's value to 100, since we might download so fast, that our Client_DownloadProgressChanged will not be triggered when the file has been downloaded, so it'll appear as if the installer is stuck at 99%.  
After that, we'll start the real installer and exit our program.

```csharp
private void Client_DownloadFileCompleted(object sender, AsyncCompletedEventArgs e)
{
    progressBar.Value = 100;
    Process.Start(_downloadedFile);
    Environment.Exit(0);
}
```

This is our web installer now:
<figure>
	<a href="{{ site.url }}/images/build-your-own-installer/002.PNG"><img src="{{ site.url }}/images/build-your-own-installer/002.PNG" alt="image"></a>
</figure>

As a final touch we'll add an icon to our web installer to make it look more professional.  
I use this icon, that I found online, in this example.
<figure>
	<a href="{{ site.url }}/images/build-your-own-installer/icon.png"><img src="{{ site.url }}/images/build-your-own-installer/icon.png" alt="image"></a>
	<figcaption><a href="https://www.iconfinder.com/icons/379337/computer_download_icon#size=128" title="Download icon, made by Webalys, found on iconfinder.com">Download icon, made by Webalys, found on iconfinder.com</a>.</figcaption>
</figure>

In order for us to insert this icon, we'll create a folder called icon and paste our icon in there. Right click on the project WebInstaller -> choose properties. Under Application, find icon and choose our icon.

You should now be all set, and if all went well, our installer will now look like this:
<figure>
	<a href="{{ site.url }}/images/build-your-own-installer/003.PNG"><img src="{{ site.url }}/images/build-your-own-installer/003.PNG" alt="image"></a>
</figure>

Of course as this is an tutorial I didn't do a lot of exception handling, but that is something that should be implemented in a real web installer.  
Things to consider:
* What if there is no internet when the web installer is being run?
* What if the user cancels the installation process? (HINT: the process.start() will throw an exception)
* What if the real installer is no longer located where the web installer expects it to be?
