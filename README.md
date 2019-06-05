<p align="center"><a href="https://chrome.google.com/webstore/detail/bible-tab/kncfgmibnbpjiebgonkmpgdoaedjkaed" target="_blank"><img src="https://raw.githubusercontent.com/tatthien/bible-tab/master/public/img/icon-128.png"></a></p>

<h1 align="center">Bible Tab</h1>

<p align="center">Bible Tab is a browser extension for Chrome and Firefox to show a Bible verse everytime you open a new tab.</p>

<p style="text-align: center;">
	<a href="https://www.producthunt.com/posts/bible-tab-v2?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-bible-tab-v2" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=157558&theme=light" alt="Bible Tab v2 - A browser extension that show a Bible verse on new tab | Product Hunt Embed" style="width: 250px; height: 54px;" width="250px" height="54px" /></a>
</p>

![Screen Shot 2019-05-22 at 8 35 09 PM](https://user-images.githubusercontent.com/3280351/58178859-2d357d00-7cd1-11e9-9137-90c38efd07ff.png)

[![Build Status](https://travis-ci.org/tatthien/bible-tab.svg?branch=master)](https://travis-ci.org/tatthien/bible-tab)
[![All Contributors](https://img.shields.io/badge/all_contributors-3-orange.svg)](#contributors)

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

### 3. Temporary intallation.

Once you feel happy with how it looks, run `yarn build` and load source of extension in folder `dist`.

For Google Chrome:

1. Go to `chrome://extensions/`.
2. Turn on the `Developer mode`.
3. Click on the `Load unpacked` button.
4. Browse and select the folder `dist` from project.

For FireFox:

1. Go go `about:debugging#addons`
2. Click on the `Load Temporary Add-on` button.
3. Browse and select any file in the folder `dist` from project.

## Contributors

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
<table><tr><td align="center"><a href="http://tatthien.com"><img src="https://avatars1.githubusercontent.com/u/3280351?v=4" width="80px;" alt="Thien Nguyen"/><br /><sub><b>Thien Nguyen</b></sub></a><br /><a href="https://github.com/tatthien/bible-tab/commits?author=tatthien" title="Documentation">📖</a> <a href="https://github.com/tatthien/bible-tab/commits?author=tatthien" title="Code">💻</a></td><td align="center"><a href="https://ansidev.xyz/"><img src="https://avatars1.githubusercontent.com/u/6688235?v=4" width="80px;" alt="Le Minh Tri"/><br /><sub><b>Le Minh Tri</b></sub></a><br /><a href="https://github.com/tatthien/bible-tab/commits?author=ansidev" title="Code">💻</a> <a href="https://github.com/tatthien/bible-tab/commits?author=ansidev" title="Documentation">📖</a> <a href="https://github.com/tatthien/bible-tab/issues?q=author%3Aansidev" title="Bug reports">🐛</a></td><td align="center"><a href="https://github.com/nampdn"><img src="https://avatars3.githubusercontent.com/u/26531658?v=4" width="80px;" alt="Noah Phom"/><br /><sub><b>Noah Phom</b></sub></a><br /><a href="https://github.com/tatthien/bible-tab/commits?author=nampdn" title="Code">💻</a></td></tr></table>

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
