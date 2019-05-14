<p align="center"><a href="https://chrome.google.com/webstore/detail/bible-tab/kncfgmibnbpjiebgonkmpgdoaedjkaed" target="_blank"><img src="https://raw.githubusercontent.com/tatthien/bible-tab/master/public/img/icon-128.png"></a></p>

 <h1 align="center">Bible Tab</h1>	
 
 <p align="center">The Google Chrome / Firefox extension will show a Bible verse everytime you open a new tab.</p>	
 
[![Build Status](https://travis-ci.org/tatthien/bible-tab.svg?branch=master)](https://travis-ci.org/tatthien/bible-tab)	
[![All Contributors](https://img.shields.io/badge/all_contributors-3-orange.svg?style=flat-square)](#contributors)	

## Contribute	

Firstly, I want to say thanks for your consideration of contribution. Please follow these steps below to contribute this project:	

### 1. Clone this project

```shell
git clone https://github.com/tatthien/bible-tab.git
```

### 2. Install dependencies and start the development

```
cd bible-tab
yarn install
```

Start the development.

```
yarn serve
```

By hitting `yarn serve`, you're able to visit http://localhost:8080 and see all the changes with HRM.

### 3. Load unpacked extension

Once you feel happy with how it looks, run `yarn build` and load source of extension in folder `dist`.

1. Go to `chrome://extensions/`.	
2. Turn on the `Developer mode`.	
3. Click on the `Load unpacked extension...` button then select the folder `dist` from project.
