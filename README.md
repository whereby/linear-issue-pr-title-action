# Enforce Pull Request Title Style Action

This action analyses the titles of Pull Requests to ensure they start with a Linear Issue Key.  Issue Keys are a combination of a Project Key (two capital letters), a hyphen, and a number designating which issue it is.

For example, if your project key were `AB` then the following would be allowed

```
AB-1  Initialize Project
```

However, the following examples would not be allowed

```
aB-1 Initialize Project
```

```
ab-1 Initialize Project
```

```
Ab 1 Initialize Project
```

By default, this action will allow any valid Issue Key so long as it *could* be valid. If you want to be specific to your project, use the `projectKey` input for the action. 

## Inputs

### `projectKey`

A specific Project Key to always check for. 

## Example Usage

```
- name: Enforce Linear Issue Key in Pull Request Title
  uses: whereby/linear-issue-pr-title-action@v1
```

## Example Usage with a specific Project Key

```
- name: Enforce Linear Issue Key in Pull Request Title
  uses: whereby/linear-issue-pr-title-action@v1
  with:
    projectKey: AB
```
