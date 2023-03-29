# Jeopardy

[![Website](https://img.shields.io/website?url=https%3A%2F%2Fjeopardy.cheuksblog.ca)](https://jeopardy.cheuksblog.ca)

A web-based jeopardy clone. Built with Vue and Typescript. Created because I
insisted that there aren't good pieces of open source software to help in
editing and playing Jeopardy-style games. And also because the traditional
solution of using MS PowerPoint is a hassle to set up.

## Building

Make sure you have `yarn` (and `node`) installed.

```bash
yarn install
yarn build			# compiles & minifies for production
```

You will find the built code in `dist/`.

## Contribution

Contributions are always welcome, whether it be in the form of feature
requests, bug reports, or code!

If you are contributing code, the recommended workflow is as follows:

```bash
yarn serve			# starts up dev server (it lints on save)

# In another window:
$EDITOR src/App.vue		# start hacking
yarn test			# make sure tests pass
```

Commits should follow [this guide][conventional-commits].

[conventional-commits]: https://www.conventionalcommits.org/en/v1.0.0/
