---
id: managing-custom-files
title: Managing custom files
sidebar_label: Managing custom files
slug: /getting-started/managing-custom-files
---

# Managing Custom Files

When you work with Amplication to generate code, Amplication re-generates the code without affecting your custom files.  

However, to allow you greater contol,  Amplication has provided the `.amplicationignore` file to ensure that selected files are ignored. 


## Using `.amplicationignore` to ignore your files


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
```


## What happens to the changes? 

The files that are in  `.amplicationignore`, when updated, will be saved in the `.amplication/ignored` folder inside the git repository. 


:::info
Remember, as always with Amplication, you are in control. While Amplication will not automatically generate code in the ignored folders and files, you can still see what the generated code *could* look like. This way, you can cherry pick whatever Amplication-generated changes you like and use them in your code. You can find these files in `.amplication/ignored` in the git repository.
:::



