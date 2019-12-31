# quicker-npm-run
Alternative to `npm run` with support for autocomplete.

## Install

```
npm install -g quicker-npm-run
```

## Usage

A command "nr" will be available after the installation. You can invoke "nr" directly without any arguments to enter the interactive mode. "nr" will prompt all the script names for you to select one to exec.

```
nr
```

Otherwise, in the common usage, you would provide a keyword for quicker-npm-run to look up from the script names.

1. `"t"` matches `"test"`, `"got"`, `"t"`, but not `"build"`.
2. `"dh"` matches `"docker:ssh"` but not `"dig"`.

```
nr t
```

You can optionally pass arguments to the underlying command without the need of `--`:

```
nr t --fix
```
