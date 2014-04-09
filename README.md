# Overview
A Chrome extension that will add some features for coders to KDDI ChatWork.

# Installation
Click this https://raw.githubusercontent.com/Moncader/ChatWorkCoder/master/bin/ChatWorkCoder.crx

# Usage
Just reload your ChatWork window and you'll already be using it!

# Features

## Syntax Highlighting
To highlight something, wrap your code with three '`' characters. You do not need to close your code with three more characters, however if you do, you can return back to normal text mode and have multiple code highlights in the same message. No newline is required so inlining code is possible.

By default, the language will be automatically selected for you. However if you wish to manually set the language, after the first three '`' characters, add a '|' followed by the language name followed by a space. 

### Examples
<pre>```var t = new Object();</pre>

<pre>```var t = new Object();</pre>

<pre>```var t = new Object();```

```var tOther = new Object();```</pre>

<pre>```|javascript var t = new Object();</pre>
