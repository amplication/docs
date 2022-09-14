---
id: prevent-override
title: How to prevent override of custom files
sidebar_label: How to prevent override of custom files
slug: /getting-started/prevent-override
---

# How to prevent override of custom files

When you work with Amplication to generate code, Amplication re-generates the code every time. This means that Amplication could accidentally override some of the files you added since the previous generation.

To prevent your files being overridden, Amplication has provided the `.amplicationignore` file. 

## Using `.amplicationignore` to protect your files


The `.amplicationignore` file must be in the root of the git repository.


```bash
/node_modules/**
/node_modules
```


Place the `.amplicationignore` file in the root of your repository and add any files you want Amplication to ignore during the code generation process.

The file works similarly to `.gitignore`, using the [glob](https://en.wikipedia.org/wiki/Glob_(programming)) syntax. Here is an example:

```bash
# .amplicationignore
folder_or_file.     <-- Ignore ignore a specific file or folder
folder/file         <-- Ignore a specific file in a 
folder/**/file.json <-- Ignore all file.json occurrences in subfolders of "folder"
!folder/file.json   <-- Reverse glob, will include "file.json" even if "folder" was excluded
```


## What happens to the changes? 

The files that are in the `.amplicationignore` will not be overridden, but if Amplication updates them, they will be saved in the `.amplication/ignored` folder inside the git repository


:::info
Remember, as always with Amplication, you are in control. While Amplication will not automatically generate code in the ignored folders and files, you can still see what the generated code *could* look like. This way, you can cherrypick whatever Amplication-generated changes you like and use them in your code. You can find these files in `.amplication/ignored` in the git repository.
:::



